import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { MonthlyReport } from '~~/shared/task13/types';

const REPORTS_FILE = join(cwd(), 'server', 'files', 'reports.json');

export const getReports = async () => {
    try {
        const reports = await readFile(REPORTS_FILE, 'utf-8');
        const reportsParsed: MonthlyReport[] = JSON.parse(reports);
        return reportsParsed;
    } catch {
        return undefined;
    }
};

export const getReportsByTeamId = async (teamId: number) => {
    const reports = await getReports();
    if (reports === undefined) {
        return undefined;
    }
    const filtered = reports.filter((r) => r.teamId === teamId);
    return filtered;
};

export const getReportById = async (reportId: number) => {
    const reports = await getReports();
    if (reports === undefined) {
        return undefined;
    }
    return reports.find((r) => r.id === reportId);
};

export const setReports = async (reports: MonthlyReport[]) => {
    try {
        await writeFile(
            REPORTS_FILE,
            JSON.stringify(reports, null, 4),
            'utf-8'
        );
        return true;
    } catch {
        return false;
    }
};
