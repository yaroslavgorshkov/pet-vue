import { getRecords, setRecords } from '~~/server/utils/records';
import { MonthlyRecord } from '~~/shared/types';

type Body = {
    debtorId: number;
    month: string;
    charge: number;
    payment: number;
    totalDebt: number;
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

    const debtors = await getDebtors();
    const debtor = debtors.find((d) => d.id === body.debtorId);
    const resultDebt = body.totalDebt + (newRecord.charge - newRecord.payment);
    const isDebtorNow = resultDebt > 0;
    let resultDebtors;
    if (debtor !== undefined) {
        resultDebtors = debtors.map((d) => {
            if (isDebtorNow) {
                return { ...d, isActive: true };
            }
            return { ...d, isActive: false };
        });
    } else {
        resultDebtors = debtors;
    }
    await setDebtors(resultDebtors);
    await setRecords(records);
});
