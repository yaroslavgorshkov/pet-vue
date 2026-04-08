import { Potion } from "~~/server/utils/potions";

export default defineEventHandler(async (event) => {
    const body = await readBody<{ name: string; effect: string; price: number; }>(event);
    console.log("Ya tut", body);
    
    const potions = await getPotions();
    const newPotion: Potion = {
        id: potions.length + 1,
        name: body.name,
        effect: body.effect,
        price: body.price,
        inStock: true
    }
    potions.unshift(newPotion);
    await setPotions(potions);
})