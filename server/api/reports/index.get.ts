import { getReports } from "~~/server/utils/reports"

export default defineEventHandler(async () => {
    return await getReports();
})