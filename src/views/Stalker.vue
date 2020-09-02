<template>
    <div class="stalker">
        <p class="stalker_text">Prueba buscando a un docente!</p>
        <div>
            <Search :content="teachers" dispatchTo="stalking/actionSearch" />
            <ScheduleTable :subjectMatters="schedules" />
        </div>
    </div>
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
.stalker {
    padding-top: 2rem;
    padding-left: 2rem;
    padding-right: 2rem;
    background-color: #f1f9ff;

    &_text {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 4rem;
    }

    > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    // > div {
    //     display: grid;
    //     grid-template-columns: 0.5fr 1fr;
    // }
}
</style>
