export default defineEventHandler(async (event) => {
    const body = await readBody<{ inStock: boolean }>(event);
    const id = event.context.params?.id;
    if (id !== undefined) {
        const potions = await getPotions();
        const result = potions.map((p) => {
            if (p.id === Number(id)) {
                return { ...p, inStock: body.inStock };
            }
            return p;
        });
        await setPotions(result);
    }
});
