<template>
    <div class="flex gap-4 items-center">
        <span v-if="props.label !== ''">{{ props.label }}</span>
        <ul class="flex gap-4 p-4 border rounded-lg">
            <li
                v-for="e in props.list"
                :key="e.id"
                class="rounded-lg p-3"
                :class="
                    e.value === props.modelValue
                        ? 'bg-gray-300'
                        : 'bg-transparent'
                "
            >
                <button @click="changeTabsValue(e.value)" type="button">
                    <span>{{ e.label }}</span>
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type {
    PinnedStatus,
    PinnedStatusItem,
    SortDirection,
    SortDirectionItem,
    SortValue,
    SortValueItem,
} from '~~/shared/task12/types';

const props = defineProps<{
    modelValue: SortValue | SortDirection | PinnedStatus;
    list: SortValueItem[] | SortDirectionItem[] | PinnedStatusItem[];
    label?: string;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: SortValue | SortDirection | PinnedStatus): void;
}>();

const changeTabsValue = (e: SortValue | SortDirection | PinnedStatus) => {
    emit('update:modelValue', e);
};
</script>
