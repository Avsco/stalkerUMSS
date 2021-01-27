import { SubjectMatter } from '@/@types/schedule'

class SubjectMatters {
    private subjectMatters: SubjectMatter[] = []

    add(subjectMatterOne: SubjectMatter) {
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

    public getSubjectMatters = (): SubjectMatter[] => this.subjectMatters

    private isRepeated = (subjectMatterOne: SubjectMatter, subjectMatterTwo: SubjectMatter) =>
        subjectMatterTwo.groupCode == subjectMatterOne.groupCode && subjectMatterTwo.subjectName == subjectMatterOne.subjectName
}

export default SubjectMatters
