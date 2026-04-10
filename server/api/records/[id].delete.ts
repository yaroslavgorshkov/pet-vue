import { getDebtorById, setDebtorById } from '~~/server/utils/debtors';

export default defineEventHandler(async (event) => {
    const id = event.context.params?.id;
    if (id === undefined || Number.isNaN(Number(id))) {
        throw createError({
            message: 'Page not found, incorrect params',
            status: 404,
        });
    } else {
        const records = await getRecords();
        if (records.length === 0) {
            throw createError({
                message: 'Records are empty',
                status: 400,
            });
        }
        const deletedRecord = records.find((r) => r.id === Number(id));
        if (deletedRecord === undefined) {
            throw createError({
                message: 'There are no record with this id',
                status: 400,
            });
        }

        const newRecords = records.filter((r) => r.id !== Number(id));
        await setRecords(newRecords);

        const recordsForDebtor = await getRecordsForOneDebtor(
            deletedRecord.debtorId
        );

        const debtor = await getDebtorById(deletedRecord.debtorId);
        if (debtor === undefined) {
            throw createError({
                message: 'There are no such debtor for deleted record',
                status: 400,
            });
        }

        if (recordsForDebtor.length === 0) {
            debtor.isActive = false;
            await setDebtorById(deletedRecord.debtorId, debtor);
            return deletedRecord;
        }
        const totalDebt =
            recordsForDebtor.reduce((acc, r) => acc + r.charge, 0) -
            recordsForDebtor.reduce((acc, r) => acc + r.payment, 0);

        debtor.isActive = totalDebt > 0;

        await setDebtorById(deletedRecord.debtorId, debtor);

        return deletedRecord;
    }
});
