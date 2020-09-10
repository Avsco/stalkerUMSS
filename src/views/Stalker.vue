<template>
    <section class="stalker">
        <div class="stalker_container">
            <Search class="stalker_search" :content="teachers" dispatchTo="stalking/actionSearch" />
            <ScheduleTable :subjectMatters="schedules" />
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import Search from '@/components/Search.vue'
import ScheduleTable from '@/components/tableSchedule/index.vue'

import { scheduleItem } from '@/@types/schedule'

@Component({
    components: {
        Search,
        ScheduleTable,
    },
})
export default class extends Vue {
    @Getter('stalking/schedulesTeacher') readonly schedules!: scheduleItem[]
    @Getter('stalking/allTeachers') readonly teachers!: string[]

    async mounted() {
        this.$store.dispatch('stalking/actionGetAllTeachers')
    }
}
</script>

<style lang="scss">
@import '@/scss/abstracts/variables.scss';
@import '@/scss/abstracts/mixins';

.stalker {
    padding-top: 2rem;
    padding: 2rem;

    &_container {
        display: grid;
        gap: 3rem;
    }

    @include for-desktop-up {
        &_search {
            align-self: start;
        }

        &_container {
            display: grid;
            grid-template-columns: 0.5fr 1fr;
        }
    }
}
</style>
