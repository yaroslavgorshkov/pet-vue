<template>
    <div class="flex flex-col gap-3">
        <span>Team info</span>
        <div class="h-px w-full bg-black"></div>
        <div class="flex flex-col gap-4 p-4 border rounded-md">
            <span v-if="props.team === undefined">Title: cannot calculate</span>
            <span v-else>Title: {{ props.team.title }}</span>

            <span v-if="props.team === undefined">Code: cannot calculate</span>
            <span v-else>Code: {{ props.team.code }}</span>

            <span v-if="props.team === undefined">Lead: cannot calculate</span>
            <span v-else>Lead: {{ props.team.lead }}</span>

            <span v-if="props.team === undefined"
                >Description: cannot calculate</span
            >
            <span v-else>Description: {{ props.team.description }}</span>

            <span v-if="props.team === undefined"
                >Behind plan: cannot calculate</span
            >
            <span v-else
                >Behind plan?:
                {{ props.team.isBehindPlan ? 'yes' : 'no' }}</span
            >
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Team } from '~~/shared/task13/types';

const props = defineProps<{
    team: Team | undefined;
}>();
</script>
