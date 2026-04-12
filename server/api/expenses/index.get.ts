import { getExpenses } from "~~/server/utils/expenses"

export default defineEventHandler(async () => {
    const allExpenses = await getExpenses();
    return allExpenses;
})