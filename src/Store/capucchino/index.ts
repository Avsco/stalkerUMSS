import { GetterTree, MutationTree, ActionTree } from 'vuex'

import axios from 'axios'

import { getUrl, concatUrl } from '@/@types/url'
import { completeCarrer, basicCarrer } from '@/@types/cappuchino'

export interface IState {
    carrer: completeCarrer[]
    carrers: basicCarrer[]
}

const state = (): IState => ({
    carrer: [],
    carrers: [],
})

type TypeState = ReturnType<typeof state>

const getters: GetterTree<TypeState, TypeState> = {
    carrer: (state) => state.carrer,
    carrers: (state) => state.carrers,
}

const mutations: MutationTree<TypeState> = {
    mutationCarrer: (state, payload: completeCarrer[]) => (state.carrer = payload),
    mutationCarrers: (state, payload: basicCarrer[]) => (state.carrers = payload),
}

//TODO probar que funciona
const actions: ActionTree<TypeState, TypeState> = {
    acitonGetCarrers: async ({ commit }) => {
        try {
            const { data } = await axios.get(getUrl())
            const carrers: basicCarrer[] = data.map((carrer: any) => {
                return {
                    code: carrer.code,
                    name: carrer.name,
                }
            })

            commit('mutationCarrers', carrers)
        } catch (error) {
            console.error(error)
            commit('mutationCarrers', [])
        }
    },

    acitonGetCarrer: async ({ commit }, urlCarrer) => {
        try {
            const { data } = await axios.get(concatUrl(urlCarrer))
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
            commit('mutationCarrer', completeCarrer)
        } catch (error) {
            console.error(error)
            commit('mutationCarrer', [])
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
