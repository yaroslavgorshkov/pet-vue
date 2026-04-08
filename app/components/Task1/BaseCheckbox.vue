<template>
    <label class="flex p-3 rounded-full border gap-3 items-center w-fit">
        <span>
            {{ props.label }}
        </span>
        <input type="checkbox" :checked="props.checked" @change="onChange">
    </label>
</template>

<script lang="ts" setup>
const props = defineProps<{
    label: string
    checked: boolean
}>()

const emit = defineEmits<{
    (e: 'update:checked', value: boolean): void
}>()

const onChange = (e: Event) => {
    const isChecked = (e.target as HTMLInputElement).checked;
    emit('update:checked', isChecked)
}
</script>