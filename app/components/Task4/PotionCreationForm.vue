<template>
    <form
        class="flex flex-col gap-2 p-4 border rounded-md items-start"
        @submit.prevent="addPotion"
    >
        <label> Name: <input type="text" v-model="potionName" /> </label>
        <label> Effect: <input type="text" v-model="potionEffect" /> </label>
        <label>
            Price: <input type="number" v-model.number="potionPrice" />
        </label>
        <button class="p-3 rounded-md border">Add Potion</button>
    </form>
</template>

<script setup lang="ts">
const emit = defineEmits<{
    (e: 'refresh'): void;
}>();

const potionName = ref('');
const potionEffect = ref('');
const potionPrice = ref(0);

const addPotion = async () => {
    await $fetch('/api/potions', {
        method: 'POST',
        body: {
            name: potionName.value,
            effect: potionEffect.value,
            price: potionPrice.value,
        },
    });

    potionName.value = '';
    potionEffect.value = '';
    potionPrice.value = 0;

    emit('refresh');
};
</script>
