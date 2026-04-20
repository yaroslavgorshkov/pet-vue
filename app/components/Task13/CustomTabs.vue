<template>
    <div class="flex gap-4 items-center">
        <span>
            {{ props.label }}
        </span>
        <ul class="p-3 rounded-full border flex gap-4">
            <li v-for="i in props.list" :key="i.id">
                <button
                    class="p-3 rounded-full w-fit"
                    :class="
                        i.value === props.modelValue
                            ? 'bg-slate-600'
                            : 'bg-transparent'
                    "
                    @click="onClick(i.value)"
                >
                    <span>{{ i.label }}</span>
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type { TabsList } from '~~/shared/task13/types';

const props = defineProps<{
    modelValue: string;
    list: TabsList;
    label: string;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
}>();

const onClick = (value: string) => {
    emit('update:modelValue', value);
};
</script>
