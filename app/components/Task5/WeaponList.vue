<template>
    <ul class="flex flex-col gap-3 p-4 rounded-md border">
        <li v-for="li in props.list" :key="li.id" class="flex flex-col gap-2 p-2 rounded-md border">
            <span>Name: {{ li.name }}</span>
            <span>Type: {{ li.type }}</span>
            <span>Damage: {{ li.damage }}</span>
            <span>Is equipped: {{ li.isEquipped ? 'yes' : 'no' }}</span>
            <NuxtLink :to="`/task5/armory/${li.id}`">Details</NuxtLink>
            <button @click="deleteWeapon(li.id)" class="p-2 border rounded-md">Delete weapon</button>
            <button @click="toggleEquipped(li.id, !li.isEquipped)" class="p-2 border rounded-md">Toggle equipped</button>
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { Weapon } from '~~/shared/types';

const props = defineProps<{
    list: Weapon[];
}>();

const emit = defineEmits<{
    (e: 'refresh'): void;
}>();

const deleteWeapon = async (id: number) => {
    await $fetch(`/api/weapons/${id}`, {
        method: 'DELETE',
    });

    emit('refresh');
};

const toggleEquipped = async (id: number, newIsEquipped: boolean) => {
    await $fetch(`/api/weapons/${id}`, {
        method: 'PATCH',
        body: {
            isEquipped: newIsEquipped
        }
    });

    emit('refresh');
};
</script>
