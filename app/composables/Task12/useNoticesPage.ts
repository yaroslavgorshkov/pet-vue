import type { SortDirection, SortValue } from '~~/shared/task12/types';

const useNoticesPage = () => {
    const route = useRoute();

    const router = useRouter();

    const titleFilter = ref(route.query.title ? String(route.query.title) : '');
    const categoryFilter = ref(
        route.query.category ? String(route.query.category) : ''
    );
    const contentFilter = ref(
        route.query.content ? String(route.query.content) : ''
    );
    const onlyPinnedFilter = ref(route.query.onlyPinned === 'true');

    const sortValue = ref<SortValue>(
        route.query.sort ? (String(route.query.sort) as SortValue) : 'title'
    );
    const sortDirection = ref<SortDirection>(
        route.query.direction
            ? (String(route.query.direction) as SortDirection)
            : 'ascending'
    );

    watch(
        [
            titleFilter,
            categoryFilter,
            contentFilter,
            onlyPinnedFilter,
            sortValue,
            sortDirection,
        ],
        ([
            titleFilterNew,
            categoryFilterNew,
            contentFilterNew,
            onlyPinnedFilterNew,
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
                    content:
                        contentFilterNew !== '' ? contentFilterNew : undefined,
                    onlyPinned: onlyPinnedFilterNew ? 'true' : undefined,
                    sort: sortValueNew,
                    direction: sortDirectionNew,
                },
            });
        },
        { immediate: true }
    );

    const { data: notices, refresh, error, pending } = useFetch('/api/notices');

    const filteredAndSortedNotices = computed(() => {
        if (notices.value === undefined) return undefined;
        let filteredAndSorted = notices.value
            .filter((n) =>
                n.category
                    .toLowerCase()
                    .includes(categoryFilter.value.toLowerCase())
            )
            .filter((n) =>
                n.content
                    .toLowerCase()
                    .includes(contentFilter.value.toLowerCase())
            )
            .filter((n) =>
                n.title.toLowerCase().includes(titleFilter.value.toLowerCase())
            );
        if (onlyPinnedFilter.value) {
            filteredAndSorted = filteredAndSorted.filter((n) => n.isPinned);
        }
        if (sortDirection.value === 'ascending') {
            if (sortValue.value === 'category') {
                filteredAndSorted.sort((n1, n2) =>
                    n1.category.localeCompare(n2.category)
                );
            } else if (sortValue.value === 'content') {
                filteredAndSorted.sort((n1, n2) =>
                    n1.content.localeCompare(n2.content)
                );
            } else {
                filteredAndSorted.sort((n1, n2) =>
                    n1.title.localeCompare(n2.title)
                );
            }
        } else {
            if (sortValue.value === 'category') {
                filteredAndSorted.sort((n1, n2) =>
                    n2.category.localeCompare(n1.category)
                );
            } else if (sortValue.value === 'content') {
                filteredAndSorted.sort((n1, n2) =>
                    n2.content.localeCompare(n1.content)
                );
            } else {
                filteredAndSorted.sort((n1, n2) =>
                    n2.title.localeCompare(n1.title)
                );
            }
        }

        return filteredAndSorted;
    });

    return {
        filteredAndSortedNotices,
        refresh,
        error,
        pending,
        titleFilter,
        categoryFilter,
        contentFilter,
        onlyPinnedFilter,
        sortValue,
        sortDirection,
    };
};

export default useNoticesPage;
