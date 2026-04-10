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

    const errorMessage =
        typeof body.lic !== 'string'
            ? 'Lic must be string'
            : typeof body.address !== 'string'
              ? 'Address must be string'
              : typeof body.fullName !== 'string'
                ? 'Name must be string'
                : typeof body.phone !== 'string'
                  ? 'Phone number must be string'
                  : body.fullName.trim() === ''
                    ? 'Name is empty'
                    : body.lic.trim() === ''
                      ? 'Lic is empty'
                      : body.address.trim() === ''
                        ? 'Address is empty'
                        : body.phone.trim() === ''
                          ? 'Phone is empty'
                          : !/^\+380\d{9}$/.test(body.phone)
                            ? 'Phone has invalid format'
                            : 'None';

    const errorHappened =
        typeof body.fullName !== 'string' ||
        body.fullName.trim() === '' ||
        typeof body.lic !== 'string' ||
        body.lic.trim() === '' ||
        typeof body.address !== 'string' ||
        body.address.trim() === '' ||
        typeof body.phone !== 'string' ||
        body.phone.trim() === '' ||
        !/^\+380\d{9}$/.test(body.phone);

    if (errorHappened) {
        throw createError({
            message: errorMessage,
            status: 400,
        });
    }

    const debtors = await getDebtors();
    const newId =
        debtors.length !== 0 ? Math.max(...debtors.map((d) => d.id)) + 1 : 1;

    const normalizedFullName = body.fullName.trim();
    const normalizedLic = body.lic.trim();
    const normalizedPhone = body.phone.trim();
    const normalizedAddress = body.address.trim();

    const newDebtor: Debtor = {
        id: newId,
        fullName: normalizedFullName,
        lic: normalizedLic,
        address: normalizedAddress,
        phone: normalizedPhone,
        isActive: false,
    };

    const isAlreadyDebtorWithLic = debtors.some((d) => d.lic === newDebtor.lic);
    if (isAlreadyDebtorWithLic) {
        throw createError({
            message: 'Debtor with this LIC already exists',
            status: 400,
        });
    }

    debtors.push(newDebtor);
    await setDebtors(debtors);
    return newDebtor;
});
