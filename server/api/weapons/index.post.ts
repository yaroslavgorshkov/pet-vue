import { getWeapons, setWeapons } from '~~/server/utils/weapons';
import { Weapon } from '~~/shared/types';

export default defineEventHandler(async (event) => {
    const body = await readBody<{
        name: string;
        type: string;
        damage: number;
    }>(event);
    const weapons = await getWeapons();
    const newId =
        weapons.length !== 0 ? Math.max(...weapons.map((w) => w.id)) + 1 : 1;
    const newWeapon: Weapon = {
        id: newId,
        name: body.name,
        damage: body.damage,
        isEquipped: false,
        type: body.type,
    };
    weapons.push(newWeapon);
    await setWeapons(weapons);
});
