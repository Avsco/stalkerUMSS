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

export class subjectMatters {
    subjectMatters: subjectMatter[] = []

    add(subjectMatterOne: subjectMatter) {
        if (this.subjectMatters.length == 0 && subjectMatterOne.schedules.length > 0) this.subjectMatters.push(subjectMatterOne)
        else {
            if (subjectMatterOne.schedules.length > 0) {
                let isHere = false
                this.subjectMatters.forEach((subjectMatterTwo) => {
                    if (this.isRepeated(subjectMatterOne, subjectMatterTwo)) isHere = true
                })
                if (!isHere) this.subjectMatters.push(subjectMatterOne)
            }
        }
    }

    getSubjectMatters = (): subjectMatter[] => this.subjectMatters

    isRepeated = (subjectMatterOne: subjectMatter, subjectMatterTwo: subjectMatter) =>
        subjectMatterTwo.groupCode == subjectMatterOne.groupCode && subjectMatterTwo.subjectName == subjectMatterOne.subjectName
}
