import type { Response } from '#shared/task12/types';
export default defineEventHandler(async (event) => {
    deleteCookie(event, 'access');

    const response: Response = {
        isSucceed: true,
        statusMessage: 'Successfully deleted cookie',
    };

    return response;
});
