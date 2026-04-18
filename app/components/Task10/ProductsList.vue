<template>
    <ul
        class="flex flex-col gap-4 p-4 border rounded-md min-w-[400px] flex-1 max-h-[400px] overflow-y-auto"
    >
        <li
            v-for="p in props.productList"
            :key="p.id"
            class="flex flex-col gap-2 p-3 rounded-md border"
        >
            <span>ID: {{ p.id }}</span>
            <span>Title: {{ p.title }}</span>
            <span>Category: {{ p.category }}</span>
            <span>Price: {{ p.price }}</span>
            <span>Is in stock: {{ p.inStock ? 'yes' : 'no' }}</span>
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { Product } from '~~/shared/task10/types';

const props = defineProps<{
    productList: Product[];
}>();
</script>
