<template>
    <div class="flex flex-col gap-3">
        <span>Products explorer</span>
        <div class="line"></div>
        <div class="flex gap-4">
            <ProductsList :product-list="filteredProductsList" />
            <div class="flex flex-col gap-4 flex-1">
                <ProductsFilters
                    v-model:category-filter="categoryFilter"
                    v-model:in-stock-filter="inStockFilter"
                    v-model:max-price-filter="maxPriceFilter"
                    v-model:min-price-filter="minPriceFilter"
                    v-model:sort-direction="sortDirection"
                    v-model:title-filter="titleFilter"
                    v-model:sort-value="sortValue"
                />
                <ClientOnly>
                    <WindowInfo />
                </ClientOnly>
            </div>
            <div
                v-if="recentSortingList.length === 0"
                class="flex-1 flex items-center justify-center h-fit p-4 rounded-md border"
            >
                <span>Sorting list is empty</span>
            </div>
            <RecentSorting v-else :recent-sorting-list="recentSortingList" />
        </div>
    </div>
</template>

<script setup lang="ts">
import useProductsPage from '~/composables/Task10/useProductsPage';
import '../../assets/style.css';
import ProductsList from '~/components/Task10/ProductsList.vue';
import ProductsFilters from '~/components/Task10/ProductsFilters.vue';
import RecentSorting from '~/components/Task10/RecentSorting.vue';
import WindowInfo from '~/components/Task10/WindowInfo.vue';

const {
    titleFilter,
    categoryFilter,
    maxPriceFilter,
    minPriceFilter,
    inStockFilter,
    sortValue,
    sortDirection,
    filteredProductsList,
    recentSortingList,
} = useProductsPage();
</script>
