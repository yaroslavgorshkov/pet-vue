export type EmployeesFiltersSortTabs = {
    value: EmployeesFiltersSortTabsValues;
    label: string;
    id: number;
};

export type EmployeeSortingDirectionValue = 'ascending' | 'descending';

export type EmployeeSortingDirection = {
    id: number;
    label: string;
    value: EmployeeSortingDirectionValue
}

export type EmployeesFiltersSortTabsValues =
    | 'name'
    | 'department'
    | 'email'
    | 'position';

export type Employee = {
    id: number;
    fullName: string;
    department: string;
    email: string;
    position: string;
    isOvertime: boolean;
};

export type MonthlyWorkLog = {
    id: number;
    employeeId: number;
    month: string;
    plannedHours: number;
    actualHours: number;
};
