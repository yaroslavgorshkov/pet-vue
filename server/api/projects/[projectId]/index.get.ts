import { getProjectById } from "~~/server/utils/projects";

export default defineEventHandler(async (event) => {
    const id = event.context.params?.projectId;
    if(id === undefined || Number.isNaN(Number(id))) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid ID'
        })
    }

    const idParsed = Number(id);

    const project = await getProjectById(idParsed);
    return project;
})