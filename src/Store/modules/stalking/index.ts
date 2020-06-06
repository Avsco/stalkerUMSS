import { ActionContext } from 'vuex'

import axios from 'axios'

import { getCarrers } from '@/services/carrer'
import { concatUrl } from '@/@types/url'

import { ScheduleItem } from '@/@types/scheduleItem'
import { subjectMatter, subjectMatters } from '@/@types/subjectMatter'

interface IState {
    nameTeacher: string
    schedulesTeacher: subjectMatter[]
    allTeachers: string[]
}

const state: IState = {
    nameTeacher: '',
    schedulesTeacher: [],
    allTeachers: []
}

const getters = {
    nameTeacher: (state: IState) => state.nameTeacher,
    schedulesTeacher: (state: IState) => state.schedulesTeacher,
    allTeachers: (state: IState) => state.allTeachers
}

const mutations = {
    mutationTeacher: (state: IState, payload: string) => (state.nameTeacher = payload),
    mutationSchedules: (state: IState, payload: subjectMatter[]) => (state.schedulesTeacher = payload),
    mutationAllTeachers: (state: IState, payload: string[]) => (state.allTeachers = payload)
}

const actions = {
    actionSearch: ({ commit, dispatch }: ActionContext<any, any>, nameTeacher: string) => {
        commit('mutationTeacher', nameTeacher)
        dispatch('actionGetCodes', nameTeacher)
    },
    actionGetScheludes: async ({ commit }: ActionContext<any, any>, { nameTeacher, codeCarrers }: { nameTeacher: string; codeCarrers: string[] }) => {
        try {
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
    actionGetCodes: async ({ dispatch }: ActionContext<any, any>, nameTeacher: string) => {
        try {
            const codeCarrers: string[] = (await getCarrers()).map((carrer: any) => carrer.code)
            dispatch('actionGetScheludes', {
                nameTeacher: nameTeacher,
                codeCarrers: codeCarrers
            })
        } catch (error) {
            console.error(error)
            dispatch('actionGetScheludes', [])
        }
    },
    actionGetAllTeachers: async ({ commit }: ActionContext<any, any>) => {}
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
