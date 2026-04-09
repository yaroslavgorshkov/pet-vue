import { getRecords, setRecords } from '~~/server/utils/records';
import { MonthlyRecord } from '~~/shared/types';

type Body = {
    debtorId: number;
    month: string;
    charge: number;
    payment: number;
};

export default defineEventHandler(async (event) => {
    const body = await readBody<Body>(event);
    const records = await getRecords();
    const newId =
        records.length !== 0 ? Math.max(...records.map((r) => r.id)) + 1 : 1;
    const newRecord: MonthlyRecord = {
        id: newId,
        debtorId: body.debtorId,
        month: body.month,
        charge: body.charge,
        payment: body.payment,
    };
    records.push(newRecord);
    await setRecords(records);
});
