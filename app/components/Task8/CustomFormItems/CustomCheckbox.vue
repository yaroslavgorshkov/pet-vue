<template>
    <div class="flex rounded-md border gap-3">
        <span class="p-4 pr-0 rounded-md rounded-r-none">
            {{ props.label }}
        </span>
        <input
            class="p-4 rounded-md rounded-l-none outline-none"
            :checked="props.modelValue"
            @change="onChange"
            type="checkbox"
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
}>();

const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    emit('update:modelValue', checked);
}
</script>
