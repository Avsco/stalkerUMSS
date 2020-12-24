import { ScheduleItem } from './schedule'

export interface BasicCarrer {
    name: string
    code: string
}

export interface Carrer {
    name: string
    levels: Level[]
}

interface Level {
    code: string
    subjects: Subjet[]
}

interface Subjet {
    name: string
    groups: Group[]
}

interface Group {
    code: string
    teacher: string
    schedules: ScheduleItem[]
}
