import type { SortDirectionItem, SortValuesItem } from '../task13/types';

export const sortValueList: SortValuesItem[] = [
    { id: 1, label: 'Code', value: 'code' },
    { id: 2, label: 'Description', value: 'description' },
    { id: 3, label: 'Lead', value: 'lead' },
    { id: 4, label: 'Title', value: 'title' },
];

export const sortDirectionList: SortDirectionItem[] = [
    { id: 1, label: 'Ascending', value: 'ascending' },
    { id: 2, label: 'Descending', value: 'descending' },
];
