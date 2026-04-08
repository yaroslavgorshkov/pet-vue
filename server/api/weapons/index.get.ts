import { getWeapons } from "~~/server/utils/weapons"

export default defineEventHandler(async () => {
    return await getWeapons();
})