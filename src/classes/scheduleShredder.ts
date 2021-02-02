import { ScheduleCell } from '@/@types/schedule'
import HoursManager from './hoursManager'

// TODO completar implementacion
class ScheduleShredder {
    private hours: HoursManager

    constructor(hours: HoursManager) {
        this.hours = hours
    }
    //si a es mayor es porque tenemos que dividir a los conflictiveSchedules al tamanio del new
    //si b es mayor es porque tenemos que dividir el new al tamanio de los conflictiveSchedules
    private fragmentSchedules = (newSchedule: ScheduleCell, conflictiveSchedules: ScheduleCell[]): ScheduleCell[] => {
        let schedulesOrganized: ScheduleCell[] = []
        const c = conflictiveSchedules.filter((schedule) => newSchedule.end == schedule.end)
        const a = conflictiveSchedules.filter((schedule) => newSchedule.end < schedule.end)
        const b = conflictiveSchedules.filter((schedule) => newSchedule.end > schedule.end)

        if (c.length > 0) schedulesOrganized = [...conflictiveSchedules, newSchedule]
        if (a.length > 0) schedulesOrganized = [...this.divideConflictivesSchedules(newSchedule.start, conflictiveSchedules), newSchedule]
        if (b.length > 0) schedulesOrganized = [this.divideNewSchedule(newSchedule, this.getMinEndTime(conflictiveSchedules)), ...conflictiveSchedules]

        return schedulesOrganized
    }

    pushSchedule(oldSchedules: ScheduleCell[], newSchedule: ScheduleCell): ScheduleCell[] {
        let schedules: ScheduleCell[]
        const conflictiveSchedules = this.getConfictiveSchedules(oldSchedules, newSchedule)
        conflictiveSchedules.length > 0 ? (schedules = this.fragmentSchedules(newSchedule, conflictiveSchedules)) : (schedules = [...oldSchedules, newSchedule])
        return schedules
    }

    private getConfictiveSchedules = (oldSchedules: ScheduleCell[], newSchedule: ScheduleCell) =>
        oldSchedules.filter((schedule) => this.hours.inRange(newSchedule.start, newSchedule.end, schedule.start))

    private divideConflictivesSchedules = (divisionTime: string, conflictiveSchedules: ScheduleCell[]): ScheduleCell[] => {
        return conflictiveSchedules
    }

    private divideNewSchedule = (newSchedule: ScheduleCell, divisionTime: string): ScheduleCell => {
        return newSchedule
    }

    private getMinEndTime(schedules: ScheduleCell[]): string {
        let minTime: number = this.hours.getLenght()
        schedules.forEach((schedule) => {
            if (this.hours.indexOf(schedule.end) < minTime) minTime = this.hours.getIndex(schedule.end)
        })
        return this.hours.getValue(minTime)
    }
}

export default ScheduleShredder
