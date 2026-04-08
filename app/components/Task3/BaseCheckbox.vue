<template>
    <label class="flex border rounded-sm gap-3 p-2">
        <span>
            {{ props.label }}
        </span>
        <input type="checkbox" :checked="props.modelValue" @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)">
    </label>
</template>

<script setup lang="ts">

const props = defineProps<{
    label: string;
    modelValue: boolean;
}>()

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void
}>()
</script>