import { setRecordById } from '~~/server/utils/records';
import { MonthlyRecordShort } from '~~/shared/types';

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
            message: 'Charge must be numeric',
            status: 400,
        });
    } else if (body.charge < 0) {
        throw createError({
            message: 'Charge must be positive number',
            status: 400,
        });
    }

    if (typeof body.payment !== 'number' || Number.isNaN(body.payment)) {
        throw createError({
            message: 'Payment must be numeric',
            status: 400,
        });
    } else if (body.payment < 0) {
        throw createError({
            message: 'Payment must be positive number',
            status: 400,
        });
    }

    const debtors = await getDebtors();
    const isAnyDebtorWithNewRecordDebtorId = debtors.some(
        (d) => d.id === body.debtorId
    );
    if (typeof body.debtorId !== 'number' || Number.isNaN(body.debtorId)) {
        throw createError({
            message: 'Debtor ID must be numeric',
            status: 400,
        });
    } else if (!isAnyDebtorWithNewRecordDebtorId) {
        throw createError({
            message: 'There are no debtors with this Debtor ID',
            status: 400,
        });
    }

    if (typeof body.month !== 'string') {
        throw createError({
            message: 'Month value must be string',
            status: 400,
        });
    } else if (!/^(19|20)\d{2}-(0[1-9]|1[0-2])$/.test(body.month)) {
        throw createError({
            message: 'Month is not in valid form',
            status: 400,
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
});
