import type { FormResponse, Warehouse } from '~~/shared/task8/types';

export const useWarehouseList = (onRefresh: () => void) => {
    const formResponse = ref<FormResponse>({
        isSucceed: false,
        message: '',
    });

    const deleteWarehouse = async (warehouseId: number) => {
        try {
            const deletedWarehouse = await $fetch<Warehouse>(
                `/api/warehouses/${warehouseId}`,
                {
                    method: 'DELETE',
                }
            );

            formResponse.value = {
                isSucceed: true,
                message: `Warehouse with ID ${deletedWarehouse.id} and CODE ${deletedWarehouse.code} deleted`,
            };

            onRefresh();
        } catch (err: any) {
            formResponse.value = {
                isSucceed: false,
                message:
                    err.statusMessage ||
                    'Server error during deleting warehouse',
            };
        } finally {
        }
    };

    return {
        formResponse,
        deleteWarehouse,
    };
};

export default useWarehouseList;
