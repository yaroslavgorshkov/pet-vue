<template>
    <label class="rounded-md flex gap-3 border w-fit">
        <span class="p-3 pr-0">{{ props.label }}</span>
        <input
            :type="props.type"
            :placeholder="props.placeholder"
            :value="props.modelValue ?? ''"
            @input="onInput"
            @blur="onBlur"
            class="p-3 pl-0 outline-none rounded-md"
        />
    </label>
</template>

<script setup lang="ts">
const props = defineProps<{
    label: string;
    type: 'text' | 'number';
    placeholder?: string;
    modelValue: string | number | undefined;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'blur'): void
}>()

const onBlur = () => {
    emit('blur');
}

const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const rawValue = target.value;
    if(props.type === 'number') {
        if(rawValue === '') {
            emit('update:modelValue', '')
        } else if (Number.isNaN(Number(rawValue))) {
            emit('update:modelValue', '')
        } else {
            emit('update:modelValue', rawValue)
        }
    } else {
        emit('update:modelValue', rawValue)
    }
}

</script>
