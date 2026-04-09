import { getDebtors } from "~~/server/utils/debtors";

export default defineEventHandler(async () => {
    return await getDebtors();
})