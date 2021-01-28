import { SchedulesByDay, ScheduleCell } from '@/@types/schedule'
import HoursManager from './hoursManager'
import ScheduleShredder from './scheduleShredder'

class SchedulesByDays {
    private schedulesByDays: SchedulesByDay[] = []
    private hours: HoursManager
    private scheduleShredder: ScheduleShredder

    constructor(days: string[], hours: HoursManager) {
        this.schedulesByDays = days
            .filter((day) => day.length > 0)
            .map((day) => {
                return { day: day, schedules: [] }
            })
        this.hours = hours
        this.scheduleShredder = new ScheduleShredder(this.hours)
    }

    addSchedule = (schedule: ScheduleCell): void => {
        const schedulesDay: SchedulesByDay | undefined = this.schedulesByDays.find((schedulesByDay) => this.compareDay(schedulesByDay.day, schedule.day))

        if (schedulesDay) {
            this.schedulesByDays = this.schedulesByDays.filter((schedulesByDay) => !this.compareDay(schedulesByDay.day, schedule.day))

            const schedulesOrganized: ScheduleCell[] = this.scheduleShredder.pushSchedule(schedulesDay.schedules, schedule)
            schedulesDay.schedules = schedulesOrganized
            this.schedulesByDays.push(schedulesDay)
        }
    }

    private compareDay = (day: string, scheduleDay: string): boolean => day.slice(0, 2).toLocaleUpperCase() == scheduleDay

    getSchedules(day: string, indexHour: number): ScheduleCell[] {
        const filteredDay: SchedulesByDay | undefined = this.filterByDay(day)
        return filteredDay ? filteredDay.schedules.filter((scheduleByDay) => this.hours.compareHour(indexHour, scheduleByDay.start)) : []
    }

    schedulesInRange(day: string, indexHour: number): boolean {
        const filteredDay: SchedulesByDay | undefined = this.filterByDay(day)
        return filteredDay
            ? filteredDay.schedules.filter((scheduleByDay) => this.hours.IndexInRange(scheduleByDay.start, scheduleByDay.end, indexHour)).length <= 0
            : false
    }

    private filterByDay = (scheduleDay: string): SchedulesByDay | undefined => this.schedulesByDays.find((schedulesByDay) => scheduleDay == schedulesByDay.day)
}

export default SchedulesByDays
