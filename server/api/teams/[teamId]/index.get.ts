import { getTeamById } from "~~/server/utils/teams";

export default defineEventHandler(async (event) => {
    const teamId = event.context.params?.teamId;
    if(teamId === undefined || Number.isNaN(Number(teamId))) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid ID'
        })
    }

    return await getTeamById(Number(teamId));
})