import { Potion } from '~~/server/utils/potions';

export default defineEventHandler(async (event) => {
    const body = await readBody<{
        name: string;
        effect: string;
        price: number;
    }>(event);

    const potions = await getPotions();
    const newId =
        potions.length !== 0 ? Math.max(...potions.map((p) => p.id)) + 1 : 1;
    const newPotion: Potion = {
        id: newId,
        name: body.name,
        effect: body.effect,
        price: body.price,
        inStock: true,
    };
    potions.push(newPotion);
    await setPotions(potions);
});
