import { getProjects } from "~~/server/utils/projects"

export default defineEventHandler(async () => {
    const projects = await getProjects();
    return projects;
})