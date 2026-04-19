import { getNoticeById, getNotices, setNotices } from '~~/server/utils/notices';
import { Notice } from '~~/shared/task12/types';

type Body = {
    title: string;
    category: string;
    content: string;
    isPinned: boolean;
};

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

    const { category, content, title, isPinned } = await readBody<Body>(event);
    if (typeof category !== 'string') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Category must be string',
        });
    } else if (category.trim() === '') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Category cannot be empty',
        });
    }

    if (typeof content !== 'string') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Content must be string',
        });
    } else if (content.trim() === '') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Content cannot be empty',
        });
    }

    if (typeof title !== 'string') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Title must be string',
        });
    } else if (title.trim() === '') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Title cannot be empty',
        });
    }

    if (typeof isPinned !== 'boolean') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Pinned status must be boolean',
        });
    }

    const patchedNotice: Notice = {
        category,
        content,
        id: Number(noticeId),
        isPinned,
        title,
    };

    const notices = await getNotices();
    if (notices === undefined) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during getting notices',
        });
    }

    const newNotices = notices.map((n) => {
        return n.id === Number(noticeId) ? patchedNotice : n;
    });

    if (!(await setNotices(newNotices))) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during setting notices',
        });
    }

    return patchedNotice;
});
