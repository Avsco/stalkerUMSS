import { ActionContext } from 'vuex'

import axios from 'axios'

import { concatUrl, getUrl } from '@/@types/url'

import { ScheduleItem } from '@/@types/scheduleItem'
import { subjectMatter, subjectMatters } from '@/@types/subjectMatter'

interface IState {
    schedulesTeacher: subjectMatter[]
    allTeachers: string[]
}

const state: IState = {
    schedulesTeacher: [],
    allTeachers: []
}

const getters = {
    schedulesTeacher: (state: IState) => state.schedulesTeacher,
    allTeachers: (state: IState) => state.allTeachers
}

const mutations = {
    mutationSchedules: (state: IState, payload: subjectMatter[]) => (state.schedulesTeacher = payload),
    mutationAllTeachers: (state: IState, payload: string[]) => (state.allTeachers = payload)
}

const actions = {
    actionSearch: ({ dispatch }: ActionContext<any, any>, nameTeacher: string) => {
        dispatch('actionGetScheludes', nameTeacher)
    },
    actionGetScheludes: async ({ commit, dispatch }: ActionContext<any, any>, nameTeacher: string) => {
        try {
            const codeCarrers = await dispatch('actionGetCodes')
            let schedulesMatter: subjectMatters = new subjectMatters()
            codeCarrers.forEach(async (code: string) => {
                const { data } = await axios.get(concatUrl(code))
                data.levels.forEach((level: any) => {
                    level.subjects.forEach((subject: any) => {
                        subject.groups.forEach((group: any) => {
                            let schedules: ScheduleItem[] = []
                            group.schedule.forEach((schedule: ScheduleItem) => {
                                if (schedule.teacher === nameTeacher) {
                                    schedules.push(schedule)
                                }
                            })
                            schedulesMatter.add({
                                subjectName: subject.name,
                                groupCode: group.code,
                                schedules: schedules
                            })
                        })
                    })
                })
            })
            commit('mutationSchedules', schedulesMatter.getSubjectMatters())
        } catch (error) {
            console.error(error)
            commit('mutationSchedules', [])
        }
    },
    actionGetCodes: async ({}: ActionContext<any, any>) => {
        try {
            const { data } = await axios.get(getUrl())
            return data.map((carrer: any) => carrer.code)
        } catch (error) {
            console.error(error)
            return []
        }
    },
    actionGetAllTeachers: async ({ dispatch, commit }: ActionContext<any, any>) => {
        try {
            const codeCarrers = await dispatch('actionGetCodes')

            let teachers: string[] = []

            for (const code of codeCarrers) {
                const teachersOfCarrer = await dispatch('actionGetTeachersForCarrer', code)
                teachers.push(...teachersOfCarrer)
            }

            const filter = new Set(teachers)
            teachers = [...filter]

            commit('mutationAllTeachers', teachers)
        } catch (error) {
            console.error(error)
            commit('mutationAllTeachers', [])
        }
    },

    actionGetTeachersForCarrer: async ({}: ActionContext<any, any>, carrerCode: string) => {
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
        } catch (error) {
            console.error(error)
            return []
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
