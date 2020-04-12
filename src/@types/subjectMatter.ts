import { ScheduleItem } from './scheduleItem'

export interface subjectMatter {
    subjectName: string
    groupCode: string
    schedules: ScheduleItem[]
}

export const compareSubjectsMatters = (subjectMatters: subjectMatter[], groupCode: string, subjectName: string) => {
    subjectMatters.forEach((subjectMatterOne) => {
        if (subjectMatterOne.groupCode === groupCode && subjectMatterOne.subjectName === subjectName) return true
    })
    return false
}
