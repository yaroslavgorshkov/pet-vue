<template>
    <div class="flex gap-4 border rounded-md">
        <span
            v-if="props.label !== undefined"
            class="p-4 pr-0 rounded-md rounded-r-none"
            >{{ props.label }}</span
        >
        <input
            class="outline-none"
            :class="
                props.label === undefined
                    ? 'p-4 rounded-md'
                    : 'p-4 pl-0 rounded-md rounded-l-none'
            "
            :placeholder="props.placeholder ?? ''"
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
    type?: 'number' | 'text';
    modelValue: string | number;
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
