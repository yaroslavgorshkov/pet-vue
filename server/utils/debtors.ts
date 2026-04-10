import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { cwd } from 'node:process';
import { Debtor } from '~~/shared/types';

const DEBTORS_FILE = join(cwd(), 'server', 'files', 'debtors.json');

export const getDebtors = async () => {
    const debtors = await readFile(DEBTORS_FILE, 'utf-8');
    try {
        const debtorsParsed = JSON.parse(debtors) as Debtor[];
        return debtorsParsed;
    } catch (err) {
        console.log('error during json parsing', err);
        return [];
    }
};

export const getDebtorById = async (debtorId: number) => {
    const debtors = await getDebtors();
    const debtor = debtors.find((d) => d.id === debtorId);
    return debtor;
};

export const setDebtors = async (debtors: Debtor[]) => {
    await writeFile(DEBTORS_FILE, JSON.stringify(debtors, null, 4), 'utf-8');
};

export const setDebtorById = async (debtorId: number, debtor: Debtor) => {
    const debtors = await getDebtors();
    const result = debtors.map((d) => {
        if (d.id === debtorId) {
            return debtor;
        } else {
            return d;
        }
    });

    await setDebtors(result);
};
