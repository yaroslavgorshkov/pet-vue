<template>
    <div class="flex gap-3 rounded-md border">
        <span class="p-4 pr-0 rounded-md rounded-r-none">
            {{ props.label }}
        </span>
        <input
            class="p-4 pl-0 rounded-md rounded-l-none outline-none"
            :type="props.type ?? 'text'"
            :value="props.modelValue"
            @input="onInput"
            @blur="onBlur"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    label?: string;
    placeholder?: string;
    modelValue: string | number;
    type?: 'text' | 'number' | 'email';
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
    (e: 'blur'): void;
}>();

const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const rawValue = target.value;
    if (props.type === 'number') {
        const parsed = rawValue === '' ? '' : Number(rawValue);
        emit('update:modelValue', parsed);
    } else {
        emit('update:modelValue', rawValue);
    }
};

const onBlur = () => {
    emit('blur');
};
</script>
