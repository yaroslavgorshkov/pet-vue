export default defineEventHandler(async (event) => {
    const body = await readBody<{inStock: boolean}>(event);
    const id = event.context.params?.id;
    if(id !== undefined) {
        const potions = await getPotions();
        const patchedPotion = potions.find(p => p.id === Number(id));
        if(patchedPotion !== undefined) {
            patchedPotion.inStock = body.inStock;
            const result = potions.filter(p => p.id !== Number(id));
            result.push(patchedPotion);
            await setPotions(result);
        }
    }
})