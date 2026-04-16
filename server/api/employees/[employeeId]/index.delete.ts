import {
    getEmployeeById,
    getEmployees,
    setEmployees,
} from '~~/server/utils/employees';
import { getWorklogs, setWorklogs } from '~~/server/utils/worklogs';

export default defineEventHandler(async (event) => {
    const employeeId = event.context.params?.employeeId;
    if (employeeId === undefined || Number.isNaN(Number(employeeId))) {
        throw createError({
            statusMessage: 'Invalid ID',
            statusCode: 400,
        });
    }

    const deletingEmployee = await getEmployeeById(Number(employeeId));
    if (deletingEmployee === undefined) {
        throw createError({
            statusMessage: 'There are no employees with this ID',
            statusCode: 404,
        });
    }

    const worklogs = await getWorklogs();
    if (worklogs === undefined) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during getting worklogs',
        });
    }

    const filteredWorklogs = worklogs.filter(
        (w) => w.employeeId !== Number(employeeId)
    );
    if (!(await setWorklogs(filteredWorklogs))) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during setting worklogs',
        });
    }

    const employees = await getEmployees();
    if (employees === undefined) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during getting employees',
        });
    }
    const filteredEmployees = employees.filter(
        (e) => e.id !== Number(employeeId)
    );
    if (!(await setEmployees(filteredEmployees))) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during setting employees',
        });
    }

    return deletingEmployee;
});
