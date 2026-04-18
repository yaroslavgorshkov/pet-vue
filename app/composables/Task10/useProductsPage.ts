import { mockProducts } from '~~/shared/task10/mockData';
import type {
    RecentSorting,
    TabsSortingDirection,
    TabsSortingValue,
} from '~~/shared/task10/types';

const useProductsPage = () => {
    const route = useRoute();
    const router = useRouter();

    const titleFilter = ref(route.query.title ? String(route.query.title) : '');
    const categoryFilter = ref(
        route.query.category ? String(route.query.category) : ''
    );
    const minPriceFilter = ref<number | ''>(
        route.query.priceMin ? Number(route.query.priceMin) : ''
    );
    const maxPriceFilter = ref<number | ''>(
        route.query.priceMax ? Number(route.query.priceMax) : ''
    );
    const inStockFilter = ref(route.query.inStock === 'true');

    const sortValue = ref<TabsSortingValue>(
        route.query.sort
            ? (String(route.query.sort) as TabsSortingValue)
            : 'title'
    );
    const sortDirection = ref<TabsSortingDirection>(
        route.query.direction
            ? (String(route.query.direction) as TabsSortingDirection)
            : 'ascending'
    );

    const recentSortingList = ref<RecentSorting[]>([]);

    watch(
        [
            titleFilter,
            categoryFilter,
            minPriceFilter,
            maxPriceFilter,
            inStockFilter,
            sortValue,
            sortDirection,
        ],
        ([
            titleFilterNew,
            categoryFilterNew,
            minPriceFilterNew,
            maxPriceFilterNew,
            inStockFilterNew,
            sortValueNew,
            sortDirectionNew,
        ]) => {
            router.replace({
                query: {
                    title: titleFilterNew !== '' ? titleFilterNew : undefined,
                    category:
                        categoryFilterNew !== ''
                            ? categoryFilterNew
                            : undefined,
                    priceMax:
                        maxPriceFilterNew !== ''
                            ? maxPriceFilterNew
                            : undefined,
                    priceMin:
                        minPriceFilterNew !== ''
                            ? minPriceFilterNew
                            : undefined,
                    inStock: inStockFilterNew ? 'true' : undefined,
                    sort: sortValueNew,
                    direction: sortDirectionNew,
                },
            });
        },
        { immediate: true }
    );

    onMounted(() => {
        watch([sortValue, sortDirection], () => {
            const recentSorting = localStorage.getItem('recentSorting');
            if (recentSorting === null) {
                localStorage.setItem('recentSorting', JSON.stringify([]));
                return;
            }

            recentSortingList.value = JSON.parse(recentSorting);
        });
    });

    onMounted(() => {
        const recentSorting = localStorage.getItem('recentSorting');
        if (recentSorting === null) {
            localStorage.setItem('recentSorting', JSON.stringify([]));
        } else {
            recentSortingList.value = JSON.parse(recentSorting);
        }
        localStorage.setItem(
            'recentSortingValue',
            JSON.stringify(sortValue.value)
        );

        localStorage.setItem(
            'recentSortingDirection',
            JSON.stringify(sortDirection.value)
        );
    });

    const productsList = computed(() => mockProducts);
    const filteredProductsList = computed(() => {
        let filtered = productsList.value
            .filter((p) =>
                p.category
                    .toLowerCase()
                    .includes(categoryFilter.value.toLowerCase())
            )
            .filter((p) => {
                if (maxPriceFilter.value === '') {
                    return true;
                } else {
                    return p.price <= maxPriceFilter.value;
                }
            })
            .filter((p) => {
                if (minPriceFilter.value === '') {
                    return true;
                } else {
                    return p.price >= minPriceFilter.value;
                }
            })
            .filter((p) =>
                p.title.toLowerCase().includes(titleFilter.value.toLowerCase())
            );
        if (inStockFilter.value) {
            filtered = filtered.filter((p) => p.inStock);
        }
        if (sortDirection.value === 'ascending') {
            filtered.sort((p1, p2) => {
                if (sortValue.value === 'category') {
                    return p1.category.localeCompare(p2.category);
                } else if (sortValue.value === 'price') {
                    return p1.price - p2.price;
                } else {
                    return p1.title.localeCompare(p2.title);
                }
            });
        } else {
            filtered.sort((p1, p2) => {
                if (sortValue.value === 'category') {
                    return p2.category.localeCompare(p1.category);
                } else if (sortValue.value === 'price') {
                    return p2.price - p1.price;
                } else {
                    return p2.title.localeCompare(p1.title);
                }
            });
        }

        return filtered;
    });

    return {
        titleFilter,
        categoryFilter,
        maxPriceFilter,
        minPriceFilter,
        inStockFilter,
        sortValue,
        sortDirection,
        filteredProductsList,
        recentSortingList,
    };
};

export default useProductsPage;
