export interface ScheduleItem {
    day: string
    start: string
    end: string
    duration: number
    room: string
    teacher: string
}

export interface subjectMatter {
    subjectName: string
    subjectGroup: string
    schedule: ScheduleItem[]
}
