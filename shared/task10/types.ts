export type TabsSortingValue = 'title' | 'category' | 'price';
export type TabsSortingDirection = 'ascending' | 'descending';

export type TabsSortingValueElement = {
    value: TabsSortingValue;
    label: string;
    id: number;
};

export type TabsSortingDirectionElement = {
    value: TabsSortingDirection;
    label: string;
    id: number;
};

export type Product = {
    id: number;
    title: string;
    category: string;
    price: number;
    inStock: boolean;
};

export type RecentSorting = {
    value: TabsSortingValue;
    direction: TabsSortingDirection;
    id: number;
};
