<template>
    <label class="flex gap-4 p-4 border rounded-xl">
        <span>
            {{ props.label }}
        </span>
        <input type="checkbox" :checked="props.modelValue" @change="onChange">
    </label>
</template>

<script setup lang="ts">

const props = defineProps<{
    modelValue: boolean
    label: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()

const onChange = (e: Event) => {
    const checked = (e.target as HTMLInputElement).checked;
    emit('update:modelValue', checked);
}

</script>