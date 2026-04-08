<template>
    <span v-if="pending">
        Pending...
    </span>
    <span v-else-if="error">
        Error during getting data for potions list
    </span>
    <span v-else-if="isPotionListEmpty">
        Potion list is empty
    </span>
    <ul v-else class="flex flex-col gap-2 p-4 border rounded-md">
        <span>
            Potions:
        </span>
        <div class="w-full h-px bg-black"></div>
        <li v-for="potion in list" :key="potion.id" class="flex flex-col gap-1 p-4 border rounded-md">
            <span>Name: {{ potion.name }}</span>
            <span>Effect: {{ potion.effect }}</span>
            <span>Price: {{ potion.price }}</span>
            <span>In stock: {{ potion.inStock ? 'yes' : 'no'}}</span>
            <div class="flex gap-4">
                <button class="p-3 rounded-md border" @click="() => deletePotion(potion.id)">
                    Delete Potion
                </button>
                <button class="p-3 rounded-md border" @click="() => toggleStock(potion.id, !potion.inStock)">
                    Toggle stock
                </button>
            </div>
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { Potion } from '~~/server/utils/potions';

const props = defineProps<{
    list: Potion[] | undefined;

}>()

const isPotionListEmpty = computed(() => !props.list?.length)

const deletePotion = async (id: number) => {
    await $fetch(`/api/potions/${id}`, {
        method: 'DELETE'
    })

    await refresh();
}

const toggleStock = async (id: number, newStockValue: boolean) => {
    await $fetch(`/api/potions/${id}`, {
        method: 'PATCH',
        body: {
            inStock: newStockValue
        }
    })

    await refresh();
}

</script>