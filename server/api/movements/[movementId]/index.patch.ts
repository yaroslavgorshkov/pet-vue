import { MonthlyMovement } from '~~/shared/task8/types';
import {
    isNumber,
    isPositiveNumber,
    isString,
    isEmpty,
    isMonthValidFormat,
} from '~~/shared/task8/utils';

type Body = {
    month: string;
    incoming: number | '';
    outgoing: number | '';
};

export default defineEventHandler(async (event) => {
    const movementId = event.context.params?.movementId;
    if (movementId === undefined || Number.isNaN(Number(movementId))) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid ID',
        });
    }

    const movement = await getMovementById(Number(movementId));
    if (movement === undefined) {
        throw createError({
            statusCode: 400,
            statusMessage: 'There are no movements with this ID',
        });
    }

    const { incoming, month, outgoing } = await readBody<Body>(event);

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

    const warehouseId = movement.warehouseId;
    const patchedMovement: MonthlyMovement = {
        id: Number(movementId),
        incoming,
        month,
        outgoing,
        warehouseId: warehouseId,
    };
    const movements = await getMovements();
    if (movements === undefined) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during getting movements',
        });
    }

    const resultMovements = movements.map((m) =>
        m.id === Number(movementId) ? patchedMovement : m
    );
    await setMovements(resultMovements);

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

    return patchedMovement;
});
