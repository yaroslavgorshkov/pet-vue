import type { Response } from '#shared/task12/types';

type Body = {
    password: string;
};

export default defineEventHandler(async (event) => {
    const { password } = await readBody<Body>(event);

    if (!(typeof password === 'string')) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Password must be string type',
        });
    } else if (password.trim() === '') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Password cannot be empty',
        });
    } else if (password !== 'password') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid password. Access denied',
        });
    }

    setCookie(event, 'access', 'granted');

    const response: Response = {
        isSucceed: true,
        statusMessage: 'Successfully set cookie',
    };

    return response;
});
