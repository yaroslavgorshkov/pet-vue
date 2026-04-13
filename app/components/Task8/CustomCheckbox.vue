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

const onInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const rawValue = target.value;
    return rawValue;
}

</script>
