<template>
    <div class="table">
        <table>
            <tr>
                <th v-for="(value, index) in days" :class="index == 0 ? '' : 'table_days'" :key="index">
                    <span>{{ value }}</span>
                </th>
            </tr>
            <tr v-for="(valueOne, indexOne) in hours.dataForHTML()" :key="indexOne">
                <template v-for="(valueTwo, indexTwo) in days">
                    <td v-if="indexTwo == 0" :key="indexTwo" class="table_hours">
                        <span>{{ valueOne }}</span>
                    </td>
                    <ScheduleTableItem
                        v-else-if="schedulesPerDay.getSchedules(valueTwo, indexOne).length > 0"
                        :key="indexTwo"
                        :schedules="schedulesPerDay.getSchedules(valueTwo, indexOne)"
                    />
                    <td v-else-if="schedulesPerDay.schedulesInRange(valueTwo, indexOne)" :key="indexTwo" class="table_cell"></td>
                </template>
            </tr>
            <tr>
                <td class="table_hours">
                    <span>{{ hours.convert(hours.getValue(hours.data.length - 1)) }}</span>
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import ScheduleTableItem from './ScheduleTableItem.vue'

import ColorManager from '@/classes/colorManager'
import HoursManager from '@/classes/hoursManager'
import SchedulesPerDays from '@/classes/schedulesPerDays'
import { scheduleItem, scheduleCell, schedulesByDay } from '@/@types/schedule'
import { subjectMatter } from '@/classes/subjectMatter'

@Component({
    components: {
        ScheduleTableItem
    }
})
export default class extends Vue {
    @Prop({ required: true }) subjectMatters!: subjectMatter[]
    colors: ColorManager = new ColorManager()
    days: string[] = ['', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    hours: HoursManager = new HoursManager()
    schedulesPerDay: SchedulesPerDays = new SchedulesPerDays(this.days, this.hours)

    @Watch('subjectMatters')
    onChildChanged() {
        this.schedulesPerDay.dropSchedules()
        this.subjectMatters.forEach((subjectMatter: subjectMatter, index) => {
            subjectMatter.schedules.forEach((schedule: scheduleItem) => {
                this.schedulesPerDay.addSchedule({
                    color: this.colors.getColor(index),
                    groupCode: subjectMatter.groupCode,
                    duration: schedule.duration,
                    room: schedule.room,
                    subjectName: subjectMatter.subjectName,
                    day: schedule.day,
                    start: schedule.start,
                    end: schedule.end
                })
            })
        })
    }
}
</script>

<style lang="scss">
@import '@/scss/abstracts/_variables.scss';
.table {
    padding-bottom: 40px;

    table {
        margin: none;
        border-collapse: collapse;
    }

    &_days {
        border: 1px solid #7cbbee;
        background-color: $white;
        height: 50px;
        width: 100px;
    }

    td {
        border: 1px solid #7cbbee;
        &:first-child {
            border: none;
            padding-left: 5px;
        }
    }

    tr {
        td:not(:first-child) {
            background-color: $white;
        }
    }

    &_hours {
        height: 30px;
        text-align: end;
        span {
            position: relative;
            top: -60%;
            padding-right: 1rem;
        }
    }

    th:first-child {
        width: 1rem;
    }
}
</style>
