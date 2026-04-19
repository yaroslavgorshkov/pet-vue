import { getNotices } from "~~/server/utils/notices"

export default defineEventHandler( async () => {
    return await getNotices();
})