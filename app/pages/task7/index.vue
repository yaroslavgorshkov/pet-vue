<template>
    <div class="flex flex-col gap-3 p-4 max-w-[1000px]">
        <span> Projects </span>
        <div class="w-full h-px bg-black"></div>
        <span v-if="filteredProjectsList === undefined"
            >Error during getting projects</span
        >
        <!-- <span v-else-if="pending">Pending...</span> -->
        <span v-else-if="error">Error during getting projects. Try later</span>
        <div v-else class="flex gap-4">
            <span
                v-if="
                    filteredProjectsList === undefined ||
                    filteredProjectsList.length === 0
                "
                >Project list is empty</span
            >
            <ProjectsList v-else :projects-list="filteredProjectsList" @refresh="refreshData"/>
            <div class="flex flex-col gap-4">
                <ProjectsFilters
                    v-model:code-filter="codeFilter"
                    v-model:title-filter="titleFilter"
                    v-model:is-only-over-budget-filter="isOnlyOverBudgetFilter"
                />
                <AddProjectForm @refresh="refreshData" />
                <div class="flex flex-col gap-3">
                    <span v-if="filteredProjectsList === undefined"
                        >Error during getting projects list</span
                    >
                    <span v-else-if="filteredProjectsList.length === 0"
                        >Project list is empty</span
                    >
                    <span v-else-if="expenses === undefined"
                        >Error during getting expenses list</span
                    >
                    <span v-else-if="expenses.length === 0"
                        >Expenses list is empty</span
                    >
                    <ProjectsStatistics
                        v-else
                        :projects="filteredProjectsList"
                        :expenses="filteredExpenses"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AddProjectForm from '~/components/Task7/AddProjectForm.vue';
import ProjectsFilters from '~/components/Task7/ProjectsFilters.vue';
import ProjectsList from '~/components/Task7/ProjectsList.vue';
import ProjectsStatistics from '~/components/Task7/ProjectsStatistics.vue';
import type { MonthlyExpense, Project } from '~~/shared/types';

// API DATA
const {
    data: projects,
    refresh: refreshProjects,
    pending,
    error,
} = await useFetch<Project[]>('/api/projects');

const { data: expenses } = await useFetch<MonthlyExpense[]>('/api/expenses');

const refreshData = async () => {
    await refreshProjects();
};

// REFS
const titleFilter = ref('');
const codeFilter = ref('');
const isOnlyOverBudgetFilter = ref(false);

// COMPUTED
const filteredProjectsList = computed(() => {
    if (projects.value === undefined) {
        return undefined;
    } else if (projects.value.length === 0) {
        return [];
    } else {
        const filtered = projects.value
            .filter((p) =>
                p.title.toLowerCase().includes(titleFilter.value.toLowerCase())
            )
            .filter((p) => p.code.includes(codeFilter.value));
        if (isOnlyOverBudgetFilter.value) {
            return filtered.filter((p) => p.isOverBudget);
        } else {
            return filtered;
        }
    }
});

const filteredExpenses = computed(() => {
    if (
        filteredProjectsList.value === undefined ||
        expenses.value === undefined
    ) {
        return undefined;
    }
    const filteredIds = filteredProjectsList.value.map((p) => p.id);
    const filteredExpenses = expenses.value.filter((e) =>
        filteredIds.includes(e.projectId)
    );
    return filteredExpenses;
});

// UTILS
type ProjectFilter = {
    titleFilter: string;
    codeFilter: string;
    isOnlyOverBudgetFilter: boolean;
};

watch(
    [titleFilter, codeFilter, isOnlyOverBudgetFilter],
    ([titleFilterNew, codeFilterNew, isOnlyOverBudgetFilterNew]) => {
        const projectsFilter: ProjectFilter = {
            titleFilter: titleFilterNew,
            codeFilter: codeFilterNew,
            isOnlyOverBudgetFilter: isOnlyOverBudgetFilterNew,
        };

        localStorage.setItem('projectsFilter', JSON.stringify(projectsFilter));
    }
);

onMounted(() => {
    const projectsFilter = localStorage.getItem('projectsFilter');
    if (projectsFilter === null) {
        titleFilter.value = '';
        codeFilter.value = '';
        isOnlyOverBudgetFilter.value = false;
    } else {
        try {
            const projectsFilterParsed: ProjectFilter =
                JSON.parse(projectsFilter);
            titleFilter.value = projectsFilterParsed.titleFilter;
            codeFilter.value = projectsFilterParsed.codeFilter;
            isOnlyOverBudgetFilter.value =
                projectsFilterParsed.isOnlyOverBudgetFilter;
        } catch (err) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Error during parsing projects filters',
            });
        }
    }
});
</script>
