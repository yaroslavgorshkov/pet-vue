import {
    getReportById,
    getReports,
    getReportsByTeamId,
    setReports,
} from '~~/server/utils/reports';
import { setTeams } from '~~/server/utils/teams';

export default defineEventHandler(async (event) => {
    const reportId = event.context.params?.reportId;
    if (reportId === undefined || Number.isNaN(Number(reportId))) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid ID',
        });
    }

    const deletingReport = await getReportById(Number(reportId));
    if (deletingReport === undefined) {
        throw createError({
            statusCode: 400,
            statusMessage: 'There are no reports with this ID',
        });
    }

    const reports = await getReports();
    if (reports === undefined) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during getting reports',
        });
    }
    const filteredReports = reports.filter((r) => r.id !== Number(reportId));
    if (!(await setReports(filteredReports))) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during setting reports',
        });
    }

    const teamId = deletingReport.teamId;

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

    return deletingReport;
});
