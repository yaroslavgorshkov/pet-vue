<template>
    <label class="flex gap-3 border rounded-md">
        <span class="p-3 pr-0">{{ props.label }}</span>
        <input
            type="checkbox"
            :placeholder="props.placeholder"
            :checked="props.modelValue"
            @change="onChange"
        />
    </label>
</template>

<script setup lang="ts">
const props = defineProps<{
    label: string;
    placeholder: string;
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();

const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;
    emit('update:modelValue', isChecked);
};
</script>
