import type { Warehouse } from './types';

export const isEmpty = (value: string) => {
    return value.trim() === '';
};

export const isString = (value: any) => {
    return typeof value === 'string';
};

export const isNumber = (value: any) => {
    return typeof value === 'number';
};

export const isCodeUnique = (value: string, warehouses: Warehouse[]) => {
    return !warehouses.map((w) => w.code).includes(value);
};

export const isMonthValidFormat = (month: string) => {
    const regex = /^(19|20)\d{2}-(0[1-9]|1[0-2])$/;
    return regex.test(month);
};

export const isPositiveNumber = (value: number) => {
    return value >= 0;
};
