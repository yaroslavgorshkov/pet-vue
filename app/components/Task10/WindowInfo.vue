<template>
    <div class="flex flex-col gap-3">
        <span>Window info</span>
        <div class="line"></div>
        <div class="box-col-md">
            <span>Window width: {{ innerWidth }}</span>
            <span>Window height: {{ innerHeight }}</span>
            <span>Device type: {{ deviceType }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import '../../assets/style.css';
const innerWidth = computed(() => window.innerWidth);
const innerHeight = computed(() => window.innerHeight);
const deviceType = computed(() =>
    innerWidth.value < 400
        ? 'Mobile'
        : innerWidth.value >= 400 && innerWidth.value < 1000
          ? 'Tablet'
          : 'Desktop'
);
</script>
