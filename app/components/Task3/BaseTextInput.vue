<template>
    <label class="p-2 flex gap-3 border rounded-sm">
        <span>
            {{ props.label }}
        </span>
        <input type="text" :value="props.modelValue" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)">
    </label>
</template>

<script setup lang="ts">

const props = defineProps<{
    label: string;
    modelValue: string;
}>()

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void
}>()

</script>