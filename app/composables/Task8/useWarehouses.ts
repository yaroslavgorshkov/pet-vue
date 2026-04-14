import type { MonthlyMovement, Warehouse } from '~~/shared/task8/types';

const useWarehouses = () => {
    const {
        data: warehouses,
        error: errorW,
        pending: pendingW,
        refresh: refreshW,
    } = useFetch<Warehouse[]>('/api/warehouses');
    const {
        data: movements,
    } = useFetch<MonthlyMovement[]>('/api/movements');

    const titleFilter = ref('');
    const codeFilter = ref('');
    const onlyDeficitFilter = ref(false);

    const filteredWarehouses = computed(() => {
        const filtered = warehouses.value
            ?.filter((w) =>
                w.title.toLowerCase().includes(titleFilter.value.toLowerCase())
            )
            .filter((w) => w.code.includes(codeFilter.value));
        return onlyDeficitFilter.value
            ? filtered?.filter((w) => w.isInDeficit)
            : filtered;
    });

    const filteredMovements = computed(() => {
        const filteredIds = filteredWarehouses.value?.map((w) => w.id);
        if (filteredIds === undefined) return undefined;
        return movements.value?.filter((m) =>
            filteredIds.includes(m.warehouseId)
        );
    });

    type WarehousesFilters = {
        titleFilter: string;
        codeFilter: string;
        onlyDeficitFilter: boolean;
    };
    watch(
        [titleFilter, codeFilter, onlyDeficitFilter],
        ([titleFilterNew, codeFilterNew, onlyDeficitFilterNew]) => {
            const warehousesFilters: WarehousesFilters = {
                titleFilter: titleFilterNew,
                codeFilter: codeFilterNew,
                onlyDeficitFilter: onlyDeficitFilterNew,
            };
            localStorage.setItem(
                'warehousesFilters',
                JSON.stringify(warehousesFilters)
            );
        }
    );
    onMounted(() => {
        const warehousesFilters = localStorage.getItem('warehousesFilters');
        if (warehousesFilters === null) {
            titleFilter.value = '';
            codeFilter.value = '';
            onlyDeficitFilter.value = false;
            return;
        }
        try {
            const warehousesFiltersParsed = JSON.parse(
                warehousesFilters
            ) as WarehousesFilters;
            titleFilter.value = warehousesFiltersParsed.titleFilter;
            codeFilter.value = warehousesFiltersParsed.codeFilter;
            onlyDeficitFilter.value = warehousesFiltersParsed.onlyDeficitFilter;
        } catch {
            titleFilter.value = '';
            codeFilter.value = '';
            onlyDeficitFilter.value = false;
        }
    });

    const refresh = async () => {
        await refreshW();
    };

    return {
        filteredWarehouses,
        filteredMovements,
        errorW,
        pendingW,
        titleFilter,
        codeFilter,
        onlyDeficitFilter,
        refresh,
    };
};

export default useWarehouses;
