export type Weapon = {
    id: number;
    name: string;
    type: string;
    damage: number;
    isEquipped: boolean;
};

export type Debtor = {
    id: number;
    fullName: string;
    lic: string;
    address: string;
    phone: string;
    isActive: boolean;
};

export type MonthlyRecord = {
    id: number;
    debtorId: number;
    month: string;
    charge: number;
    payment: number;
};

export type MonthlyRecordShort = {
    debtorId: number;
    month: string;
    charge: number;
    payment: number;
};

export type Project = {
    id: number;
    code: string;
    title: string;
    owner: string;
    description: string;
    isOverBudget: boolean;
}

export type MonthlyExpense = {
    id: number;
    projectId: number;
    month: string;
    planned: number;
    actual: number;
}
