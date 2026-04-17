import {
    isEmpty,
    isNumber,
    isMonthValidFormat,
    isNumberPositive,
    isString,
} from '#shared/task9/utils';
import {
    getEmployeeById,
    getEmployees,
    setEmployees,
} from '~~/server/utils/employees';
import {
    getWorklogs,
    getWorklogsByEmployeeId,
    setWorklogs,
} from '~~/server/utils/worklogs';
import { Employee, MonthlyWorkLog } from '~~/shared/task9/types';

type Body = {
    employeeId: number;
    month: string;
    plannedHours: number;
    actualHours: number;
};

export default defineEventHandler(async (event) => {
    const { actualHours, employeeId, month, plannedHours } =
        await readBody<Body>(event);

    if (!isNumber(actualHours)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Actual hours value must be number',
        });
    } else if (!isNumberPositive(actualHours)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Actual hours value must positive number',
        });
    }

    if (!isNumber(plannedHours)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Planned hours value must be number',
        });
    } else if (!isNumberPositive(plannedHours)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Planned hours value must positive number',
        });
    }

    if (!isNumber(employeeId)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Employee ID must be number',
        });
    }
    const employee = await getEmployeeById(employeeId);
    if (employee === undefined) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Cannot find employee with this ID',
        });
    }

    if (!isString(month)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Month must be a string',
        });
    } else if (isEmpty(month)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Month cannot be empty',
        });
    } else if (!isMonthValidFormat(month)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Month is invalid. Example: 2026-02',
        });
    }

    const worklogs = await getWorklogs();
    if (worklogs === undefined) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during getting worklogs',
        });
    }
    const newId =
        worklogs.length !== 0 ? Math.max(...worklogs.map((w) => w.id)) + 1 : 1;
    const newWorklog: MonthlyWorkLog = {
        id: newId,
        employeeId,
        month,
        plannedHours,
        actualHours,
    };
    worklogs.push(newWorklog);

    if (!(await setWorklogs(worklogs))) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during setting worklogs',
        });
    }

    const employeeWorklogs = await getWorklogsByEmployeeId(employeeId);
    if (employeeWorklogs === undefined) {
        throw createError({
            statusCode: 500,
            statusMessage:
                'Something went wrong during getting worklogs by employee ID',
        });
    }
    const totalPlannedHours = employeeWorklogs.reduce(
        (acc, w) => acc + w.plannedHours,
        0
    );
    const totalActualHours = employeeWorklogs.reduce(
        (acc, w) => acc + w.actualHours,
        0
    );
    const isOvertime = totalPlannedHours - totalActualHours < 0;
    const patchedEmployee: Employee = {
        id: employeeId,
        fullName: employee.fullName,
        department: employee.department,
        email: employee.email,
        position: employee.position,
        isOvertime: isOvertime,
    };

    const employees = await getEmployees();
    if (employees === undefined) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during getting employees',
        });
    }
    const filteredEmployees = employees.filter((e) => e.id !== employeeId);
    filteredEmployees.push(patchedEmployee);
    if (!(await setEmployees(filteredEmployees))) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during setting employees',
        });
    }

    return newWorklog;
});
