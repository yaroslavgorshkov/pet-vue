import { getRecordById } from "~~/server/utils/records";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    if(id === undefined) {
        throw createError({
            statusMessage: 'ID is not valid',
            statusCode: 500
        })
    }

    const record = await getRecordById(Number(id));
    if(record === undefined) {
        throw createError({
            statusMessage: 'There are no records with this ID',
            statusCode: 404
        })
    }

    return record;
})