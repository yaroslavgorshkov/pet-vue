<template>
    <div class="flex gap-4 p-4 rounded-md border items-center">
        <span>{{ props.label }}</span>
        <input type="checkbox" :checked="props.modelValue" @change="onChange">
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    modelValue: boolean;
    label?: string;
}>()

const emit = defineEmits<{
    (e: "update:modelValue", value: boolean): void;
}>()

const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;
    emit('update:modelValue', checked);
}

</script>