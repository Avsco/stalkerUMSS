<template>
    <div class="table">
        <table>
            <tr>
                <th
                    v-for="(value, index) in days"
                    :class="index == 0 ? '' : 'table_days'"
                    :key="index"
                >
                    <span>{{ value }}</span>
                </th>
            </tr>
            <tr v-for="(valueOne, indexOne) in hours.dataForHTML()" :key="indexOne">
                <template v-for="(valueTwo, indexTwo) in days">
                    <td v-if="indexTwo == 0" :key="indexTwo" class="table_hours">
                        <span>{{valueOne}}</span>
                    </td>
                    <ScheduleTableItem
                        v-else-if="isThereScheduleItem(indexOne, valueTwo)"
                        :key="indexTwo"
                        :schedules="getScheduleItem(indexOne, valueTwo)"
                    />
                    <td
                        v-else-if="isThereScheduleOccupied(indexOne, indexTwo)"
                        :key="indexTwo"
                        class="table_cell"
                    ></td>
                </template>
            </tr>
            <tr>
                <td class="table_hours">
                    <span>21:45</span>
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import ScheduleTableItem from './ScheduleTableItem.vue'

import { subjectMatter } from '@/@types/subjectMatter'
import colorManager from '@/@types/colorManager'
import hoursManager from '@/@types/hoursManager'
import { scheduleCell, ScheduleItem } from '@/@types/schedule'

@Component({
    components: {
        ScheduleTableItem,
    },
})
export default class extends Vue {
    @Prop({ required: true }) subjectMatters!: subjectMatter[]
    hours: hoursManager = new hoursManager()
    colors: colorManager = new colorManager()
    days: string[] = ['', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']

    @Watch('subjectMatters')
    onChildChanged() {
        this.colors.watchColors(this.subjectMatters.length)
    }

    compareDay = (day: string, scheduleDay: string): boolean => day.slice(0, 2).toUpperCase() === scheduleDay

    isThereScheduleItem = (indexHourSchedule: number, day: string): boolean => {
        let isThere: boolean = false
        this.subjectMatters.forEach((subjectMatter) => {
            subjectMatter.schedules.forEach((schedule: ScheduleItem) => {
                if (this.compareDay(day, schedule.day) && this.hours.compareHour(indexHourSchedule, schedule.start)) isThere = true
            })
        })
        return isThere
    }

    getScheduleItem = (indexHourSchedule: number, day: string): scheduleCell[] => {
        let scheduleItems: scheduleCell[] = []
        this.subjectMatters.forEach((subjectMatter, indexOne) => {
            subjectMatter.schedules.forEach((schedule: ScheduleItem) => {
                if (this.compareDay(day, schedule.day) && this.hours.compareHour(indexHourSchedule, schedule.start)) {
                    scheduleItems.push({
                        color: this.colors.getColor(indexOne),
                        subjectName: subjectMatter.subjectName,
                        room: schedule.room,
                        groupCode: subjectMatter.groupCode,
                        times: schedule.duration,
                    })
                }
            })
        })
        return scheduleItems
    }

    isThereScheduleOccupied = (indexHourSchedule: number, indexDay: number): boolean => {
        let isInRange = false
        this.subjectMatters.forEach((subjectMatter, indexOne) => {
            subjectMatter.schedules.forEach((schedule: ScheduleItem) => {
                if (this.compareDay(this.days[indexDay], schedule.day) && this.hours.compareHour(indexHourSchedule - 1, schedule.start)) {
                    isInRange = true
                    console.log(this.days[indexDay])
                    console.log(this.hours.getValue(indexHourSchedule))
                }
            })
        })
        return !isInRange
    }
}
</script>

<style lang="scss">
@import '@/scss/abstracts/_variables.scss';
.table {
    padding-bottom: 40px;

    table {
        margin: auto;
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
