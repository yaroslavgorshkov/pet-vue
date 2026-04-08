<template>
    <label class="flex p-3 rounded-full border gap-3 items-center w-fit">
        <span>{{ props.label }}</span>
        <input type="text" :value="props.value" @input="onInput">
    </label>
</template>

<script setup lang="ts">
    const props = defineProps<{
        label: string
        value: string
    }>();

    const emit = defineEmits<{
        (e: 'update:value', value: string): void
    }>();

    const onInput = (e: Event) => {
        const value = (e.target as HTMLInputElement).value;
        emit('update:value', value);
    }
</script>