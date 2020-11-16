import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

import axios from 'axios'

import { concatUrl, getUrl } from '@/@types/url'

import { scheduleItem } from '@/@types/schedule'
import { subjectMatter, subjectMatters } from '@/classes/subjectMatter'

//TODO: volver el allteahcer un SET()
class State {
    schedulesTeacher: subjectMatter[] = []
    allTeachers: string[] = []
}

const getters: GetterTree<State, any> = {
    schedulesTeacher: (state) => state.schedulesTeacher,
    allTeachers: (state) => state.allTeachers
}

const mutations: MutationTree<State> = {
    mutationSchedules: (state, payload: subjectMatter[]) => (state.schedulesTeacher = payload),
    mutationAllTeachers: (state, payload: string[]) => (state.allTeachers = payload)
}

const actions: ActionTree<State, any> = {
    //TODO: deshacerse de este metodo cuando el flujo de datos vuelva
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
                            let schedules: scheduleItem[] = []
                            group.schedule.forEach((schedule: scheduleItem) => {
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
    actionGetCodes: async ({}: ActionContext<any, any>): Promise<string[]> => {
        try {
            const { data } = await axios.get(getUrl())
            return data.map((carrer: any) => carrer.code)
        } catch (error) {
            console.error(error)
            return []
        }
    },
    actionGetAllTeachers: async ({ dispatch, commit }: ActionContext<any, any>): Promise<void> => {
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

    actionGetTeachersForCarrer: async ({}: ActionContext<any, any>, carrerCode: string): Promise<string[]> => {
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

        //TODO: ver si el flujo de datos esta bien
        // try {
        //     const { data } = await axios.get(concatUrl(carrerCode))
        //     return data.levels.map((level: any) =>
        //         level.subjects.map((subject: any) => subject.groups.map((group: any) => group.schedule.map((schedule: any) => schedule.teacher)))
        //     )
        // } catch (error) {
        //     console.error(error)
        //     return []
        // }
    }
}

export default {
    namespaced: true,
    state: new State(),
    getters,
    mutations,
    actions
}
