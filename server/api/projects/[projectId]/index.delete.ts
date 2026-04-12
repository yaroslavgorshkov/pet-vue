import { getProjectById, getProjects, setProjects } from "~~/server/utils/projects";

export default defineEventHandler( async (event) => {
    const id = event.context.params?.projectId;
    if(id === undefined || Number.isNaN(Number(id))) {
        throw createError({
            statusMessage: 'Id is invalid',
            statusCode: 400
        })
    }

    const idParsed = Number(id);

    const deletedProject = await getProjectById(idParsed);
    const projects = await getProjects();
    const filtered = projects.filter(p => p.id !== idParsed);
    await setProjects(filtered);

    const projectExpenses = await getExpensesByProjectId(idParsed);
    const allExpenses = await getExpenses();
    const idsOfDeletingExpenses = projectExpenses.map(e => e.id);
    const resultExpenses = allExpenses.filter(e => !idsOfDeletingExpenses.includes(e.id));
    await setExpenses(resultExpenses);

    return deletedProject;
})