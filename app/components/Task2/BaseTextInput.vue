<template>
    <label class="flex gap-4 p-4 border rounded-xl">
        <span>
            {{ props.label }}
        </span>
        <input type="text" :value="props.modelValue" @input="onInput" class="outline-none">
    </label>
</template>

<script setup lang="ts">

const props = defineProps<{
    modelValue: string
    label: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()

const onInput = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    emit('update:modelValue', value);
}

</script>