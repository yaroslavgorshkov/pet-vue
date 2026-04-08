<template>
    <label class="flex gap-4 p-3 border rounded-md">
        <span>
            {{ props.label }}
        </span>
        <input
            :type="typeof modelValue === 'string' ? 'text' : 'number'"
            :value="props.modelValue"
            @input="
                emit(
                    'update:modelValue',
                    ($event.target as HTMLInputElement).value
                )
            "
        />
    </label>
</template>

<script setup lang="ts">
const props = defineProps<{
    label: string;
    modelValue: string | number;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
}>();
</script>
