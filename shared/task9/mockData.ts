import type {
    EmployeesFiltersSortTabs,
    EmployeeSortingDirection,
} from './types';

export const employeesFiltersSortTabs: EmployeesFiltersSortTabs[] = [
    { id: 1, label: 'Name', value: 'name' },
    { id: 2, label: 'Department', value: 'department' },
    { id: 3, label: 'Email', value: 'email' },
    { id: 4, label: 'Position', value: 'position' },
];

export const employeesSortingDirection: EmployeeSortingDirection[] = [
    { id: 1, label: 'Ascending', value: 'ascending' },
    { id: 2, label: 'Descending', value: 'descending' },
];
