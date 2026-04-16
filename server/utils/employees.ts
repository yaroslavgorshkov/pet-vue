import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';
import type { Employee } from '#shared/task9/types';

const EMPLOYEES_FILE = join(cwd(), 'server', 'files', 'employees.json');

export const getEmployees = async () => {
    try {
        const employees = await readFile(EMPLOYEES_FILE, 'utf-8');
        const employeesParsed: Employee[] = JSON.parse(employees);
        return employeesParsed;
    } catch {
        return undefined;
    }
};

export const setEmployees = async (employees: Employee[]) => {
    try {
        await writeFile(EMPLOYEES_FILE, JSON.stringify(employees), 'utf-8');
        return true;
    } catch {
        return false;
    }
};

export const getEmployeeById = async (employeeId: number) => {
    const employees = await getEmployees();
    if (employees === undefined) {
        return undefined;
    }
    const employee = employees.find((e) => e.id === employeeId);
    return employee;
};
