import { writeFile } from "node:fs/promises";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";
import type { MonthlyMovement } from "~~/shared/task8/types";

const MOVEMENTS_FILE = join(cwd(), 'server', 'files', 'movements.json');

export const getMovements = async () => {
    try {
        const movementsJson = await readFile(MOVEMENTS_FILE, 'utf-8');
        const parsed: MonthlyMovement[] = JSON.parse(movementsJson);
        return parsed;
    } catch {
        return undefined;
    }
}

export const getMovementsByWarehouseId = async (warehouseId: number) => {
    const warehouses = await getMovements();
    if (warehouses === undefined) {
        return undefined;
    }
    const filtered = warehouses.filter(w => w.warehouseId === warehouseId);
    return filtered;
}

export const getMovementById = async (movementId: number) => {
    const movements = await getMovements();
    if(movements === undefined) {
        return undefined;
    }
    const found = movements.find(m => m.id === movementId);
    return found;
}

export const setMovements = async (movements: MonthlyMovement[]) => {
    try {
        await writeFile(MOVEMENTS_FILE, JSON.stringify(movements, null, 4), 'utf-8');
        return true;
    } catch {
        return false;
    }
}