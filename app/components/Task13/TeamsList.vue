<template>
    <ul
        class="flex flex-col gap-4 p-4 rounded-md border flex-1 max-h-[500px] overflow-y-auto"
    >
        <span v-if="deleteResponse.message !== ''" class="text-red-500">{{
            deleteResponse.message
        }}</span>
        <li
            v-for="t in props.teamsList"
            class="flex flex-col gap-3 p-3 rounded-md border"
        >
            <span>ID: {{ t.id }}</span>
            <span>Title: {{ t.title }}</span>
            <span>Code: {{ t.code }}</span>
            <span>Lead: {{ t.lead }}</span>
            <span>Description: {{ t.description }}</span>
            <span>Behind plan?: {{ t.isBehindPlan ? 'yes' : 'no' }}</span>
            <div class="flex gap-10">
                <NuxtLink
                    :to="`/task13/teams/${t.id}`"
                    class="p-4 border rounded-md flex-1 text-center"
                >
                    See info
                </NuxtLink>
                <button
                    class="p-4 border rounded-md flex-1"
                    @click="deleteTeam(t.id)"
                >
                    Delete
                </button>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { Response, Team } from '~~/shared/task13/types';

const props = defineProps<{
    teamsList: Team[];
}>();

const emit = defineEmits<{
    (e: 'refresh'): void;
}>();

const deleteResponse = ref<Response>({
    isSucceed: false,
    message: '',
});

const deleteTeam = async (teamId: number) => {
    try {
        const deletedTeam = await $fetch<Team>(`/api/teams/${teamId}`, {
            method: 'DELETE',
        });

        emit('refresh');
    } catch (err: any) {
        deleteResponse.value = {
            isSucceed: false,
            message: err.statusMessage || 'Server error during deleting team',
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
