<template>
    <div class="flex gap-3 rounded-md border">
        <span class="p-4 pr-0 rounded-md rounded-r-none">{{
            props.label
        }}</span>
        <input
            class="p-4 pl-0 rounded-md rounded-l-none outline-none"
            :type="props.type ?? 'text'"
            @input="onInput"
            @blur="onBlur"
            :placeholder="props.placeholder"
            :value="props.modelValue"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    type?: 'number' | 'text';
    label?: string;
    modelValue: string | number;
    placeholder?: string;
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
