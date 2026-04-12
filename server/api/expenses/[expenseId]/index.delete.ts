export default defineEventHandler(async (event) => {
    const id = event.context.params?.expenseId;
    if (id === undefined || Number.isNaN(Number(id))) {
        throw createError({
            statusMessage: 'Invalid ID',
            statusCode: 400,
        });
    }

    const idParsed = Number(id);
    const deletedExpense = await getExpenseById(idParsed);
    const expenseId = deletedExpense.projectId;
    const expenses = await getExpenses();
    const filtered = expenses.filter((e) => e.id !== idParsed);
    await setExpenses(filtered);

    const projectExpenses = await getExpensesByProjectId(expenseId);
    const totalPlanned = projectExpenses.reduce((acc, e) => acc + e.planned, 0);
    const totalActual = projectExpenses.reduce((acc, e) => acc + e.actual, 0);
    const isOverBudget = totalPlanned - totalActual < 0;
    const projects = await getProjects();
    const newProjects = projects.map(p => {
        if(p.id === expenseId) {
            if(isOverBudget) {
                return {...p, isOverBudget: true}
            } else {
                return {...p, isOverBudget: false}
            }
        } else {
            return p;
        }
    })
    await setProjects(newProjects);

    return deletedExpense;
});
