import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { cwd } from "node:process";
import type {Warehouse} from "#shared/task8/types"

const WAREHOUSES_FILE = join(cwd(), 'server', 'files', 'warehouses.json');

export const getWarehouses = async () => {
    try {
        const warehousesJson = await readFile(WAREHOUSES_FILE, 'utf-8');
        const parsed = JSON.parse(warehousesJson) as Warehouse[];
        return parsed;
    } catch {
        return undefined;
    }
}

export const getWarehouseById = async (warehouseId: number) => {
    const warehouses = await getWarehouses();
    if(warehouses === undefined) {
        return undefined;
    }
    const found = warehouses.find(w => w.id === warehouseId);
    return found;
}

export const setWarehouses = async (warehouses: Warehouse []) => {
    try {
        await writeFile(WAREHOUSES_FILE, JSON.stringify(warehouses, null, 4), 'utf-8');
        return true;
    } catch {
        return false;
    }
}