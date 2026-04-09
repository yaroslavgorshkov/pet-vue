<template>
    <form @submit.prevent="addDebtor">
        <span>Debtor add form:</span>
        <BaseTextInput v-model="fullName" label="Full name:" />
        <BaseTextInput v-model="lic" label="Lic:" />
        <BaseTextInput v-model="address" label="Address:" />
        <BaseTextInput v-model="phone" label="Phone:" />
        <button type="submit">Add debtor</button>
    </form>
</template>

<script setup lang="ts">
import BaseTextInput from '../Task5/BaseTextInput.vue';

const fullName = ref('');
const lic = ref('');
const address = ref('');
const phone = ref('');

const addDebtor = async () => {
    await $fetch<any>('/api/debtors', {
        method: 'POST',
        body: {
            fullName: fullName.value,
            lic: lic.value,
            address: address.value,
            phone: phone.value,
        },
    });

    fullName.value = '';
    lic.value = '';
    address.value = '';
    phone.value = '';

    emit('refresh');
};

const emit = defineEmits<{
    (e: 'refresh'): void;
}>();
</script>
