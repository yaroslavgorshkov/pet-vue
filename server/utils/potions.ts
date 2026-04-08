import { writeFile, readFile } from "node:fs/promises";
import { join } from "node:path";

export type Potion = {
    id: number;
    name: string;
    effect: string;
    price: number;
    inStock: boolean;
}

const POTIONS_PATH = join(process.cwd(), 'server', 'files', 'potions.json')

export const getPotions = async () => {
    const potions = await readFile(POTIONS_PATH, 'utf-8');
    try {
        const potionsParsed = JSON.parse(potions) as Potion[];
        return potionsParsed;
    } catch (err) {
        console.log('json parse error:', err);
        return [];
    }
}

export const setPotions = async (potions: Potion[]) => {
    await writeFile(POTIONS_PATH, JSON.stringify(potions, null, 4), 'utf-8');
}