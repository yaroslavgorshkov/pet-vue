import type { PinnedStatus, PinnedStatusItem, SortDirectionItem, SortValueItem } from "./types";

export const sortValueItems: SortValueItem[] = [
    {id: 1, label: 'Title', value: "title"},
    {id: 2, label: 'Category', value: "category"},
    {id: 3, label: 'Content', value: "content"},
]

export const sortDirectionItems: SortDirectionItem[] = [
    {id: 1, label: 'Ascending', value: "ascending"},
    {id: 2, label: 'Descending', value: "descending"},
]

export const pinnedStatusList: PinnedStatusItem[] = [
    {id: 1, label: 'Yes', value: 'yes'},
    {id: 2, label: 'No', value: 'no'},
]