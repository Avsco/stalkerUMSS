import { scheduleItem } from './schedule'

export interface basicCarrer {
    name: string
    code: string
}

export interface carrer {
    name: string
    levels: level[]
}

interface level {
    code: string
    subjects: subjet[]
}

interface subjet {
    name: string
    groups: group[]
}

interface group {
    code: string
    teacher: string
    schedules: scheduleItem[]
}
