import { subjectMatter } from '@/@types/schedule'

export class subjectMatters {
    private subjectMatters: subjectMatter[] = []

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

    public getSubjectMatters = (): subjectMatter[] => this.subjectMatters

    private isRepeated = (subjectMatterOne: subjectMatter, subjectMatterTwo: subjectMatter) =>
        subjectMatterTwo.groupCode == subjectMatterOne.groupCode && subjectMatterTwo.subjectName == subjectMatterOne.subjectName
}
