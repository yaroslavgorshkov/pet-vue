import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { Notice } from '~~/shared/task12/types';

const NOTICES_FILE = join(cwd(), 'server', 'files', 'notices.json');

export const getNotices = async () => {
    try {
        const notices = await readFile(NOTICES_FILE, 'utf-8');
        const noticesParsed = JSON.parse(notices) as Notice[];
        return noticesParsed;
    } catch {
        return undefined;
    }
};

export const getNoticeById = async (noticeId: number) => {
    const notices = await getNotices();
    if (notices === undefined) {
        return undefined;
    }

    return notices.find((n) => n.id === noticeId);
};

export const setNotices = async (notices: Notice[]) => {
    try {
        await writeFile(NOTICES_FILE, JSON.stringify(notices), 'utf-8');
        return true;
    } catch {
        return false;
    }
};
