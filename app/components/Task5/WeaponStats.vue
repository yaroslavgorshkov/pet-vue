<template>
    <div class="flex flex-col p-4 gap-3 rounded-md border">
        <span>All weapons: {{ allWeaponCount }}</span>
        <span>All equipped weapons: {{ allEquippedWeaponCount }}</span>
        <span>All damage: {{ allDamage }}</span>
    </div>
</template>

<script setup lang="ts">
import type { Weapon } from '~~/shared/types';

const props = defineProps<{
    list: Weapon[];
}>();

const allWeaponCount = computed(() => props.list.length);
const allEquippedWeaponCount = computed(() => props.list.filter(w => w.isEquipped).length);
const allDamage = computed(() => props.list.reduce((acc, w) => acc + w.damage, 0));

</script>
