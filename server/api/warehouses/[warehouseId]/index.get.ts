export default defineEventHandler(async (event) => {
    const warehouseId = event.context.params?.warehouseId;
    if (warehouseId === undefined || Number.isNaN(Number(warehouseId))) {
        return undefined;
    }

    return await getWarehouseById(Number(warehouseId));
});
