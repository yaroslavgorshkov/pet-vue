import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { MonthlyExpense } from '~~/shared/types';

const EXPENSES_FILE = join(cwd(), 'server', 'files', 'expenses.json');

export const getExpenses = async () => {
    const expenses = await readFile(EXPENSES_FILE, 'utf-8');
    try {
        const expensesParsed: MonthlyExpense[] = JSON.parse(expenses);
        return expensesParsed;
    } catch (err) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Error during getting expenses',
        });
    }
};

export const getExpensesByProjectId = async (projectId: number) => {
    const allExpenses = await getExpenses();
    const filteredExpenses = allExpenses.filter(
        (e) => e.projectId === projectId
    );
    return filteredExpenses;
};

export const getExpenseById = async (expenseId: number) => {
    const expenses = await getExpenses();
    const foundExpense = expenses.find((e) => e.id === expenseId);
    if (foundExpense === undefined) {
        throw createError({
            statusCode: 404,
            statusMessage: `Expense with ID ${expenseId} not found`,
        });
    }
    return foundExpense;
};

export const setExpenses = async (expenses: MonthlyExpense[]) => {
    await writeFile(EXPENSES_FILE, JSON.stringify(expenses, null, 4));
};

export const patchExpense = async (expense: MonthlyExpense) => {
    const expenses = await getExpenses();
    const expenseId = expense.id;
    const resultExpenses = expenses.map((e) => {
        if (e.id === expenseId) {
            return expense;
        } else {
            return e;
        }
    });
    await setExpenses(resultExpenses);
};

export const deleteExpensesByProjectId = async (projectId: number) => {
    const expenses = await getExpenses();
    const filtered = expenses.filter(e => e.projectId !== projectId);
    await setExpenses(filtered);
}
