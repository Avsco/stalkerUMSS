import { schedulesByDay, scheduleCell } from '@/@types/schedule'
import HoursManager from './hoursManager'
import ScheduleShredder from './scheduleShredder'

class SchedulesByDays {
    schedulesByDays: schedulesByDay[] = []
    hours: HoursManager
    scheduleShredder: ScheduleShredder

    constructor(days: string[], hours: HoursManager) {
        this.schedulesByDays = days
            .filter((day) => day.length > 0)
            .map((day) => {
                return { day: day, schedules: [] }
            })
        this.hours = hours
        this.scheduleShredder = new ScheduleShredder(this.hours)
    }

    addSchedule = (schedule: scheduleCell): void => {
        const schedulesDay: schedulesByDay = this.schedulesByDays.filter((schedulesByDay) => this.compareDay(schedulesByDay.day, schedule.day))[0]
        this.schedulesByDays = this.schedulesByDays.filter((schedulesByDay) => !this.compareDay(schedulesByDay.day, schedule.day))
        const schedulesOrganized = this.scheduleShredder.pushSchedule(schedulesDay.schedules, schedule)
        schedulesDay.schedules = schedulesOrganized
        this.schedulesByDays.push(schedulesDay)
    }

    compareDay = (day: string, scheduleDay: string) => day.slice(0, 2).toLocaleUpperCase() == scheduleDay

    dropSchedules = (): void => {
        this.schedulesByDays = this.schedulesByDays.map((schedulesByDay) => {
            return { day: schedulesByDay.day, schedules: [] }
        })
    }

    getSchedules = (day: string, indexHour: number): scheduleCell[] =>
        this.filterByDay(day).schedules.filter((scheduleByDay) => this.hours.compareHour(indexHour, scheduleByDay.start))

    schedulesInRange = (day: string, indexHour: number): boolean =>
        this.filterByDay(day).schedules.filter((scheduleByDay) => this.hours.IndexInRange(scheduleByDay.start, scheduleByDay.end, indexHour)).length <= 0

    filterByDay = (scheduleDay: string) => this.schedulesByDays.filter((schedulesByDay) => scheduleDay == schedulesByDay.day)[0]
}

export default SchedulesByDays
