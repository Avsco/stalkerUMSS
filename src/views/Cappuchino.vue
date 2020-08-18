<template>
    <div class="cappuchino">
        <Options />
        <!-- <ScheduleTable :subjectMatters="[]" /> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import ScheduleTable from '@/components/tableSchedule/index.vue'
import Options from '@/components/capucchino/Options/index.vue'

@Component({
    components: {
        ScheduleTable,
        Options
    }
})
export default class extends Vue {}
</script>

<style lang="scss">
@import '@/scss/abstracts/_variables.scss';
</style>
