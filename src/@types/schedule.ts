export interface scheduleCell {
    color: string
    groupCode: string
    duration: number
    room: string
    subjectName: string
    day: string
    start: string
    end: string
}

export interface scheduleItem {
    day: string
    start: string
    end: string
    duration: number
    room: string
    teacher: string
}

export interface schedulesByDay {
    day: string
    schedules: scheduleCell[]
}
