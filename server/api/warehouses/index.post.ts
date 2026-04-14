import { isCodeUnique, isEmpty, isString } from '#shared/task8/utils';
import { Warehouse } from '~~/shared/task8/types';

export default defineEventHandler(async (event) => {
    const warehouses = await getWarehouses();
    if (warehouses === undefined) {
        throw createError({
            statusMessage: 'Warehouses are undefined',
            statusCode: 500,
        });
    }

    type Body = {
        title: string;
        code: string;
        manager: string;
        city: string;
    };
    const { city, code, manager, title } = await readBody<Body>(event);

    if (!isString(city)) {
        throw createError({
            statusMessage: 'City must be string value',
            statusCode: 400,
        });
    } else if (isEmpty(city)) {
        throw createError({
            statusMessage: 'City cannot be empty',
            statusCode: 400,
        });
    }

    if (!isString(manager)) {
        throw createError({
            statusMessage: 'Manager must be string value',
            statusCode: 400,
        });
    } else if (isEmpty(manager)) {
        throw createError({
            statusMessage: 'Manager cannot be empty',
            statusCode: 400,
        });
    }

    if (!isString(title)) {
        throw createError({
            statusMessage: 'Title must be string value',
            statusCode: 400,
        });
    } else if (isEmpty(title)) {
        throw createError({
            statusMessage: 'Title cannot be empty',
            statusCode: 400,
        });
    }

    if (!isString(code)) {
        throw createError({
            statusMessage: 'Code must be string value',
            statusCode: 400,
        });
    } else if (isEmpty(code)) {
        throw createError({
            statusMessage: 'Code cannot be empty',
            statusCode: 400,
        });
    } else if (!isCodeUnique(code, warehouses)) {
        throw createError({
            statusMessage: 'Code must be unique',
            statusCode: 400,
        });
    }

    const newId = warehouses.length !== 0 ? Math.max(...warehouses.map(w => w.id)) + 1 : 1;
    const newWarehouse: Warehouse = {
        city,
        code,
        manager,
        title,
        id: newId,
        isInDeficit: false
    }

    warehouses.push(newWarehouse);
    await setWarehouses(warehouses);

    return newWarehouse;
});
