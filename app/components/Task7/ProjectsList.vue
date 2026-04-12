<template>
    <ul
        class="flex flex-col max-h-[500px] overflow-y-auto p-4 gap-4 border rounded-md"
    >
        <span
            v-if="formResponse.message !== ''"
            class="text-xl font-bold"
            :class="formResponse.isSucceed ? 'text-green-400' : 'text-red-400'"
        >
            {{ formResponse.message }}</span
        >
        <li
            v-for="p in props.projectsList"
            :key="p.id"
            class="p-3 border rounded-md flex flex-col gap-2 w-full items-start min-w-[200px]"
        >
            <span>Title: {{ p.title }}</span>
            <span>Code: {{ p.code }}</span>
            <span>Description: {{ p.description }}</span>
            <span>Owner: {{ p.owner }}</span>
            <span>Is over budget: {{ p.isOverBudget ? 'yes' : 'no' }}</span>
            <div class="flex w-full justify-evenly">
                <button
                    class="w-fit p-3 rounded-md border"
                    @click="deleteProject(p.id)"
                >
                    Delete
                </button>
                <NuxtLink
                    class="w-fit p-3 rounded-md border"
                    :to="`/task7/projects/${p.id}`"
                >
                    See details
                </NuxtLink>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { Project } from '~~/shared/types';

const props = defineProps<{
    projectsList: Project[];
}>();

const emit = defineEmits<{
    (e: 'refresh'): void;
}>();

type FormResponse = {
    message: string;
    isSucceed: boolean;
};

const formResponse = ref<FormResponse>({
    isSucceed: false,
    message: '',
});

const deleteProject = async (projectId: number) => {
    try {
        const deletedProject = await $fetch<Project>(
            `api/projects/${projectId}`,
            {
                method: 'DELETE',
            }
        );

        formResponse.value = {
            isSucceed: true,
            message: `Successfully deleted project with ID ${deletedProject.id} and code ${deletedProject.code}`,
        };

        emit('refresh');
    } catch (err: any) {
        formResponse.value = {
            isSucceed: false,
            message: err.statusMessage || 'Server error',
        };
    } finally {
        setTimeout(() => {
            formResponse.value = {
                isSucceed: false,
                message: '',
            };
        }, 10000);
    }
};
</script>
