import axios from 'axios'

export async function getTeachers(carrerCode: string): Promise<string[]> {
    try {
        let teachers: string[] = []
        const { data } = await axios.get(`http://api.cappuchino.scesi.umss.edu.bo/schedule/FCyT/${carrerCode}`)
        data.levels.forEach((level: any) => {
            level.subjects.forEach((subject: any) => {
                subject.groups.forEach((group: any) => {
                    group.schedule.forEach((schedule: any) => teachers.push(schedule.teacher))
                })
            })
        })

        const filter = new Set(teachers)
        teachers = [...filter]
        return teachers
    } catch (e) {
        console.log(e)
        return []
    }
}
