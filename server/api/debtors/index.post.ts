import { getDebtors, setDebtors } from '~~/server/utils/debtors';
import { Debtor } from '~~/shared/types';

type Body = {
    fullName: string;
    lic: string;
    address: string;
    phone: string;
};

export default defineEventHandler(async (event) => {
    const body = await readBody<Body>(event);
    const debtors = await getDebtors();
    const newId =
        debtors.length !== 0 ? Math.max(...debtors.map((d) => d.id)) + 1 : 1;
    const newDebtor: Debtor = {
        id: newId,
        fullName: body.fullName,
        lic: body.lic,
        address: body.address,
        phone: body.phone,
        isActive: false,
    };
    debtors.push(newDebtor);
    await setDebtors(debtors);
});
