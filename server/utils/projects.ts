import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd, throwDeprecation } from 'node:process';
import { Project } from '~~/shared/types';

const PROJECTS_FILE = join(cwd(), 'server', 'files', 'projects.json');

export const getProjects = async () => {
    const projects = await readFile(PROJECTS_FILE, 'utf-8');
    try {
        const projectsParsed: Project[] = JSON.parse(projects);
        return projectsParsed;
    } catch (err) {
        throw createError({
            statusCode: 500,
            statusMessage: `Error during projects JSON parsing, ${err}`,
        });
    }
};

export const getProjectById = async (projectId: number) => {
    const projects = await getProjects();
    const foundProject = projects.find((p) => p.id === projectId);
    if (foundProject === undefined) {
        throw createError({
            statusCode: 404,
            statusMessage: `Project with ID ${projectId} does not found`,
        });
    }
    return foundProject;
};

export const setProjects = async (projects: Project[]) => {
    await writeFile(PROJECTS_FILE, JSON.stringify(projects, null, 4), 'utf-8');
}
