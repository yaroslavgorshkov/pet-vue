import type {
    Product,
    TabsSortingDirectionElement,
    TabsSortingValueElement,
} from './types';

export const mockProducts: Product[] = [
    {
        id: 1,
        title: 'Mechanical Keyboard G-Pro',
        category: 'Electronics',
        price: 120,
        inStock: true,
    },
    {
        id: 2,
        title: 'Ergonomic Office Chair',
        category: 'Furniture',
        price: 250,
        inStock: true,
    },
    {
        id: 3,
        title: 'Wireless Gaming Mouse',
        category: 'Electronics',
        price: 55,
        inStock: false,
    },
    {
        id: 4,
        title: 'Stainless Steel Water Bottle',
        category: 'Accessories',
        price: 25,
        inStock: true,
    },
    {
        id: 5,
        title: 'Noise Cancelling Headphones',
        category: 'Electronics',
        price: 199,
        inStock: false,
    },
];

export const tabsSortingValue: TabsSortingValueElement[] = [
    { id: 1, label: 'Title', value: 'title' },
    { id: 2, label: 'Category', value: 'category' },
    { id: 3, label: 'Price', value: 'price' },
];

export const tabsSortingDirection: TabsSortingDirectionElement[] = [
    { id: 1, label: 'Ascending', value: 'ascending' },
    { id: 2, label: 'Descending', value: 'descending' },
];
