import { getReportById } from "~~/server/utils/reports";

export default defineEventHandler(async (event) => {
    const reportId = event.context.params?.reportId;
    if (reportId === undefined || Number.isNaN(Number(reportId))) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid ID',
        });
    }

    return await getReportById(Number(reportId));
});
