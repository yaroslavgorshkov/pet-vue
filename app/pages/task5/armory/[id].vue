<template>
    <div class="flex flex-col gap-2">
        <span v-if="!weapon">There are no weapons with this ID</span>
        <div v-else class="flex flex-col gap-3 p-4 rounded-md border">
            <span>name: {{ weapon.name }}</span>
            <span>damage: {{ weapon.damage }}</span>
            <span>type: {{ weapon.type }}</span>
            <span>isEquipped: {{ weapon.isEquipped ? 'yes' : 'no' }}</span>
        </div>
        <NuxtLink :to="'/task5'">
            Back home
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
import type { Weapon } from '~~/shared/types';

const route = useRoute();
const paramsId = route.params.id;
const {data: weapon} = await useFetch<Weapon>(`/api/weapons/${paramsId}`)

</script>
