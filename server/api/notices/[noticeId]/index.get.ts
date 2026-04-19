import { getNoticeById } from "~~/server/utils/notices";

export default defineEventHandler(async (event) => {
    const noticeId = event.context.params?.noticeId;

    if (noticeId === undefined || Number.isNaN(Number(noticeId))) {
        throw createError({
            statusCode: 400,
            statusMessage: 'invalid ID',
        });
    }

    return await getNoticeById(Number(noticeId));
});
