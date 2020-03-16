<template>
    <div class="home">
        <SearchDocent />
        <ScheduleTable />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import SearchDocent from '@/components/SearchDocent.vue'
import ScheduleTable from '@/components/tableSchedule/ScheduleTable.vue'
import axios from 'axios'
import Scheduleitem from '@/Class/ScheduleItem'

@Component({
    components: {
        SearchDocent,
        ScheduleTable
    }
})
export default class extends Vue {
    @Getter('stalking/nameTeacher') nameTeacher!: string
}
</script>

<style lang="scss">
@import '@/scss/abstracts/_variables.scss';
</style>
