import { isEmpty, isString, isValidEmailFormat } from '#shared/task9/utils';
import { getEmployees, setEmployees } from '~~/server/utils/employees';
import { Employee } from '~~/shared/task9/types';

type Body = {
    fullName: string;
    department: string;
    email: string;
    position: string;
};

export default defineEventHandler(async (event) => {
    const { department, email, fullName, position } =
        await readBody<Body>(event);

    if (!isString(department)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Department must be string value',
        });
    } else if (!isEmpty(department)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Department cannot be empty',
        });
    }

    if (!isString(fullName)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Full name must be string value',
        });
    } else if (!isEmpty(fullName)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Full name cannot be empty',
        });
    }

    if (!isString(position)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Position must be string value',
        });
    } else if (!isEmpty(position)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Position cannot be empty',
        });
    }

    if (!isString(email)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email must be string value',
        });
    } else if (!isEmpty(email)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email cannot be empty',
        });
    } else if (!isValidEmailFormat(email)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email must be valid format',
        });
    }

    const employees = await getEmployees();
    if (employees === undefined) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during getting employees',
        });
    }

    const newId =
        employees.length !== 0
            ? Math.max(...employees.map((e) => e.id)) + 1
            : 1;

    const newEmployee: Employee = {
        id: newId,
        fullName,
        department,
        email,
        position,
        isOvertime: false,
    };

    employees.push(newEmployee);
    if (!(await setEmployees(employees))) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during setting employees',
        });
    }

    return newEmployee;
});
