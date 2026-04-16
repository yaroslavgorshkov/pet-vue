import {
    getEmployeeById,
    getEmployees,
    setEmployees,
} from '~~/server/utils/employees';
import {
    getWorklogById,
    getWorklogs,
    getWorklogsByEmployeeId,
    setWorklogs,
} from '~~/server/utils/worklogs';
import { Employee, MonthlyWorkLog } from '~~/shared/task9/types';
import {
    isEmpty,
    isMonthValidFormat,
    isNumber,
    isNumberPositive,
    isString,
} from '~~/shared/task9/utils';

type Body = {
    employeeId: number;
    month: string;
    plannedHours: number;
    actualHours: number;
};

export default defineEventHandler(async (event) => {
    const { actualHours, employeeId, month, plannedHours } =
        await readBody<Body>(event);
    const worklogId = event.context.params?.worklogId;
    if (worklogId === undefined || Number.isNaN(Number(worklogId))) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid ID',
        });
    }
    const worklog = await getWorklogById(Number(worklogId));
    if (worklog === undefined) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Cannot find worklog with this ID',
        });
    }

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
    } else if (!isEmpty(month)) {
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

    const patchedWorklog: MonthlyWorkLog = {
        id: worklog.id,
        employeeId: worklog.employeeId,
        month: worklog.month,
        plannedHours: worklog.plannedHours,
        actualHours: worklog.actualHours,
    };

    const worklogs = await getWorklogs();
    if (worklogs === undefined) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during getting worklogs',
        });
    }

    const filteredWorklogs = worklogs.filter((w) => w.id !== worklog.id);
    filteredWorklogs.push(patchedWorklog);
    if (!(await setWorklogs(filteredWorklogs))) {
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

    return patchedWorklog;
});
