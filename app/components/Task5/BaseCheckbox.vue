<template>
    <label class="flex gap-4 p-3 border rounded-md">
        <span>
            {{ props.label }}
        </span>
        <input
            type="checkbox"
            :checked="props.modelValue"
            @change="
                emit(
                    'update:modelValue',
                    ($event.target as HTMLInputElement).checked
                )
            "
        />
    </label>
</template>

<script setup lang="ts">
const props = defineProps<{
    label: string;
    modelValue: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
}>();
</script>
