import { getWorklogById } from '~~/server/utils/worklogs';

export default defineEventHandler(async (event) => {
    const worklogId = event.context.params?.worklogId;
    if (worklogId === undefined || Number.isNaN(Number(worklogId))) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Invalid worklog ID',
        });
    }

    const worklog = await getWorklogById(Number(worklogId));
    return worklog;
});
