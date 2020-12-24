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

    public addSchedule = (schedule: ScheduleCell): void => {
        const schedulesDay: SchedulesByDay = this.schedulesByDays.filter((schedulesByDay) => this.compareDay(schedulesByDay.day, schedule.day))[0]
        this.schedulesByDays = this.schedulesByDays.filter((schedulesByDay) => !this.compareDay(schedulesByDay.day, schedule.day))
        const schedulesOrganized = this.scheduleShredder.pushSchedule(schedulesDay.schedules, schedule)
        schedulesDay.schedules = schedulesOrganized
        this.schedulesByDays.push(schedulesDay)
    }

    private compareDay = (day: string, scheduleDay: string) => day.slice(0, 2).toLocaleUpperCase() == scheduleDay

    public dropSchedules = (): void => {
        this.schedulesByDays = this.schedulesByDays.map((schedulesByDay) => {
            return { day: schedulesByDay.day, schedules: [] }
        })
    }

    public getSchedules = (day: string, indexHour: number): ScheduleCell[] =>
        this.filterByDay(day).schedules.filter((scheduleByDay) => this.hours.compareHour(indexHour, scheduleByDay.start))

    public schedulesInRange = (day: string, indexHour: number): boolean =>
        this.filterByDay(day).schedules.filter((scheduleByDay) => this.hours.IndexInRange(scheduleByDay.start, scheduleByDay.end, indexHour)).length <= 0

    private filterByDay = (scheduleDay: string) => this.schedulesByDays.filter((schedulesByDay) => scheduleDay == schedulesByDay.day)[0]
}

export default SchedulesByDays
