<template>
    <div class="flex gap-3 rounded-md border">
        <span class="p-4 pr-0 rounded-md rounded-r-none">
            {{ props.label }}
        </span>
        <input
            class="p-4 pl-0 rounded-md rounded-l-none"
            type="checkbox"
            :checked="props.modelValue"
            @change="onChange"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    label?: string;
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'blur'): void;
}>();

const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const rawValue = target.checked;
    emit('update:modelValue', rawValue);
};
</script>
