<template>
    <label class="flex gap-4 p-3 border rounded-md">
        <span>
            {{ props.label }}
        </span>
        <input
            :type="props.type"
            :value="props.modelValue"
            @input="onInput"
            @blur="onBlur"
        />
    </label>
</template>

<script setup lang="ts">
const props = defineProps<{
    label: string;
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
    let actualValue: string | number;
    if (props.type === 'number') {
        if (rawValue === '') {
            actualValue = '';
        } else {
            const rawNumber = Number(rawValue);
            if (Number.isNaN(rawNumber)) {
                actualValue = '';
            } else {
                actualValue = rawNumber;
            }
        }
    } else {
        actualValue = rawValue;
    }

    emit('update:modelValue', actualValue);
};

const onBlur = () => {
    // const target = event.target as HTMLInputElement;
    // const rawValue = target.value;
    // let actualValue;
    // if (props.type === 'number') {
    //     if (rawValue === '') {
    //         actualValue = '';
    //     }
    //     const rawNumber = Number(target.value);
    //     if (Number.isNaN(rawNumber)) {
    //         actualValue = '';
    //     } else {
    //         actualValue = rawNumber;
    //     }
    // } else {
    //     if (rawValue.trim() === '') {
    //         actualValue = '';
    //     } else {
    //         actualValue = rawValue;
    //     }
    // }
    emit('blur');
};
</script>
