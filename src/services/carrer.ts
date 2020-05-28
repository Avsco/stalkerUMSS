import axios from 'axios'

import { basicCarrer, completeCarrer } from '@/@types/cappuchino'

import { getUrl, concatUrl } from '@/@types/url'

export const getCarrers = async (): Promise<basicCarrer[]> => {
    try {
        const { data } = await axios.get(getUrl())
        return data.map((carrer: any) => {
            return {
                code: carrer.code,
                name: carrer.name,
            }
        })
    } catch (error) {
        console.error(error)
        return []
    }
}

export const getCarrer = async (code: string): Promise<null | completeCarrer[]> => {
    try {
        const { data } = await axios.get(concatUrl(code))
        let completeCarrer: completeCarrer[] = []
        data.levels.forEach((level: any, indexOne: number) => {
            completeCarrer.push({
                code: level.code,
                subjets: [],
                active: [],
            })
            level.subjects.forEach((subject: any, indexTwo: number) => {
                completeCarrer[indexOne].subjets.push({
                    name: subject.name,
                    groups: [],
                })
                subject.groups.forEach((group: any) => {
                    completeCarrer[indexOne].subjets[indexTwo].groups.push({
                        code: group.code,
                        teacher: group.teacher,
                    })
                })
            })
        })
        return completeCarrer
    } catch (error) {
        console.error(error)
        return null
    }
}
