import { getEmployeeById, getEmployees, setEmployees } from '~~/server/utils/employees';
import {
    getWorklogById,
    getWorklogs,
    getWorklogsByEmployeeId,
    setWorklogs,
} from '~~/server/utils/worklogs';
import { Employee } from '~~/shared/task9/types';

export default defineEventHandler(async (event) => {
    const worklogId = event.context.params?.worklogId;
    if (worklogId === undefined || Number.isNaN(Number(worklogId))) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Invalid worklog ID',
        });
    }

    const deletingWorklog = await getWorklogById(Number(worklogId));
    if (deletingWorklog === undefined) {
        throw createError({
            statusCode: 400,
            statusMessage: 'There are no worklogs with this ID',
        });
    }

    const worklogs = await getWorklogs();
    if (worklogs === undefined) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during getting worklogs',
        });
    }

    const filteredWorklogs = worklogs.filter((w) => w.id !== Number(worklogId));
    if (!(await setWorklogs(filteredWorklogs))) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during setting worklogs',
        });
    }

    const employeeId = deletingWorklog.employeeId;
    const employee = await getEmployeeById(employeeId);
    if (employee === undefined) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Cannot find employee with this ID',
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

    return deletingWorklog;
});
