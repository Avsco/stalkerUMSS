import { scheduleCell } from '@/@types/schedule'
import HoursManager from './hoursManager'

class ScheduleShredder {
    hours: HoursManager

    constructor(hours: HoursManager) {
        this.hours = hours
    }
    //si a es mayor es porque tenemos que dividir a los conflictiveSchedules al tamanio del new
    //si b es mayor es porque tenemos que dividir el new al tamanio de los conflictiveSchedules
    fragmentSchedules = (newSchedule: scheduleCell, conflictiveSchedules: scheduleCell[]): scheduleCell[] => {
        let schedulesOrganized: scheduleCell[] = []
        const c = conflictiveSchedules.filter((schedule) => newSchedule.end == schedule.end)
        const a = conflictiveSchedules.filter((schedule) => newSchedule.end < schedule.end)
        const b = conflictiveSchedules.filter((schedule) => newSchedule.end > schedule.end)

        if (c.length > 0) schedulesOrganized = [...conflictiveSchedules, newSchedule]
        if (a.length > 0) schedulesOrganized = [...this.divideConflictivesSchedules(newSchedule.start, conflictiveSchedules), newSchedule]
        if (b.length > 0) schedulesOrganized = [this.divideNewSchedule(newSchedule, this.getMinEndTime(conflictiveSchedules)), ...conflictiveSchedules]

        return schedulesOrganized
    }

    pushSchedule = (oldSchedules: scheduleCell[], newSchedule: scheduleCell): scheduleCell[] => {
        let schedules: scheduleCell[]
        const conflictiveSchedules = oldSchedules.filter((schedule) => this.hours.inRange(newSchedule.start, newSchedule.end, schedule.start))
        conflictiveSchedules.length > 0 ? (schedules = this.fragmentSchedules(newSchedule, conflictiveSchedules)) : (schedules = [...oldSchedules, newSchedule])
        return schedules
    }

    divideConflictivesSchedules = (divisionTime: string, conflictiveSchedules: scheduleCell[]): scheduleCell[] => {
        return conflictiveSchedules
    }

    divideNewSchedule = (newSchedule: scheduleCell, divisionTime: string): scheduleCell => {
        return newSchedule
    }

    getMinEndTime = (schedules: scheduleCell[]): string => {
        let minTime: number = this.hours.getLenght()
        schedules.forEach((schedule) => {
            if (this.hours.indexOf(schedule.end) < minTime) minTime = this.hours.getIndex(schedule.end)
        })
        return this.hours.getValue(minTime)
    }
}

export default ScheduleShredder
