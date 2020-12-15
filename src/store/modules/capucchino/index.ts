import { ActionContext, ActionTree, GetterTree, MutationTree } from 'vuex'

import HTTP from '@/plugins/axios'
import { carrer, basicCarrer } from '@/@types/cappuchino'
import { subjectMatter } from '@/@types/schedule'

class State {
    carrerSelected: carrer = {
        name: 'undefined',
        levels: []
    }
    carrers: basicCarrer[] = []
    subjectsMatter: subjectMatter[] = []
}

const getters: GetterTree<State, any> = {
    carrerSelected: (state) => state.carrerSelected,
    carrers: (state) => state.carrers,
    subjectsMatter: (state) => state.subjectsMatter
}

const mutations: MutationTree<State> = {
    mutationCarrerSelected: (state, payload: carrer) => (state.carrerSelected = payload),
    mutationCarrers: (state, payload: basicCarrer[]) => (state.carrers = payload),
    mutationSubjectsMatter: (state, payload: subjectMatter[]) => (state.subjectsMatter = payload)
}

const actions: ActionTree<State, any> = {
    actionGetCarrers: async ({ commit }: ActionContext<any, any>) => {
        try {
            const { data } = await HTTP.get('')
            const carrers: basicCarrer[] = data.map((carrer: any) => {
                return {
                    code: carrer.code,
                    name: carrer.name
                }
            })

            commit('mutationCarrers', carrers)
        } catch (error) {
            console.error(error)
            commit('mutationCarrers', [])
        }
    },

    actionGetCarrerSelected: async ({ commit }: ActionContext<any, any>, urlCarrer: string) => {
        try {
            const { data } = await HTTP.get(urlCarrer)
            let levelsInCarrer: carrer = {
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
            console.error(error)
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
