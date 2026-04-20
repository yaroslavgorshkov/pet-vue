import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';
import type { Team } from '#shared/task13/types';

const TEAMS_FILE = join(cwd(), 'server', 'files', 'teams.json');

export const getTeams = async () => {
    try {
        const teams = await readFile(TEAMS_FILE, 'utf-8');
        const teamsParsed: Team[] = JSON.parse(teams);
        return teamsParsed;
    } catch {
        return undefined;
    }
};

export const getTeamById = async (teamId: number) => {
    const teams = await getTeams();
    if (teams === undefined) {
        return undefined;
    }
    return teams.find((t) => t.id === teamId);
};

export const setTeams = async (teams: Team[]) => {
    try {
        await writeFile(TEAMS_FILE, JSON.stringify(teams, null, 4), 'utf-8');
        return true;
    } catch {
        return false;
    }
};
