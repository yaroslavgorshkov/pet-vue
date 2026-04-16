import { getEmployees } from "~~/server/utils/employees"

export default defineEventHandler(async () => {
    return await getEmployees();
})