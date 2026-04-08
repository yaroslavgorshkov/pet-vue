import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import type {Weapon} from "#shared/types"

const WEAPONS_FILE = join(process.cwd(), 'server', 'files', 'weapons.json')

export const getWeapons = async () => {
    const data = await readFile(WEAPONS_FILE, 'utf-8');
    try {
        const parsed = JSON.parse(data) as Weapon[];
        return parsed;
    } catch (err) {
        console.log('json parse error', err);
        return [];
    }
}

export const setWeapons = async (weapons: Weapon[]) => {
    await writeFile(WEAPONS_FILE, JSON.stringify(weapons), 'utf-8');
}
