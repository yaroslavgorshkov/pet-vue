<template>
    <ul
        class="flex flex-1 flex-col gap-4 p-4 rounded-md border max-h-[500px] overflow-y-auto"
    >
        <span v-if="deleteResponse.message !== ''" class="text-red-500">{{
            deleteResponse.message
        }}</span>
        <li v-for="r in props.reportsList" class="flex flex-col gap-3 p-3 border rounded-md">
            <span>ID: {{ r.id }}</span>
            <span>Month: {{ r.month }}</span>
            <span>Planned tasks: {{ r.plannedTasks }}</span>
            <span>Completed tasks: {{ r.completedTasks }}</span>
            <div class="flex gap-10 justify-evenly">
                <NuxtLink
                    :to="`/task13/teams/${r.teamId}/reports/${r.id}`"
                    class="flex-1 p-3 rounded-md border text-center"
                >
                    See info
                </NuxtLink>
                <button
                    class="flex-1 p-3 rounded-md border"
                    @click="deleteReport(r.id)"
                >
                    Delete
                </button>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { MonthlyReport, Response } from '~~/shared/task13/types';

const props = defineProps<{
    reportsList: MonthlyReport[];
}>();

const emit = defineEmits<{
    (e: 'refresh'): void;
}>();

const deleteResponse = ref<Response>({
    isSucceed: false,
    message: '',
});

const deleteReport = async (reportId: number) => {
    try {
        const deletedReport = await $fetch<MonthlyReport>(
            `/api/reports/${reportId}`,
            {
                method: 'DELETE',
            }
        );

        emit('refresh');
    } catch (err: any) {
        deleteResponse.value = {
            isSucceed: false,
            message: err.statusMessage || 'Server error during deleting report',
        };
    }
};
</script>
