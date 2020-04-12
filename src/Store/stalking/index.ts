import { GetterTree, MutationTree, ActionTree } from 'vuex'
import axios from 'axios'

import { getCodes } from '@/services/carrerCodes'
import { concatUrl } from '@/@types/url'

import { ScheduleItem } from '@/@types/scheduleItem'
import { subjectMatter, compareSubjectsMatters } from '@/@types/subjectMatter'

export interface IState {
    nameTeacher: string
    schedulesTeacher: subjectMatter[]
}

const state = (): IState => ({
    nameTeacher: '',
    schedulesTeacher: [],
})

type TypeState = ReturnType<typeof state>

const getters: GetterTree<TypeState, TypeState> = {
    nameTeacher: (state: IState) => state.nameTeacher,
    schedulesTeacher: (state: IState) => state.schedulesTeacher,
}

const mutations: MutationTree<TypeState> = {
    mutationTeacher: (state: IState, payload: string) => (state.nameTeacher = payload),
    mutationSchedules: (state: IState, payload: subjectMatter[]) => (state.schedulesTeacher = payload),
}

const actions: ActionTree<TypeState, TypeState> = {
    actionSearch: ({ commit, dispatch }, nameTeacher) => {
        commit('mutationTeacher', nameTeacher)
        dispatch('actionGetCodes', nameTeacher)
    },

    actionGetScheludes: async ({ commit }, { nameTeacher, codeCarrers }) => {
        try {
            let schedulesMatter: subjectMatter[] = []

            codeCarrers.forEach(async (code: string) => {
                const { data } = await axios.get(concatUrl(code))

                data.levels.forEach((level: any) => {
                    level.subjects.forEach((subject: any) => {
                        subject.groups.forEach((group: any) => {
                            if (!compareSubjectsMatters(schedulesMatter, group.code, subject.name)) {
                                let schedules: ScheduleItem[] = []
                                group.schedule.forEach((schedule: ScheduleItem) => {
                                    if (schedule.teacher === nameTeacher) {
                                        schedules.push(schedule)
                                    }
                                })
                                if (schedules.length > 0) {
                                    schedulesMatter.push({
                                        subjectName: subject.name,
                                        groupCode: group.code,
                                        schedules: schedules,
                                    })
                                }
                            }
                        })
                    })
                })
            })
            commit('mutationSchedules', schedulesMatter)
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
                codeCarrers: codeCarrers,
            })
        } catch (error) {
            console.error(error)
            dispatch('actionGetScheludes', [])
        }
    },
}

export default {
    namespaced: true,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
}
