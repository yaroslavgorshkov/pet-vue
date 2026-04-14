import {
    isEmpty,
    isMonthValidFormat,
    isNumber,
    isPositiveNumber,
    isString,
} from '#shared/task8/utils';
import { MonthlyMovement } from '~~/shared/task8/types';

type Body = {
    warehouseId: number;
    month: string;
    incoming: number | '';
    outgoing: number | '';
};

export default defineEventHandler(async (event) => {
    const { incoming, month, outgoing, warehouseId } =
        await readBody<Body>(event);

    if (incoming === '') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Incoming connot be empty',
        });
    } else if (!isNumber(incoming)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Incoming must be numeric',
        });
    } else if (!isPositiveNumber(incoming)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Incoming must be positive number',
        });
    }

    if (outgoing === '') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Outgoing connot be empty',
        });
    } else if (!isNumber(outgoing)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Outgoing must be numeric',
        });
    } else if (!isPositiveNumber(outgoing)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Outgoing must be positive number',
        });
    }

    if (!isString(month)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Month must be string value',
        });
    } else if (isEmpty(month)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Month connot be empty',
        });
    } else if (!isMonthValidFormat(month)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Month is invalid. Example: 2026-02',
        });
    }

    const warehouse = await getWarehouseById(warehouseId);
    if (Number.isNaN(Number(warehouseId))) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Warehouse ID is invalid',
        });
    } else if (warehouse === undefined) {
        throw createError({
            statusCode: 400,
            statusMessage: 'There are no warehouses with this ID',
        });
    }

    const movements = await getMovements();
    if (movements === undefined) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during getting movements',
        });
    }
    const newId =
        movements.length !== 0
            ? Math.max(...movements.map((m) => m.id)) + 1
            : 1;
    const newMovement: MonthlyMovement = {
        incoming,
        month,
        outgoing,
        warehouseId,
        id: newId,
    };
    movements.push(newMovement);
    await setMovements(movements);

    const warehouseMovements = await getMovementsByWarehouseId(warehouseId);

    if (warehouseMovements === undefined) {
        throw createError({
            statusCode: 500,
            statusMessage:
                'Something went wrong during getting warehouse movements',
        });
    }
    const totalIncoming = warehouseMovements.reduce(
        (acc, m) => acc + m.incoming,
        0
    );

    const totalOutgoing = warehouseMovements.reduce(
        (acc, m) => acc + m.outgoing,
        0
    );

    const isInDeficit = totalIncoming - totalOutgoing < 0;

    const warehouses = await getWarehouses();
    if (warehouses === undefined) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during getting warehouses',
        });
    }
    const resultWarehouses = warehouses.map((w) => {
        if (w.id === warehouseId) {
            return isInDeficit
                ? { ...w, isInDeficit: true }
                : { ...w, isInDeficit: false };
        }
        return w;
    });

    await setWarehouses(resultWarehouses);

    return newMovement;
});
