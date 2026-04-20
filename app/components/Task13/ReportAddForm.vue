<template>
    <div class="flex flex-col gap-3">
        <span>Report add form</span>
        <div class="bg-black w-full h-px"></div>
        <form class="flex flex-col gap-4 p-4 border rounded-md">
            <CustomInput />
            <span></span>
            X3
        </form>
        <span></span>
    </div>
</template>

<script setup lang="ts">
import CustomInput from './CustomInput.vue';

const emit = defineEmits<{
    (e: 'refresh'): void;
}>();

const refresh = () => {
    emit('refresh');
}

const {} = useReportAddForm(refresh);

</script>
