import { MonthlyExpense } from '~~/shared/types';

type Body = {
    projectId: number;
    month: string;
    planned: number;
    actual: number;
};

export default defineEventHandler(async (event) => {
    const id = event.context.params?.expenseId;
    if (id === undefined || Number.isNaN(Number(id))) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid ID',
        });
    }

    const body = await readBody<Body>(event);
    const { actual, month, planned, projectId } = body;

    if (typeof projectId !== 'number') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid projectId',
        });
    }

    await getProjectById(projectId);

    if (typeof actual !== 'number') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid "actual" value: must be numeric',
        });
    } else if (actual < 0) {
        throw createError({
            statusCode: 400,
            statusMessage: '"actual" value must be positive',
        });
    }

    if (typeof planned !== 'number') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid "planned" value: must be numeric',
        });
    } else if (planned < 0) {
        throw createError({
            statusCode: 400,
            statusMessage: '"planned" value must be positive',
        });
    }

    if (typeof month !== 'string') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Month value must be string',
        });
    } else if (!/^(19|20)\d{2}-(0[1-9]|1[0-2])$/.test(month)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid month value. Example: 2026-02',
        });
    }

    const idParsed = Number(id);
    await getExpenseById(idParsed);

    const updatedExpense: MonthlyExpense = {
        id: idParsed,
        projectId,
        month,
        planned,
        actual,
    };
    const expenses = await getExpenses();
    const newExpenses = expenses.map((e) => {
        if (e.id === idParsed) {
            return updatedExpense;
        } else {
            return e;
        }
    });

    await setExpenses(newExpenses);

    const expensesByProjectId = await getExpensesByProjectId(projectId);
    const plannedSum = expensesByProjectId.reduce(
        (acc, e) => acc + e.planned,
        0
    );
    const actualSum = expensesByProjectId.reduce((acc, e) => acc + e.actual, 0);
    const isOverBudget = plannedSum - actualSum < 0;
    const projects = await getProjects();
    const resultProjects = projects.map((p) => {
        if (p.id === projectId) {
            if (isOverBudget) {
                return { ...p, isOverBudget: true };
            } else {
                return { ...p, isOverBudget: false };
            }
        } else {
            return p;
        }
    });

    await setProjects(resultProjects);

    return updatedExpense;
});
