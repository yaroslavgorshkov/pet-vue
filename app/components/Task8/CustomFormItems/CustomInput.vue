<template>
    <div class="flex rounded-md border">
        <span class="p-4 pr-0 rounded-md rounded-r-none">
            {{ props.label }}
        </span>
        <input
            class="p-4 rounded-md rounded-l-none outline-none"
            :value="props.modelValue"
            :type="props.type"
            :placeholder="props.placeholder"
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
    type: 'text' | 'number';
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
    (e: 'blur'): void;
}>();

const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const rawValue = target.value;
    let actualValue;
    if (props.type === 'number') {
        actualValue = rawValue === '' ? '' : Number(rawValue);
    } else {
        actualValue = rawValue;
    }
    emit('update:modelValue', actualValue);
};

const onBlur = () => {
    emit('blur');
};
</script>
