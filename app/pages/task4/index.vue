<template>
    <div class="flex flex-col gap-2">
        <span>
            My Potions
        </span>
        <div class="w-full h-px bg-black"></div>
        <div class="flex gap-4">
            <PotionList :list="potions"/>
            <PotionCreationForm @refresh="refreshView"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import PotionCreationForm from '~/components/Task4/PotionCreationForm.vue';
import PotionList from '~/components/Task4/PotionList.vue';

const {data: potions, pending, error, refresh } = useFetch<Potion[]>('/api/potions')

const refreshView = async () => {
    await refresh();
}

</script>