<template>
    <div class="flex flex-col gap-4">
        <span v-if="formResponse.statusMessage !== ''" class="text-red-500">{{
            formResponse.statusMessage
        }}</span>
        <ul
            class="flex flex-col gap-4 p-4 rounded-md border max-h-[500px] overflow-y-auto"
        >
            <li
                v-for="n in props.noticesList"
                class="flex flex-col gap-3 p-3 rounded-md border"
            >
                <span>ID: {{ n.id }}</span>
                <span>Title: {{ n.title }}</span>
                <span>Category: {{ n.category }}</span>
                <span>Content: {{ n.content }}</span>
                <span>Pinned: {{ n.isPinned ? 'yes' : 'no' }}</span>
                <div class="flex px-10 gap-10">
                    <NuxtLink
                        class="p-4 border rounded-md flex-1 text-center"
                        :to="`/task12/notices/${n.id}`"
                    >
                        See info
                    </NuxtLink>
                    <button
                        @click="deleteNotice(n.id)"
                        class="p-4 border rounded-md flex-1"
                    >
                        Delete
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type { Notice, Response } from '~~/shared/task12/types';

const props = defineProps<{
    noticesList: Notice[];
}>();

const emit = defineEmits<{
    (e: 'refresh'): void;
}>();

const formResponse = ref<Response>({
    isSucceed: false,
    statusMessage: '',
});

const deleteNotice = async (noticeId: number) => {
    try {
        const deletedNotice = await $fetch<Notice>(`/api/notices/${noticeId}`, {
            method: 'DELETE',
        });

        console.log(`Successfully deleted notice with ID ${deletedNotice.id}`);

        emit('refresh');
    } catch (err: any) {
        formResponse.value = {
            isSucceed: false,
            statusMessage:
                err.statusMessage || 'Server error during deleting notice',
        };
    }
};
</script>
