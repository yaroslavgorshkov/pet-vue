export default defineEventHandler( async (event) => {
    const id = event.context.params?.id;
    if(id !== undefined) {
        const potions = await getPotions();
        const filtered = potions.filter(p => p.id !== Number(id));
        await setPotions(filtered);
    }
})