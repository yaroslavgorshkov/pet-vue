export default defineEventHandler(async (event) => {
    const noticeId = event.context.params?.noticeId;
    if (noticeId === undefined || Number.isNaN(Number(noticeId))) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid ID',
        });
    }

    const notice = await getNoticeById(Number(noticeId));
    if (notice === undefined) {
        throw createError({
            statusCode: 400,
            statusMessage: 'There are no notices with this ID',
        });
    }
    const notices = await getNotices();
    if (notices === undefined) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during getting notices',
        });
    }

    const filtered = notices.filter((n) => n.id !== Number(noticeId));
    if (!(await setNotices(filtered))) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during setting notices',
        });
    }

    return notice;
});
