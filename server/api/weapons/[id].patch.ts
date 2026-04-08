import { getWeapons, setWeapons } from '~~/server/utils/weapons';

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    if (id !== undefined) {
        const body = await readBody<{ isEquipped: boolean }>(event);
        const weapons = await getWeapons();
        const filtered = weapons.map((w) => {
            if (w.id !== Number(id)) return w;
            return { ...w, isEquipped: body.isEquipped };
        });
        await setWeapons(filtered);
    }
});
