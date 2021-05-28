<template>
    <div class="table">
        <table>
            <caption class="table_caption">
                Horarios UMSS
            </caption>
            <thead>
                <tr>
                    <th v-for="(value, index) in days" :class="index == 0 ? '' : 'table_day'" :key="index">
                        <span>{{ value.slice(0, 3).toUpperCase() }}</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <template v-for="(valueOne, indexOne) in hours.dataForHTML()">
                    <tr :key="indexOne">
                        <template v-for="(valueTwo, indexTwo) in days">
                            <th v-if="indexTwo == 0" :key="indexTwo" class="table_hours">
                                <span>{{ valueOne }}</span>
                            </th>
                            <td class="table_hours--final" :key="indexTwo" v-else-if="hours.dataForHTML().length == indexOne + 1"></td>
                            <ScheduleTableItem
                                v-else-if="schedulesPerDay.getSchedules(valueTwo, indexOne).length > 0"
                                :key="indexTwo"
                                :schedules="schedulesPerDay.getSchedules(valueTwo, indexOne)"
                                class="table_cell"
                            />
                            <td v-else-if="schedulesPerDay.schedulesInRange(valueTwo, indexOne)" :key="indexTwo" class="table_cell"></td>
                        </template>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import ScheduleTableItem from './ScheduleTableItem.vue'

import { ScheduleItem } from '@/@types/schedule'

import ColorManager from '@/classes/colorManager'
import HoursManager from '@/classes/hoursManager'
import SchedulesPerDays from '@/classes/schedulesPerDays'
import { SubjectMatter } from '@/@types/schedule'

@Component({
    components: {
        ScheduleTableItem
    }
})
export default class extends Vue {
    @Prop({ required: true }) subjectMatters!: SubjectMatter[]
    colors: ColorManager = new ColorManager()
    days: string[] = ['', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
    hours: HoursManager = new HoursManager()

    get schedulesPerDay(): SchedulesPerDays {
        const schedulesPerDays = new SchedulesPerDays(this.days, this.hours)
        this.subjectMatters.forEach((subjectMatter: SubjectMatter, index) => {
            subjectMatter.schedules.map((schedule: ScheduleItem) => {
                schedulesPerDays.addSchedule({
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

        return schedulesPerDays
    }
}
</script>

<style lang="scss">
@import '@/scss/abstracts/_variables.scss';

.table {
    overflow-x: scroll;
    box-shadow: $box-shadow;
    background-color: $primary_color;
    border-radius: $border_radius;
    padding: 1.5rem 1rem;
    padding-bottom: 0;
    overflow-x: auto;
    user-select: none;

    table {
        border-collapse: collapse;

        tr {
            :nth-child(2) {
                border-left: none;
            }

            :last-child {
                border-right: none;
            }
        }

        tr:nth-last-child(2) {
            td {
                border-bottom: none;
            }
        }
    }

    &_caption {
        display: none;
    }

    &_day {
        border: 1px solid $secondary_color;
        border-top: none;
        width: calc(100% / 6);
        padding: 0 0.5rem;
        font-size: 12px;
    }

    &_hours {
        height: 30px;
        width: 0.6rem;
        text-align: end;

        span {
            position: relative;
            top: -19px;
            padding-right: 10px;
            font-size: 13px;
        }
    }

    &_cell {
        border: 1px solid $secondary_color;

        &--final {
            border: none;
        }
    }
}
</style>
