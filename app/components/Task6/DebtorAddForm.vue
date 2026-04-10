<template>
    <form @submit.prevent="addDebtor" class="flex flex-col gap-3">
        <span>Debtor add form:</span>
        <BaseTextInput
            type="text"
            @blur="updateFullNameStatus"
            v-model="fullName"
            label="Full name:"
        />
        <span
            v-if="errorMessage.fullNameErrorMessage !== ''"
            class="text-red-500 text-sm"
            >{{ errorMessage.fullNameErrorMessage }}</span
        >
        <BaseTextInput
            type="text"
            @blur="updateLicStatus"
            v-model="lic"
            label="Lic:"
        />
        <span
            v-if="errorMessage.licErrorMessage !== ''"
            class="text-red-500 text-sm"
            >{{ errorMessage.licErrorMessage }}</span
        >
        <BaseTextInput
            type="text"
            @blur="updateAddressStatus"
            v-model="address"
            label="Address:"
        />
        <span
            v-if="errorMessage.addressErrorMessage !== ''"
            class="text-red-500 text-sm"
            >{{ errorMessage.addressErrorMessage }}</span
        >
        <BaseTextInput
            type="text"
            @blur="updatePhoneStatus"
            v-model="phone"
            label="Phone:"
        />
        <span
            v-if="errorMessage.phoneErrorMessage !== ''"
            class="text-red-500 text-sm"
            >{{ errorMessage.phoneErrorMessage }}</span
        >
        <ClientOnly>
            <button
                :disabled="!isFormValid"
                type="submit"
                class="p-3 rounded-md border"
            >
                Add debtor
            </button>
        </ClientOnly>
        <span
            v-if="formResponse.formErrorMessage !== ''"
            :class="formResponse.isSucceed ? 'text-green-400' : 'text-red-400'"
            class="text-sm"
        >
            {{ formResponse.formErrorMessage }}
        </span>
    </form>
</template>

<script setup lang="ts">
import type { Debtor } from '~~/shared/types';
import BaseTextInput from '../Task6/BaseTextInput.vue';

const fullName = ref('');
const lic = ref('');
const address = ref('');
const phone = ref('');

type ErrorMessage = {
    fullNameErrorMessage: string;
    licErrorMessage: string;
    addressErrorMessage: string;
    phoneErrorMessage: string;
};
const errorMessage = reactive<ErrorMessage>({
    addressErrorMessage: '',
    fullNameErrorMessage: '',
    licErrorMessage: '',
    phoneErrorMessage: '',
});

type IsFormChanged = {
    fullName: boolean;
    lic: boolean;
    address: boolean;
    phone: boolean;
};

const isFormChanged = ref<IsFormChanged>({
    address: false,
    fullName: false,
    lic: false,
    phone: false,
});

const isFormValid = computed(() => {
    const isAddressValid = errorMessage.addressErrorMessage === '';
    const isLicValid = errorMessage.licErrorMessage === '';
    const isFullNameValid = errorMessage.fullNameErrorMessage === '';
    const isPhoneValid = errorMessage.phoneErrorMessage === '';
    return (
        isAddressValid &&
        isLicValid &&
        isFullNameValid &&
        isPhoneValid &&
        isFormChanged.value.address &&
        isFormChanged.value.fullName &&
        isFormChanged.value.lic &&
        isFormChanged.value.phone
    );
});

type FormResponse = {
    formErrorMessage: string;
    isSucceed: boolean;
};
const formResponse = ref<FormResponse>({
    formErrorMessage: '',
    isSucceed: false,
});

const isFormValidFunc = () => {
    errorMessage.addressErrorMessage = '';
    errorMessage.fullNameErrorMessage = '';
    errorMessage.licErrorMessage = '';
    errorMessage.phoneErrorMessage = '';

    if (fullName.value.trim() === '') {
        errorMessage.fullNameErrorMessage = 'Name cant be empty';
    }
    if (lic.value.trim() === '') {
        errorMessage.licErrorMessage = 'Lic cant be empty';
    }
    if (address.value.trim() === '') {
        errorMessage.addressErrorMessage = 'Address cant be empty';
    }
    if (phone.value.trim() === '') {
        errorMessage.phoneErrorMessage = 'Phone number cant be empty';
    } else if (!/^\+380\d{9}$/.test(phone.value)) {
        errorMessage.phoneErrorMessage =
            'Phone number must be ukraine-type, like +380980980908';
    }
    const isValid =
        errorMessage.fullNameErrorMessage === '' &&
        errorMessage.licErrorMessage === '' &&
        errorMessage.addressErrorMessage === '' &&
        errorMessage.phoneErrorMessage === '' &&
        isFormChanged.value.address &&
        isFormChanged.value.fullName &&
        isFormChanged.value.lic &&
        isFormChanged.value.phone;

    return isValid;
};

const addDebtor = async () => {
    if (!isFormValidFunc()) return;

    formResponse.value = {
        formErrorMessage: '',
        isSucceed: false,
    };

    try {
        const newDebtor: Debtor = await $fetch<any>('/api/debtors', {
            method: 'POST',
            body: {
                fullName: fullName.value,
                lic: lic.value,
                address: address.value,
                phone: phone.value,
            },
        });

        formResponse.value = {
            formErrorMessage: `Successfully added debtor with id ${newDebtor.id} to debtors`,
            isSucceed: true,
        };

        refreshForm();

        emit('refresh');
    } catch (err: any) {
        formResponse.value = {
            formErrorMessage: err.message || 'Invalid response',
            isSucceed: false,
        };
    }
};

const refreshForm = () => {
    fullName.value = '';
    lic.value = '';
    address.value = '';
    phone.value = '';

    errorMessage.addressErrorMessage = '';
    errorMessage.fullNameErrorMessage = '';
    errorMessage.licErrorMessage = '';
    errorMessage.phoneErrorMessage = '';

    setTimeout(() => {
        formResponse.value = {
            formErrorMessage: '',
            isSucceed: false,
        };
    }, 10000);

    isFormChanged.value = {
        address: false,
        fullName: false,
        lic: false,
        phone: false,
    };
};

const updateFullNameStatus = () => {
    errorMessage.fullNameErrorMessage = '';

    if (fullName.value.trim() === '') {
        errorMessage.fullNameErrorMessage = 'Name cant be empty';
    }

    if (!isFormChanged.value.fullName) {
        isFormChanged.value.fullName = true;
    }
};

const updateLicStatus = () => {
    errorMessage.licErrorMessage = '';

    if (lic.value.trim() === '') {
        errorMessage.licErrorMessage = 'Lic cant be empty';
    }

    if (!isFormChanged.value.lic) {
        isFormChanged.value.lic = true;
    }
};

const updateAddressStatus = () => {
    errorMessage.addressErrorMessage = '';

    if (address.value.trim() === '') {
        errorMessage.addressErrorMessage = 'Address cant be empty';
    }

    if (!isFormChanged.value.address) {
        isFormChanged.value.address = true;
    }
};

const updatePhoneStatus = () => {
    errorMessage.phoneErrorMessage = '';

    if (phone.value.trim() === '') {
        errorMessage.phoneErrorMessage = 'Phone number cant be empty';
    } else if (!/^\+380\d{9}$/.test(phone.value)) {
        errorMessage.phoneErrorMessage =
            'Phone number must be ukraine-type, like +380980980908';
    }

    if (!isFormChanged.value.phone) {
        isFormChanged.value.phone = true;
    }
};

const emit = defineEmits<{
    (e: 'refresh'): void;
}>();
</script>
