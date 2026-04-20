import type { Team } from './types';

export const isString = (value: any) => {
    return typeof value === 'string';
};

export const isNumber = (value: any) => {
    return typeof value === 'number';
};

export const isPositiveNumber = (value: number) => {
    return value >= 0;
};

export const isEmpty = (value: string) => {
    return value.trim() === '';
};

export const isCodeUnique = (code: string, teams: Team[]) => {
    return !teams.map((t) => t.code).includes(code);
};

export const isMonthValidFormat = (month: string) => {
    const regex = /^\d{4}-(0[1-9]|1[0-2])$/;
    return regex.test(month);
};
