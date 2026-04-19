import { getNotices, setNotices } from '~~/server/utils/notices';
import { Notice } from '~~/shared/task12/types';

type Body = {
    title: string;
    category: string;
    content: string;
};

export default defineEventHandler(async (event) => {
    const { category, content, title } = await readBody<Body>(event);
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

    console.log('YA TUT');
    

    const notices = await getNotices();
    if (notices === undefined) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during getting notices',
        });
    }
    const newId =
        notices.length !== 0 ? Math.max(...notices.map((n) => n.id)) + 1 : 1;

    const newNotice: Notice = {
        category,
        content,
        id: newId,
        isPinned: false,
        title,
    };
    notices.unshift(newNotice);
    if (!(await setNotices(notices))) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during setting notices',
        });
    }

    return newNotice;
});
