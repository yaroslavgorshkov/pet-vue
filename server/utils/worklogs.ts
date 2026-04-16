import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { cwd } from 'process';
import { MonthlyWorkLog } from '~~/shared/task9/types';

const WORKLOGS_FILE = join(cwd(), 'server', 'files', 'worklogs.json');

export const getWorklogs = async () => {
    try {
        const worklogs = await readFile(WORKLOGS_FILE, 'utf-8');
        const worklogsParsed: MonthlyWorkLog[] = JSON.parse(worklogs);
        return worklogsParsed;
    } catch {
        return undefined;
    }
};

export const setWorklogs = async (worklogs: MonthlyWorkLog[]) => {
    try {
        await writeFile(WORKLOGS_FILE, JSON.stringify(worklogs), 'utf-8');
        return true;
    } catch {
        return false;
    }
};

export const getWorklogsByEmployeeId = async (employeeId: number) => {
    const worklogs = await getWorklogs();
    if (worklogs === undefined) {
        return undefined;
    }
    const foundWorklogs = worklogs.filter((w) => w.employeeId === employeeId);
    return foundWorklogs;
};

export const getWorklogById = async (worklogId: number) => {
    const worklogs = await getWorklogs();
    if (worklogs === undefined) {
        return undefined;
    }
    const foundWorklog = worklogs.find((w) => w.id === worklogId);
    return foundWorklog;
};
