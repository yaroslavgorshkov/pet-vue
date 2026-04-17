import type { ActionResponse } from '~~/shared/task8/types';
import type { Employee } from '~~/shared/task9/types';

const useEmployeesList = (refresh: () => void) => {
    const deleteResponse = ref<ActionResponse>({
        isSucceed: false,
        message: '',
    });

    const deleteEmployee = async (employeeId: number) => {
        try {
            const deletedEmployee = await $fetch<Employee>(
                `/api/employees/${employeeId}`,
                {
                    method: 'DELETE',
                }
            );

            deleteResponse.value = {
                isSucceed: true,
                message: `Successfully deleted employee with ID ${deletedEmployee.id}`,
            };

            refresh();
        } catch (err: any) {
            deleteResponse.value = {
                isSucceed: false,
                message:
                    err.statusMessage ||
                    'Server error during deleting employee',
            };
        } finally {
            setTimeout(() => {
                deleteResponse.value = {
                    isSucceed: false,
                    message: '',
                };
            }, 10000);
        }
    };

    return {
        deleteResponse,
        deleteEmployee,
    };
};

export default useEmployeesList;