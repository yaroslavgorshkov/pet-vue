import type { ActionResponse, MonthlyMovement } from '~~/shared/task8/types';

const useMovementList = (refresh: () => void) => {
    const route = useRoute();
    const warehouseId = route.params.warehouseId;

    const deleteResponse = ref<ActionResponse>({
        isSucceed: false,
        message: '',
    });

    const deleteMovement = async (movementId: number) => {
        try {
            const deletedMovement = await $fetch<MonthlyMovement>(
                `/api/movements/${movementId}`,
                {
                    method: 'DELETE',
                }
            );

            deleteResponse.value = {
                isSucceed: true,
                message: `Successfully deleted movement with ID ${deletedMovement.id} of warehouse with ID ${warehouseId}`,
            };

            refresh();
        } catch (err: any) {
            deleteResponse.value = {
                isSucceed: false,
                message:
                    err.statusMessage ||
                    'Server error during deleting movement',
            };
        }
    };

    return {
        warehouseId,
        deleteResponse,
        deleteMovement,
    };
};

export default useMovementList;
