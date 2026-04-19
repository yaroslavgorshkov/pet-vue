<template>
    <div class="flex gap-10">
        <div class="flex flex-col gap-3 flex-1">
            <span>Notices</span>
            <div class="w-full h-px bg-black"></div>
            <div
                v-if="error || filteredAndSortedNotices === undefined"
                class="p-4 rounded-md flex items-center justify-center border"
            >
                <span>Error during getting notices</span>
            </div>
            <div
                v-else-if="pending"
                class="p-4 rounded-md flex items-center justify-center border"
            >
                <span>Pending...</span>
            </div>
            <div
                v-else-if="filteredAndSortedNotices.length === 0"
                class="p-4 rounded-md flex items-center justify-center border"
            >
                <span>There are no notices yet</span>
            </div>
            <NoticesList v-else :notices-list="filteredAndSortedNotices" @refresh="onRefresh"/>
        </div>
        <div class="flex flex-col gap-4">
            <NoticesFilters
                v-model:category-filter="categoryFilter"
                v-model:content-filter="contentFilter"
                v-model:only-pinned-filter="onlyPinnedFilter"
                v-model:sort-direction="sortDirection"
                v-model:sort-value="sortValue"
                v-model:title-filter="titleFilter"
            />
            <NoticeAddForm @refresh="onRefresh"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import NoticeAddForm from '~/components/Task12/NoticeAddForm.vue';
import NoticesFilters from '~/components/Task12/NoticesFilters.vue';
import NoticesList from '~/components/Task12/NoticesList.vue';
import useNoticesPage from '~/composables/Task12/useNoticesPage';

definePageMeta({
    layout: 'task12',
    middleware: 'task12-auth',
});

const {
    filteredAndSortedNotices,
    refresh,
    error,
    pending,
    titleFilter,
    categoryFilter,
    contentFilter,
    onlyPinnedFilter,
    sortValue,
    sortDirection,
} = useNoticesPage();

const onRefresh = async () => {
    await refresh();
}
</script>
