export interface ScheduleCell {
    color: string
    groupCode: string
    duration: number
    room: string
    subjectName: string
    day: string
    start: string
    end: string
}

export interface ScheduleItem {
    day: string
    start: string
    end: string
    duration: number
    room: string
    teacher: string
}

export interface SchedulesByDay {
    day: string
    schedules: ScheduleCell[]
}

export interface SubjectMatter {
    subjectName: string
    groupCode: string
    schedules: ScheduleItem[]
}
