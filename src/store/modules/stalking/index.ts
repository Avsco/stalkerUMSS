import { ActionContext, ActionTree, GetterTree, mapActions, MutationTree } from 'vuex'

import HTTP from '@/plugins/axios'

import { scheduleItem } from '@/@types/schedule'
import { subjectMatter, subjectMatters } from '@/classes/subjectMatter'

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
    actionGetScheludes: async ({ commit, dispatch }: ActionContext<any, any>, nameTeacher: string) => {
        try {
            const codeCarrers = await dispatch('actionGetCodes')
            let schedulesMatter: subjectMatters = new subjectMatters()
            codeCarrers.forEach(async (code: string) => {
                const { data } = await HTTP.get(code)
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
            const { data } = await HTTP.get('')
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
            const { data } = await HTTP.get(carrerCode)
            return data.levels
                .map((level: any) =>
                    level.subjects.map((subject: any) => subject.groups.map((group: any) => group.schedule.map((schedule: any) => schedule.teacher)))
                )
                .flat(3)
        } catch (error) {
            console.error(error)
            return []
        }
    }
}

export default {
    namespaced: true,
    state: new State(),
    getters,
    mutations,
    actions
}
