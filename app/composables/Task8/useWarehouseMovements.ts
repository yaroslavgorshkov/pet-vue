import type { MonthlyMovement, Warehouse } from '~~/shared/task8/types';

const useWarehouseMovements = () => {
    const route = useRoute();
    const warehouseId = route.params?.warehouseId;
    const {
        data: warehouse,
        refresh: refreshW,
        pending: pendingW,
        error: errorW,
    } = useFetch<Warehouse>(`/api/warehouses/${warehouseId}`);

    const {
        data: movements,
        refresh: refreshM,
        pending: pendingM,
        error: errorM,
    } = useFetch<MonthlyMovement[]>(
        `/api/warehouses/${warehouseId}/movements`
    );

    const refresh = async () => {
        await refreshW();
        await refreshM();
    };

    return {
        warehouse,
        pendingW,
        errorW,
        movements,
        pendingM,
        errorM,
        refresh,
    };
};

export default useWarehouseMovements;
