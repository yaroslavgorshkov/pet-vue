<template>
    <div class="flex flex-col gap-2">
        <span> My Potions </span>
        <div class="w-full h-px bg-black"></div>
        <div class="flex gap-4 items-start">
            <span v-if="pending"> List is pending... </span>
            <span v-else-if="error"> Error during getting potions list </span>
            <span v-else-if="isPotionListEmpty"> Potion list is empty </span>
            <PotionList v-else :list="potions" @refresh="refreshView" />
            <PotionCreationForm @refresh="refreshView" />
        </div>
    </div>
</template>

<script setup lang="ts">
import PotionCreationForm from '~/components/Task4/PotionCreationForm.vue';
import PotionList from '~/components/Task4/PotionList.vue';

const {
    data: potions,
    pending,
    error,
    refresh,
} = await useFetch<Potion[]>('/api/potions');

const isPotionListEmpty = computed(() => {
    if (potions.value === undefined) return true;
    else {
        return potions.value.length === 0;
    }
});

const refreshView = async () => {
    await refresh();
};
</script>
