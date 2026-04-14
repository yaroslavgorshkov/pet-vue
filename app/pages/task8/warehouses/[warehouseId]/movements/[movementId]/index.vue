<template>
    <div class="flex flex-col gap-3">
        <span v-if="movement === undefined || error"
            >Something went wrong during getting movement info</span
        >
        <span v-else-if="pending">Pending...</span>
        <MovementInfo v-else :movement="movement" />
        <MovementChangeForm @refresh="refresh" :movement="movement" />
        <div class="line"></div>
        <NuxtLink :to="`/task8/warehouses/${warehouseId}`" class="figure">
            Return to warehouse info
        </NuxtLink>
        <NuxtLink :to="`/task8`" class="figure"> Return to homepage </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import MovementChangeForm from '~/components/Task8/Movements/MovementChangeForm.vue';
import MovementInfo from '~/components/Task8/Movements/MovementInfo.vue';
import useMovement from '~/composables/Task8/useMovement';

const { error, movement, pending, refreshMovement, warehouseId } =
    useMovement();

const refresh = async () => {
    await refreshMovement();
};
</script>
