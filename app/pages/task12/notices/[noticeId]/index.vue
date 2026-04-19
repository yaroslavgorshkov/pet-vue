<template>
    <div class="flex flex-col gap-4 w-full max-w-[500px]">
        <span>Notice changing</span>
        <div class="w-full h-px bg-black"></div>
        <NoticeInfo :notice="notice" />
        <NoticeChangingForm @refresh="onRefresh" />
        <NuxtLink :to="'/task12/notices'" class="p-4 border rounded-md text-center">
            Return to notices
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import NoticeChangingForm from '~/components/Task12/NoticeChangingForm.vue';
import NoticeInfo from '~/components/Task12/NoticeInfo.vue';

definePageMeta({
    layout: 'task12',
    middleware: 'task12-auth',
});

const route = useRoute();
const noticeId = computed(() => route.params.noticeId ?? '');
const { data: notice, refresh } = useFetch(`/api/notices/${noticeId.value}`);
const onRefresh = async () => {
    await refresh();
};
</script>
