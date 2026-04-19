export type Response = {
    isSucceed: boolean;
    statusMessage: string;
};

export type Notice = {
    id: number;
    title: string;
    category: string;
    content: string;
    isPinned: boolean;
};

export type SortValue = 'title' | 'category' | 'content';
export type SortDirection = 'ascending' | 'descending';
export type PinnedStatus = 'yes' | 'no';

export type SortValueItem = {
    value: SortValue;
    label: string;
    id: number;
};

export type SortDirectionItem = {
    value: SortDirection;
    label: string;
    id: number;
};

export type PinnedStatusItem = {
    value: PinnedStatus;
    label: string;
    id: number;
};
