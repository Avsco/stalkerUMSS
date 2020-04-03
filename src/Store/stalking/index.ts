import { GetterTree, MutationTree, ActionTree } from 'vuex'
import axios from 'axios'

import { getCodes } from '@/services/carrerCodes'
import { concatUrl } from '@/@types/url'

import { ScheduleItem } from '@/@types/scheduleItem'

export interface IState {
    nameTeacher: string
    schedulesTeacher: ScheduleItem[]
}

const state = (): IState => ({
    nameTeacher: '',
    schedulesTeacher: []
})

type TypeState = ReturnType<typeof state>

const getters: GetterTree<TypeState, TypeState> = {
    nameTeacher: (state) => state.nameTeacher,
    schedulesTeacher: (state) => state.schedulesTeacher
}

const mutations: MutationTree<TypeState> = {
    mutationTeacher: (state, payload) => (state.nameTeacher = payload),
    mutationSchedules: (state, payload) => (state.schedulesTeacher = payload)
}

const actions: ActionTree<TypeState, TypeState> = {
    actionSearch: ({ commit, dispatch }, nameTeacher) => {
        commit('mutationTeacher', nameTeacher)
        dispatch('actionGetCodes', nameTeacher)
    },

    actionGetScheludes: async ({ commit }, { nameTeacher, codeCarrers }) => {
        try {
            let schedules: ScheduleItem[] = []

            codeCarrers.forEach(async (code: string) => {
                const { data } = await axios.get(concatUrl(code))

                data.levels.forEach((level: any) => {
                    level.subjects.forEach((subject: any) => {
                        subject.groups.forEach((group: any) => {
                            group.schedule.forEach((schedule: ScheduleItem) => {
                                if (schedule.teacher === nameTeacher) schedules.push(schedule)
                            })
                        })
                    })
                })
            })

            commit('mutationSchedules', schedules)
        } catch (error) {
            console.error(error)
            commit('mutationSchedules', [])
        }
    },

    actionGetCodes: async ({ dispatch }, nameTeacher) => {
        try {
            const codeCarrers: string[] = await getCodes()
            dispatch('actionGetScheludes', {
                nameTeacher: nameTeacher,
                codeCarrers: codeCarrers
            })
        } catch (error) {
            console.log(error)
            dispatch('actionGetScheludes', [])
        }
    }
}

export default {
    namespaced: true,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
}
