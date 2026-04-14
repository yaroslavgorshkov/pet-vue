export default defineEventHandler(async (event) => {
    const movementId = event.context.params?.movementId;
    if (movementId === undefined || Number.isNaN(Number(movementId))) {
        throw createError({
            statusMessage: 'Invalid ID',
            statusCode: 400,
        });
    }

    return await getMovementById(Number(movementId));
});
