import { getProjects, setProjects } from '~~/server/utils/projects';
import { Project } from '~~/shared/types';

type Body = {
    title: string;
    code: string;
    owner: string;
    description: string;
};

export default defineEventHandler(async (event) => {
    const body = await readBody<Body>(event);
    const { code, description, owner, title } = body;

    if (typeof code !== 'string') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Code must be string',
        });
    } else if (code.trim() === '') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Code cannot be empty',
        });
    }

    if (typeof description !== 'string') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Description must be string',
        });
    } else if (description.trim() === '') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Description cannot be empty',
        });
    }

    if (typeof owner !== 'string') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Owner must be string',
        });
    } else if (owner.trim() === '') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Owner cannot be empty',
        });
    }

    if (typeof title !== 'string') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Title must be string',
        });
    } else if (title.trim() === '') {
        throw createError({
            statusCode: 400,
            statusMessage: 'Title cannot be empty',
        });
    }

    const projects = await getProjects();
    const newId =
        projects.length !== 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
    const newProject: Project = {
        code,
        description,
        owner,
        title,
        id: newId,
        isOverBudget: false,
    };

    projects.push(newProject);
    await setProjects(projects);

    return newProject;
});
