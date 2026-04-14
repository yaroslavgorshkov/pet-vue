export default defineEventHandler(async (event) => {
    const warehouseId = event.context.params?.warehouseId;

    if (warehouseId === undefined || Number.isNaN(Number(warehouseId))) {
        throw createError({
            statusMessage: 'ID is invalid',
            statusCode: 400,
        });
    }

    const deletingWarehouse = await getWarehouseById(Number(warehouseId));
    if (deletingWarehouse === undefined) {
        throw createError({
            statusMessage: 'There are no warehouses with this ID',
            statusCode: 400,
        });
    }

    const warehouses = await getWarehouses();
    if (warehouses === undefined) {
        throw createError({
            statusMessage: 'Something went wrong during getting warehouses',
            statusCode: 500,
        });
    }
    const filteredWarehouses = warehouses.filter(w => w.id !== Number(warehouseId));
    await setWarehouses(filteredWarehouses);

    const movements = await getMovements();
    if (movements === undefined) {
        throw createError({
            statusMessage: 'Something went wrong during getting movements',
            statusCode: 500,
        });
    }
    const filteredMovements = movements.filter(m => m.warehouseId !== Number(warehouseId));
    await setMovements(filteredMovements);

    return deletingWarehouse;
});
