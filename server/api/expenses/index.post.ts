import {
    getExpenses,
    getExpensesByProjectId,
    setExpenses,
} from '~~/server/utils/expenses';
import {
    getProjectById,
    getProjects,
    setProjects,
} from '~~/server/utils/projects';
import { MonthlyExpense } from '~~/shared/types';

type Body = {
    projectId: number;
    month: string;
    planned: number;
    actual: number;
};

export default defineEventHandler(async (event) => {
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

    const expenses = await getExpenses();
    const newId =
        expenses.length !== 0 ? Math.max(...expenses.map((e) => e.id)) + 1 : 1;

    const newExpense: MonthlyExpense = {
        id: newId,
        projectId,
        month,
        planned,
        actual,
    };
    expenses.push(newExpense);
    await setExpenses(expenses);

    const allExpensesByProjectId = await getExpensesByProjectId(projectId);
    const plannedSum = allExpensesByProjectId.reduce(
        (acc, e) => acc + e.planned,
        0
    );
    const actualSum = allExpensesByProjectId.reduce(
        (acc, e) => acc + e.actual,
        0
    );
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

    return newExpense;
});
