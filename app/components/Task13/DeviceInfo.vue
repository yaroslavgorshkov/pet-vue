<template>
    <div class="flex flex-col gap-3">
        <span>Device info</span>
        <div class="bg-black w-full h-px"></div>
        <div class="flex flex-col gap-4 p-4 rounded-md border">
            <span v-if="deviceWidth === undefined"
                >Devise width: cannot calculate</span
            >
            <span v-else>Devise width: {{ deviceWidth }}</span>

            <span v-if="deviceHeight === undefined"
                >Devise height: cannot calculate</span
            >
            <span v-else>Devise height: {{ deviceHeight }}</span>

            <span v-if="devicePixelRatio === undefined"
                >Devise pixel ratio: cannot calculate</span
            >
            <span v-else>Devise pixel ratio: {{ devicePixelRatio }}</span>

            <span v-if="deviceType === undefined"
                >Devise type: cannot calculate</span
            >
            <span v-else>Devise type: {{ deviceType }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
const deviceWidth = ref(window.innerWidth || undefined);
const deviceHeight = ref(window.innerHeight || undefined);
const devicePixelRatio = ref(window.devicePixelRatio || undefined);
const deviceType = computed<'mobile' | 'laptop' | 'computer' | undefined>(
    () => {
        if (deviceWidth.value === undefined) return undefined;
        if (deviceWidth.value <= 400) return 'mobile';
        if (deviceWidth.value > 400 && deviceWidth.value <= 1000)
            return 'laptop';
        if (deviceWidth.value > 1000) return 'computer';
    }
);
</script>
