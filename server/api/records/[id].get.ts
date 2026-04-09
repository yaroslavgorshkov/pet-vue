import { getRecordsForOneDebtor } from "~~/server/utils/records";

export default defineEventHandler(async (event) => {
    const id = Number(event.context.params!.id as string);
    return await getRecordsForOneDebtor(id);
})