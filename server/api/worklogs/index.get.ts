import { getWorklogs } from '~~/server/utils/worklogs';

export default defineEventHandler(async () => {
    return await getWorklogs();
});
