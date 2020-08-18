export interface scheduleCell {
    color: string
    subjectName: string
    room: string
    groupCode: string
    times: number
}

export interface ScheduleItem {
    day: string
    start: string
    end: string
    duration: number
    room: string
    teacher: string
}
