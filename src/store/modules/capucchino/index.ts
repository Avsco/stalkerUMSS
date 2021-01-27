import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

import HTTP from '@/plugins/axios'
import { Carrer, BasicCarrer } from '@/@types/cappuchino'
import { SubjectMatter } from '@/@types/schedule'

class State {
    carrerSelected: Carrer = {
        name: 'undefined',
        levels: []
    }
    carrers: BasicCarrer[] = []
    subjectsMatter: SubjectMatter[] = []
}

const getters: GetterTree<State, any> = {
    carrerSelected: (state) => state.carrerSelected,
    carrers: (state) => state.carrers,
    subjectsMatter: (state) => state.subjectsMatter
}

const mutations: MutationTree<State> = {
    mutationCarrerSelected: (state, payload: Carrer) => (state.carrerSelected = payload),
    mutationCarrers: (state, payload: BasicCarrer[]) => (state.carrers = payload),
    mutationSubjectsMatter: (state, payload: SubjectMatter[]) => (state.subjectsMatter = payload)
}

const actions: ActionTree<State, any> = {
    actionGetCarrers: async ({ commit }: ActionContext<any, any>) => {
        try {
            const { data } = await HTTP.get('')
            const carrers: BasicCarrer[] = data.map((carrer: any) => {
                return {
                    code: carrer.code,
                    name: carrer.name
                }
            })

            commit('mutationCarrers', carrers)
        } catch (error) {
            commit('mutationCarrers', [])
        }
    },

    actionGetCarrerSelected: async ({ commit }: ActionContext<any, any>, urlCarrer: string) => {
        try {
            const { data } = await HTTP.get(urlCarrer)
            let levelsInCarrer: Carrer = {
                name: data.name,
                levels: data.levels.map((level: any) => {
                    return {
                        code: level.code,
                        subjects: level.subjects.map((subject: any) => {
                            return {
                                name: subject.name,
                                groups: subject.groups.map((group: any) => {
                                    return {
                                        code: group.code,
                                        teacher: group.teacher,
                                        schedules: group.schedule
                                    }
                                })
                            }
                        })
                    }
                })
            }

            commit('mutationCarrerSelected', levelsInCarrer)
        } catch (error) {
            commit('mutationCarrerSelected', [])
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
