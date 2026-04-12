import { getExpenseById } from "~~/server/utils/expenses";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.expenseId;
    if(id === undefined || Number.isNaN(Number(id))) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid ID'
        })
    }

    const idParsed = Number(id);

    const expense = await getExpenseById(idParsed);
    return expense;
})