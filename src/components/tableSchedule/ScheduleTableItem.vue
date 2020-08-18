<template>
    <!-- <div v-html="InsertItems()"></div> -->
    <td
        :class=" 'schedule' + (schedules.length > 1 ? ' schedule_error' : '')"
        :rowspan="(schedules.length == 1 ? schedules[0].times : 1)"
    >
        <div>
            <div
                v-for="(value, index) in schedules"
                :key="index"
                :style="schedules.length == 1 ? `background-color: ${value.color};` : ''"
            >
                <div>{{value.subjectName}}</div>
                <div>({{value.room}})</div>
                <!-- <div>{{value.times}}</div> -->
            </div>
        </div>
    </td>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import { scheduleCell } from '@/@types/schedule'

@Component({})
export default class extends Vue {
    @Prop({ required: true }) schedules!: scheduleCell[]
}
</script>

<style lang="scss">
@import '@/scss/abstracts/_variables.scss';

.schedule {
    text-align: center;
    height: 100%;
    margin: 0;
    div {
        font-size: 16px;
    }

    &_error {
        div {
            color: red;
            background-color: white;
        }
    }
}
</style>
