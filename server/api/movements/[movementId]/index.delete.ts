export default defineEventHandler(async (event) => {
    const movementId = event.context.params?.movementId;
    if (movementId === undefined || Number.isNaN(Number(movementId))) {
        throw createError({
            statusMessage: 'Id is invalid',
            statusCode: 400,
        });
    }

    const deletedMovement = await getMovementById(Number(movementId));
    if (deletedMovement === undefined) {
        throw createError({
            statusMessage: 'There are no movements with this ID',
            statusCode: 400,
        });
    }

    const movements = await getMovements();
    if (movements === undefined) {
        throw createError({
            statusMessage: 'Something went wrong during getting movements',
            statusCode: 500,
        });
    }
    const filteredMovements = movements.filter(
        (m) => m.id !== deletedMovement.id
    );
    await setMovements(filteredMovements);

    const warehouseId = deletedMovement.warehouseId;
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

    return deletedMovement;
});
