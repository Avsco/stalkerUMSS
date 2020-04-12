import { ScheduleItem } from './scheduleItem'

class hourHandler {
    startHour: string
    endHour: string
    startingHour: string
    endingHour: string

    constructor(starHour: string, endHour: string, schedule: ScheduleItem) {
        this.startHour = starHour
        this.endHour = endHour
        this.startingHour = schedule.start
        this.endingHour = schedule.end
    }

    assignClassType = (): string => {
        let typeBox = 'table_schedule'
        if (this.minorAtTheEnd()) {
            typeBox += '--top'
        } else if (this.higherAtTheStart()) {
            typeBox += '--bottom'
        }
        return typeBox
    }

    compareHour = (): boolean => this.startHour == this.startingHour || this.endHour == this.endingHour

    minorAtTheEnd = (): boolean => this.startHour == this.startingHour && this.endHour > this.endingHour

    higherAtTheStart = (): boolean => this.startHour > this.startingHour && this.endHour == this.endingHour
}

export default hourHandler
