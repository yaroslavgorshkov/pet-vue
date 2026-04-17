<template>
    <ul class="box-col-md overflow-y-auto max-h-[400px] flex-1 max-w-[700px] min-w-[500px]">
        <span
            v-if="deleteResponse.message !== ''"
            class="text-lg"
            :class="
                deleteResponse.isSucceed ? 'text-green-500' : 'text-red-500'
            "
            >{{ deleteResponse.message }}</span
        >
        <li v-for="w in props.worklogList" :key="w.id" class="box-col-sm">
            <span>ID: {{ w.id }}</span>
            <span>Month: {{ w.month }}</span>
            <span>Planned hours: {{ w.plannedHours }}</span>
            <span>Actual hours: {{ w.actualHours }}</span>
            <div class="flex  gap-3 w-full items-center justify-evenly">
                <NuxtLink
                    :to="`/task9/employees/${w.employeeId}/worklogs/${w.id}`"
                    class="figure flex-1"
                >
                    See info
                </NuxtLink>
                <button class="figure flex-1" @click="deleteWorklog(w.id)">
                    Delete
                </button>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { MonthlyWorkLog } from '~~/shared/task9/types';
import '../../assets/style.css';
import type { ActionResponse } from '~~/shared/task8/types';

const props = defineProps<{
    worklogList: MonthlyWorkLog[];
}>();

const emit = defineEmits<{
    (e: 'refresh'): void;
}>();

const deleteResponse = ref<ActionResponse>({
    isSucceed: false,
    message: '',
});

const deleteWorklog = async (worklogId: number) => {
    try {
        const deletedWorklog = await $fetch<MonthlyWorkLog>(
            `/api/worklogs/${worklogId}`,
            {
                method: 'DELETE',
            }
        );

        deleteResponse.value = {
            isSucceed: true,
            message: `Successfully deleted worklog with ID ${deletedWorklog.id}`,
        };

        emit('refresh');
    } catch (err: any) {
        deleteResponse.value = {
            isSucceed: false,
            message:
                err.statusMessage || 'Server error during deleting worklog',
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
</script>
