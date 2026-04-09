export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    if(id !== undefined) {
        const weapons = await getWeapons();
        const weapon = weapons.find(w => w.id === Number(id));
        if(weapon !== undefined) {
            return weapon;
        }
        return null;
    }
    return null;
})