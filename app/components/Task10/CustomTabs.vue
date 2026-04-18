<template>
    <div class="flex gap-4 items-center">
        <span v-if="props.label !== ''">{{ props.label }}</span>
        <ul class="flex gap-4 p-4 border rounded-lg">
            <li
                v-for="e in props.list"
                :key="e.id"
                class="rounded-lg p-3"
                :class="
                    e.value === props.modelValue
                        ? 'bg-gray-300'
                        : 'bg-transparent'
                "
            >
                <button @click="changeTabsValue(e.value)">
                    <span>{{ e.label }}</span>
                </button>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import type {
    RecentSorting,
    TabsSortingDirection,
    TabsSortingDirectionElement,
    TabsSortingValue,
    TabsSortingValueElement,
} from '#shared/task10/types';

const props = defineProps<{
    modelValue: TabsSortingValue | TabsSortingDirection;
    list: TabsSortingDirectionElement[] | TabsSortingValueElement[];
    label?: string;
}>();

const emit = defineEmits<{
    (
        e: 'update:modelValue',
        value: TabsSortingValue | TabsSortingDirection
    ): void;
}>();

const changeTabsValue = (e: TabsSortingValue | TabsSortingDirection) => {
    emit('update:modelValue', e);
    if (['title', 'category', 'price'].includes(e)) {
        localStorage.setItem('recentSortingValue', JSON.stringify(e));
    } else {
        localStorage.setItem('recentSortingDirection', JSON.stringify(e));
    }
    const recentSortingValue = localStorage.getItem('recentSortingValue');
    const recentSortingDirection = localStorage.getItem(
        'recentSortingDirection'
    );

    try {
        const recentSortingValueParsed = JSON.parse(
            recentSortingValue!
        ) as TabsSortingValue;
        const recentSortingDirectionParsed = JSON.parse(
            recentSortingDirection!
        ) as TabsSortingDirection;

        const recentSortingList = localStorage.getItem('recentSorting');
        let recentSortingListParsed = JSON.parse(
            recentSortingList!
        ) as RecentSorting[];

        const found = recentSortingListParsed.find(
            (s) =>
                s.direction === recentSortingDirectionParsed &&
                s.value === recentSortingValueParsed
        );

        if (found !== undefined) {
            recentSortingListParsed = recentSortingListParsed.filter(
                (s) =>
                    !(
                        s.direction === recentSortingDirectionParsed &&
                        s.value === recentSortingValueParsed
                    )
            );

            recentSortingListParsed.unshift(found);
        } else {
            const newId =
                recentSortingListParsed.length !== 0
                    ? Math.max(...recentSortingListParsed.map((s) => s.id)) + 1
                    : 1;

            const newRecentSorting: RecentSorting = {
                direction: recentSortingDirectionParsed,
                value: recentSortingValueParsed,
                id: newId,
            };

            recentSortingListParsed.unshift(newRecentSorting);
        }

        localStorage.setItem(
            'recentSorting',
            JSON.stringify(recentSortingListParsed.slice(0, 4))
        );
    } catch {
        if (['title', 'category', 'price'].includes(e)) {
            localStorage.setItem('recentSortingValue', JSON.stringify(e));
        } else {
            localStorage.setItem('recentSortingDirection', JSON.stringify(e));
        }
    }
};
</script>
