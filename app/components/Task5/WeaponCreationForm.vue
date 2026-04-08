<template>
    <form class="flex flex-col gap-3 p-4 rounded-md border" @submit.prevent="addWeapon">
        <BaseTextInput v-model="weaponName" label="Enter name:"/>
        <BaseTextInput v-model="weaponType" label="Enter type:"/>
        <BaseTextInput v-model.number="weaponDamage" label="Enter damage:"/>
        <button>
            Add weapon
        </button>
    </form>
</template>

<script setup lang="ts">
import BaseTextInput from './BaseTextInput.vue';

const weaponName = ref('');
const weaponType = ref('');
const weaponDamage = ref(0);

const addWeapon = async () => {
    await $fetch('/api/weapons', {
        method: 'POST',
        body: {
            name: weaponName.value,
            type: weaponType.value,
            damage: weaponDamage.value
        }
    })
}

</script>