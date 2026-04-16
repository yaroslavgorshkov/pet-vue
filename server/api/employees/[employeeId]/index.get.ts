import { getEmployeeById } from '~~/server/utils/employees';

export default defineEventHandler(async (event) => {
    const employeeId = event.context.params?.employeeId;

    if (employeeId === undefined || Number.isNaN(Number(employeeId))) {
        throw createError({
            statusMessage: 'Invalid ID',
            statusCode: 400,
        });
    }

    const employee = await getEmployeeById(Number(employeeId));
    return employee;
});
