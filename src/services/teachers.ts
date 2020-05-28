import axios from 'axios'
import { getCarrers } from './carrer'
import { concatUrl } from '@/@types/url'

export async function getAllTeachers(): Promise<string[]> {
    try {
        const carrersCode = (await getCarrers()).map((carrer: any) => carrer.code)
        let teachers: string[] = []

        for (const code of carrersCode) {
            const teachersOfCarrer = await getTeachers(code)
            teachers.push(...teachersOfCarrer)
        }

        const filter = new Set(teachers)
        teachers = [...filter]

        return teachers
    } catch (e) {
        console.error(e)
        return []
    }
}

export async function getTeachers(carrerCode: string): Promise<string[]> {
    try {
        let teachers: string[] = []
        const { data } = await axios.get(concatUrl(carrerCode))
        data.levels.forEach((level: any) => {
            level.subjects.forEach((subject: any) => {
                subject.groups.forEach((group: any) => {
                    group.schedule.forEach((schedule: any) => teachers.push(schedule.teacher))
                })
            })
        })

        return teachers
    } catch (e) {
        console.error(e)
        return []
    }
}
