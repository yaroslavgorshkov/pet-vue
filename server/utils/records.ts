import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { MonthlyRecord } from '~~/shared/types';

const RECORDS_FILE = join(cwd(), 'server', 'files', 'monthlyDebts.json');

export const getRecordsForOneDebtor = async (id: number) => {
    const records = await readFile(RECORDS_FILE, 'utf-8');
    try {
        const recordsParsed = JSON.parse(records) as MonthlyRecord[];
        const debtorRecords = recordsParsed.filter((d) => d.debtorId === id);
        return debtorRecords;
    } catch (err) {
        console.log('error during json parsing', err);
        return [];
    }
};

export const getRecords = async () => {
    const records = await readFile(RECORDS_FILE, 'utf-8');
    try {
        const recordsParsed = JSON.parse(records) as MonthlyRecord[];
        return recordsParsed;
    } catch (err) {
        console.log('error during json parsing', err);
        return [];
    }
};

export const setRecords = async (records: MonthlyRecord[]) => {
    await writeFile(RECORDS_FILE, JSON.stringify(records, null, 4), 'utf-8');
};
