import { SubjectMatter } from '@/@types/schedule'

class SubjectMatters {
    private subjectMatters: SubjectMatter[]

    constructor() {
        this.subjectMatters = []
    }

    add(subjectMatterOne: SubjectMatter): void {
        if (this.subjectMatters.length == 0 && subjectMatterOne.schedules.length > 0) this.subjectMatters.push(subjectMatterOne)
        else {
            if (subjectMatterOne.schedules.length > 0) {
                let isHere: SubjectMatter | undefined = this.subjectMatters.find((subjectMatterTwo) => {
                    this.isRepeated(subjectMatterOne, subjectMatterTwo)
                })
                if (!isHere) this.subjectMatters.push(subjectMatterOne)
            }
        }
    }

    getSubjectMatters = (): SubjectMatter[] => this.subjectMatters

    private isRepeated = (subjectMatterOne: SubjectMatter, subjectMatterTwo: SubjectMatter): boolean =>
        subjectMatterTwo.groupCode == subjectMatterOne.groupCode && subjectMatterTwo.subjectName == subjectMatterOne.subjectName
}

export default SubjectMatters
