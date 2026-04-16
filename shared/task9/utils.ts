export const isString = (value: any) => {
    return typeof value === 'string';
};

export const isNumber = (value: any) => {
    return typeof value === 'number';
};

export const isEmpty = (value: string) => {
    return value === '';
};

export const isValidEmailFormat = (email: string) => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
};

export const isMonthValidFormat = (month: string) => {
    const regex = /^\d{4}-(0[1-9]|1[0-2])$/;
    return regex.test(month);
};

export const isNumberPositive = (n: number) => {
    return n >= 0;
};
