import axios from 'axios'
import { getCodes } from './carrerCodes'

export async function getAllTeachers(): Promise<string[]> {
    try {
        const carrersCode = await getCodes()
        let teachers: string[] = []

        for (let index = 0; index < carrersCode.length; index++) {
            const teachersOfCarrer = await getTeachers(carrersCode[index])

            teachers.push(...teachersOfCarrer)
        }

        const filter = new Set(teachers)
        teachers = [...filter]

        return teachers
    } catch (e) {
        console.log(e)
        return []
    }
}

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

        return teachers
    } catch (e) {
        console.log(e)

        return []
    }
}
