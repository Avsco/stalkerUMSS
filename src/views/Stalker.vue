<template>
    <main class="stalker">
        <section class="stalker_container">
            <Search class="stalker_search" :content="teachers" dispatchTo="stalking/actionSearch" />
            <ScheduleTable :subjectMatters="schedules" class="stalker_schedule" />
        </section>
    </main>
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
    &_search {
        margin: 15px 30px;
    }

    &_container {
        display: grid;
    }

    &_schedule {
        margin: 31px 11px;
        margin-top: 0;
    }

    @include large {
        padding: 2rem;

        &_search {
            align-self: start;
            margin: 0;
            margin-right: 11px;
        }

        &_container {
            display: grid;
            grid-template-columns: 0.5fr 1fr;
        }

        &_schedule {
            margin-right: 31px;
        }
    }
}
</style>
