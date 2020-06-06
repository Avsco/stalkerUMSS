import { GetterTree, MutationTree, ActionTree } from 'vuex'
import axios from 'axios'

import { getCarrers } from '@/services/carrer'
import { concatUrl } from '@/@types/url'

import { ScheduleItem } from '@/@types/scheduleItem'
import { subjectMatter, subjectMatters } from '@/@types/subjectMatter'

export interface IState {
    nameTeacher: string
    schedulesTeacher: subjectMatter[]
    allTeachers: string[]
}

const state = (): IState => ({
    nameTeacher: '',
    schedulesTeacher: [],
    allTeachers: []
})

type TypeState = ReturnType<typeof state>

const getters: GetterTree<TypeState, TypeState> = {
    nameTeacher: (state) => state.nameTeacher,
    schedulesTeacher: (state) => state.schedulesTeacher,
    allTeachers: (state) => state.allTeachers
}

const mutations: MutationTree<TypeState> = {
    mutationTeacher: (state, payload: string) => (state.nameTeacher = payload),
    mutationSchedules: (state, payload: subjectMatter[]) => (state.schedulesTeacher = payload),
    mutationAllTeachers: (state, payload: string[]) => (state.allTeachers = payload)
}

const actions: ActionTree<TypeState, TypeState> = {
    actionSearch: ({ commit, dispatch }, nameTeacher) => {
        commit('mutationTeacher', nameTeacher)
        dispatch('actionGetCodes', nameTeacher)
    },

    actionGetScheludes: async ({ commit }, { nameTeacher, codeCarrers }) => {
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

    actionGetCodes: async ({ dispatch }, nameTeacher) => {
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

    //TODO sobre lo como hacer que get Codes sea algo mas global y accesible
    actionGetAllTeachers: async ({ commit }) => {}
}

export default {
    //   namespaced: true,
    state,
    getters,
    mutations,
    actions
}
