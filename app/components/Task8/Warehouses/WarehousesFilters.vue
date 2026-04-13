<template>
    <div>
        <span>Filters</span>
        <div class="line"></div>
        <div class="box-col-md">
            <CustomInput
                label="Title: "
                v-model="titleFilterModel"
                placeholder="enter title"
                type="text"
            />
            <CustomInput
                label="Code: "
                v-model="codeFilterModel"
                placeholder="enter title"
                type="text"
            />
            <CustomCheckbox
                v-model="onlyDeficitFilterModel"
                label="Is only deficit?: "
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import useWarehouseFilters from '~/composables/Task8/useWarehouseFilters';
import CustomCheckbox from '../CustomFormItems/CustomCheckbox.vue';
import CustomInput from '../CustomFormItems/CustomInput.vue';
import '../../../assets/style.css';

const props = defineProps<{
    titleFilter: string;
    codeFilter: string;
    onlyDeficitFilter: boolean;
}>();

const emit = defineEmits<{
    (e: 'update:titleFilter', value: string): void;
    (e: 'update:codeFilter', value: string): void;
    (e: 'update:onlyDeficitFilter', value: boolean): void;
}>();

const emitTitleFilter = (value: string) => {
    emit('update:titleFilter', value);
};

const emitCodeFilter = (value: string) => {
    emit('update:codeFilter', value);
};

const emitOnlyDeficitFilter = (value: boolean) => {
    emit('update:onlyDeficitFilter', value);
};

const emits = {
    emitTitleFilter,
    emitCodeFilter,
    emitOnlyDeficitFilter,
};

const { codeFilterModel, onlyDeficitFilterModel, titleFilterModel } =
    useWarehouseFilters(props, emits);
</script>
