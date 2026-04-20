import { Response } from '~~/shared/task13/types';
import { isString } from '~~/shared/task13/utils';

type Body = {
    password: string;
};

const PASSWORD = 'password';

export default defineEventHandler(async (event) => {
    const { password } = await readBody<Body>(event);

    if (!isString(password)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Password must be string value',
        });
    }
    if (password.trim() === '') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Password cannot be empty',
        });
    } else if (password !== PASSWORD) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid password',
        });
    }

    setCookie(event, 'access', 'granted', {
        maxAge: 60 * 60 * 24,
        path: '/',
    });
    const response: Response = {
        isSucceed: true,
        message: 'Successfully set access cookie',
    };

    return response;
});
