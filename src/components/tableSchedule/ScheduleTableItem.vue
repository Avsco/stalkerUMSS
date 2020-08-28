<template>
    <td
        :class="'schedule' + (schedules.length > 1 ? ' schedule_error' : '')"
        :rowspan="schedules[0].duration"
        :style="this.schedules.length == 1 ? 'background-color:' + color : ''"
    >
        <div v-for="(value, index) in schedules" :key="index">
            <div>{{ value.subjectName }}</div>
            <div>({{ value.room }})</div>
        </div>
    </td>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import { scheduleCell } from '@/@types/schedule'

@Component({})
export default class extends Vue {
    @Prop({ required: true }) schedules!: scheduleCell[]
    color: string = ''

    mounted() {
        this.color = this.schedules.length == 1 ? this.schedules[0].color : ''
    }
}
</script>

<style lang="scss">
@import '@/scss/abstracts/_variables.scss';

.schedule {
    text-align: center;
    margin: none;
    padding: none;
    div {
        font-size: 1rem;
    }

    &_error {
        div {
            color: red;
            background-color: white;
        }
    }

    > div {
        width: 100%;
        height: 100%;
    }
}
</style>
