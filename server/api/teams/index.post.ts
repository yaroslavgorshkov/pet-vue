import { setTeams } from '~~/server/utils/teams';
import { Team } from '~~/shared/task13/types';
import { isCodeUnique, isEmpty, isString } from '~~/shared/task13/utils';

type Body = {
    title: string;
    code: string;
    lead: string;
    description: string;
};

export default defineEventHandler(async (event) => {
    const { code, description, lead, title } = await readBody<Body>(event);
    const teams = await getTeams();
    if (teams === undefined) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during getting teams',
        });
    }

    if (!isString(code)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Code must be string value',
        });
    } else if (isEmpty(code)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Code cannot be empty',
        });
    } else if (!isCodeUnique(code, teams)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Code is not unique',
        });
    }

    if (!isString(description)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Description must be string value',
        });
    } else if (isEmpty(description)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Description cannot be empty',
        });
    }

    if (!isString(lead)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Lead must be string value',
        });
    } else if (isEmpty(lead)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Lead cannot be empty',
        });
    }

    if (!isString(title)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Title must be string value',
        });
    } else if (isEmpty(title)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Title cannot be empty',
        });
    }

    const newId =
        teams.length !== 0 ? Math.max(...teams.map((t) => t.id)) + 1 : 1;

    const newTeam: Team = {
        code,
        description,
        lead,
        title,
        id: newId,
        isBehindPlan: false,
    };

    teams.unshift(newTeam);
    if (!(await setTeams(teams))) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Something went wrong during setting teams',
        });
    }

    return newTeam;
});
