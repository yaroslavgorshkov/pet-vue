import { setRecordById } from '~~/server/utils/records';
import { MonthlyRecord, MonthlyRecordShort } from '~~/shared/types';

type Body = {
    debtorId: number;
    charge: number;
    payment: number;
    month: string;
};

export default defineEventHandler(async (event) => {
    const recordId = event.context.params?.id;
    if (recordId === undefined) {
        throw createError({
            statusMessage: 'Server error due to invalid ID',
            statusCode: 500,
        });
    }

    const body = await readBody<Body>(event);

    if (typeof body.charge !== 'number' || Number.isNaN(body.charge)) {
        throw createError({
            statusMessage: 'Charge must be numeric',
            statusCode: 400,
        });
    } else if (body.charge < 0) {
        throw createError({
            statusMessage: 'Charge must be positive number',
            statusCode: 400,
        });
    }

    if (typeof body.payment !== 'number' || Number.isNaN(body.payment)) {
        throw createError({
            statusMessage: 'Payment must be numeric',
            statusCode: 400,
        });
    } else if (body.payment < 0) {
        throw createError({
            statusMessage: 'Payment must be positive number',
            statusCode: 400,
        });
    }

    const debtors = await getDebtors();
    const isAnyDebtorWithNewRecordDebtorId = debtors.some(
        (d) => d.id === body.debtorId
    );    
    
    if (typeof body.debtorId !== 'number' || Number.isNaN(body.debtorId)) {
        throw createError({
            statusMessage: 'Debtor ID must be numeric',
            statusCode: 400,
        });
    } else if (!isAnyDebtorWithNewRecordDebtorId) {
        throw createError({
            statusMessage: 'There are no debtors with this Debtor ID',
            statusCode: 400,
        });
    }

    if (typeof body.month !== 'string') {
        throw createError({
            statusMessage: 'Month value must be string',
            statusCode: 400,
        });
    } else if (!/^(19|20)\d{2}-(0[1-9]|1[0-2])$/.test(body.month)) {
        throw createError({
            statusMessage: 'Month is not in valid form',
            statusCode: 400,
        });
    }

    const newRecord: MonthlyRecordShort = {
        charge: body.charge,
        debtorId: body.debtorId,
        month: body.month,
        payment: body.payment,
    };

    await setRecordById(newRecord, Number(recordId));

    const debts = await getRecordsForOneDebtor(body.debtorId);
    const totalDebt =
        debts.reduce((acc, r) => acc + r.charge, 0) -
        debts.reduce((acc, r) => acc + r.payment, 0);

    const isDebtor = totalDebt > 0;
    const resultDebtors = debtors.map(d => {
        if(d.id === body.debtorId) {
            if(isDebtor) {
                return {...d, isActive: true}
            } else {
                return {...d, isActive: false}
            }
        } else {
            return d;
        }
    })

    await setDebtors(resultDebtors);

    const patchedRecord = await getRecordById(Number(recordId)) as MonthlyRecord;

    return patchedRecord;
});
