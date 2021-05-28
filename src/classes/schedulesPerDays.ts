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
        const scheduleDay: SchedulesByDay = this.schedulesByDays.filter((schedulesByDay) => this.compareDay(schedulesByDay.day, schedule.day))[0]
        const isRepeated = this.compareSchedules(scheduleDay.schedules, schedule)

        if (!isRepeated) {
            this.schedulesByDays = this.schedulesByDays.filter((schedulesByDay) => !this.compareDay(schedulesByDay.day, schedule.day))
            const schedulesOrganized = this.scheduleShredder.pushSchedule(scheduleDay.schedules, schedule)
            scheduleDay.schedules = schedulesOrganized
            this.schedulesByDays.push(scheduleDay)
        }
    }

    private compareDay = (day: string, scheduleDay: string): boolean => day.slice(0, 2).toLocaleUpperCase() == scheduleDay

    getSchedules(day: string, indexHour: number): ScheduleCell[] {
        const filteredDay = this.filterByDay(day)
        return filteredDay ? filteredDay.schedules.filter((scheduleByDay) => this.hours.compareHour(indexHour, scheduleByDay.start)) : []
    }

    //TODO renombrar, comprueba que no se redereen celdas para que no choquen
    schedulesInRange(day: string, indexHour: number): boolean {
        const filteredDay = this.filterByDay(day)
        return filteredDay
            ? filteredDay.schedules.filter((scheduleByDay) => this.hours.IndexInRange(scheduleByDay.start, scheduleByDay.end, indexHour)).length <= 0
            : false
    }

    private filterByDay = (scheduleDay: string): SchedulesByDay | undefined => this.schedulesByDays.find((schedulesByDay) => scheduleDay == schedulesByDay.day)

    private compareSchedules = (schedules: ScheduleCell[], newSchedule: ScheduleCell): boolean => {
        const isRepeated: ScheduleCell | undefined = schedules.find(
            (schedule) => newSchedule.subjectName == schedule.subjectName && newSchedule.start == schedule.start
        )
        return typeof isRepeated != 'undefined'
    }
}

export default SchedulesByDays
