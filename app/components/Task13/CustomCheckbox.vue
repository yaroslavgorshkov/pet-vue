<template>
    <div class="flex gap-4 border rounded-md items-center">
        <span class="p-4 pr-0 rounded-md rounded-r-none">{{
            props.label
        }}</span>
        <input
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
}>();

const onChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const checked = target.checked;

    emit('update:modelValue', checked);
};
</script>
