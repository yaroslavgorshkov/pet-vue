import type { MonthlyMovement } from "~~/shared/task8/types";

const useMovement = () => {
    const route = useRoute();
    const movementId = route.params?.movementId;
    const warehouseId = route.params?.warehouseId;

    const {
        data: movement,
        error,
        pending,
        refresh: refreshMovement,
    } = useFetch<MonthlyMovement>(`/api/movements/${movementId}`);

    return {
        movement,
        error,
        pending,
        refreshMovement,
        warehouseId
    };
};

export default useMovement;
