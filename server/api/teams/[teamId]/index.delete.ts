import { getReports, setReports } from '~~/server/utils/reports';
import { getTeamById, setTeams } from '~~/server/utils/teams';

export default defineEventHandler(async (event) => {
    const teamId = event.context.params?.teamId;
    if (teamId === undefined || Number.isNaN(Number(teamId))) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid ID',
        });
    }

    const deletedTeam = await getTeamById(Number(teamId));
    if (deletedTeam === undefined) {
        throw createError({
            statusCode: 404,
            statusMessage: 'There are no teams with this ID',
        });
    }

    const reports = await getReports();
    if (reports === undefined) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during getting reports',
        });
    }
    const filteredReports = reports.filter((r) => r.teamId !== Number(teamId));
    if (!(await setReports(filteredReports))) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during setting reports',
        });
    }

    const teams = await getTeams();
    if (teams == undefined) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during getting teams',
        });
    }

    const filteredTeams = teams.filter((t) => t.id !== Number(teamId));
    if (!(await setTeams(filteredTeams))) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during setting teams',
        });
    }

    return deletedTeam;
});
