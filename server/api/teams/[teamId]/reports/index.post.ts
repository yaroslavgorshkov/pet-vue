import {
    getReports,
    getReportsByTeamId,
    setReports,
} from '~~/server/utils/reports';
import { getTeamById, setTeams } from '~~/server/utils/teams';
import { MonthlyReport } from '~~/shared/task13/types';
import {
    isEmpty,
    isMonthValidFormat,
    isNumber,
    isPositiveNumber,
    isString,
} from '~~/shared/task13/utils';

type Body = {
    month: string;
    plannedTasks: number;
    completedTasks: number;
};

export default defineEventHandler(async (event) => {
    const teamId = event.context.params?.teamId;
    if (teamId === undefined || Number.isNaN(Number(teamId))) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid team ID',
        });
    }
    const team = await getTeamById(Number(teamId));
    if (team === undefined) {
        throw createError({
            statusCode: 404,
            statusMessage: 'There are no teams with this ID',
        });
    }

    const { completedTasks, month, plannedTasks } = await readBody<Body>(event);

    if (!isString(month)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Month must be string value',
        });
    } else if (isEmpty(month)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Month cannot be empty',
        });
    } else if (!isMonthValidFormat(month)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Month is invalid format. Example: 2026-04',
        });
    }

    if (!isNumber(completedTasks)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Completed tasks value must be number',
        });
    }
    if (!isPositiveNumber(completedTasks)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Completed tasks value must be positive',
        });
    }

    if (!isNumber(plannedTasks)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Planned tasks value must be number',
        });
    }
    if (!isPositiveNumber(plannedTasks)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Planned tasks value must be positive',
        });
    }

    const reports = await getReports();
    if (reports === undefined) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during getting reports',
        });
    }
    const newId =
        reports.length !== 0 ? Math.max(...reports.map((r) => r.id)) + 1 : 1;

    const newReport: MonthlyReport = {
        completedTasks,
        id: newId,
        month,
        plannedTasks,
        teamId: Number(teamId),
    };
    reports.unshift(newReport);

    if (!(await setReports(reports))) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during setting reports',
        });
    }

    const reportsBeTeamId = await getReportsByTeamId(Number(teamId));
    if (reportsBeTeamId === undefined) {
        throw createError({
            statusCode: 500,
            statusMessage:
                'Something went wrong during getting reports by team ID',
        });
    }
    const totalCompletedTasks = reportsBeTeamId.reduce(
        (acc, r) => acc + r.completedTasks,
        0
    );
    const totalPlannedTasks = reportsBeTeamId.reduce(
        (acc, r) => acc + r.plannedTasks,
        0
    );
    const isBehindPlan = totalCompletedTasks - totalPlannedTasks < 0;

    const teams = await getTeams();
    if (teams === undefined) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during getting teams',
        });
    }
    const newTeams = teams.map((t) =>
        t.id === Number(teamId) ? { ...t, isBehindPlan: isBehindPlan } : t
    );

    if (!(await setTeams(newTeams))) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during setting new teams',
        });
    }

    return newReport;
});
