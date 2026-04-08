import { getWeapons, setWeapons } from "~~/server/utils/weapons";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    if(id !== undefined) {
        const weapons = await getWeapons();
        const filtered = weapons.filter(w => w.id !== Number(id))
        await setWeapons(filtered);
    }
})