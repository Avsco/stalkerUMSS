import { ActionContext } from 'vuex'

import axios from 'axios'

import { getUrl, concatUrl } from '@/@types/url'
import { completeCarrer, basicCarrer } from '@/@types/cappuchino'

interface IState {
    carrerSelected: completeCarrer[]
    carrers: basicCarrer[]
}

const state: IState = {
    carrerSelected: [],
    carrers: []
}

const getters = {
    carrerSelected: (state: IState) => state.carrerSelected,
    carrers: (state: IState) => state.carrers
}

const mutations = {
    mutationCarrerSelected: (state: IState, payload: completeCarrer[]) => (state.carrerSelected = payload),
    mutationCarrers: (state: IState, payload: basicCarrer[]) => (state.carrers = payload)
}

//TODO probar que funciona
const actions = {
    acitonGetCarrers: async ({ commit }: ActionContext<any, any>) => {
        try {
            const { data } = await axios.get(getUrl())
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
            const { data } = await axios.get(concatUrl(urlCarrer))
            let levelsInCarrer: completeCarrer[] = []
            data.levels.forEach((level: any, indexOne: number) => {
                levelsInCarrer.push({
                    code: level.code,
                    subjets: []
                })
                level.subjects.forEach((subject: any, indexTwo: number) => {
                    levelsInCarrer[indexOne].subjets.push({
                        name: subject.name,
                        groups: []
                    })
                    subject.groups.forEach((group: any) => {
                        levelsInCarrer[indexOne].subjets[indexTwo].groups.push({
                            code: group.code,
                            teacher: group.teacher
                        })
                    })
                })
            })

            commit('mutationCarrerSelected', levelsInCarrer)
        } catch (error) {
            console.error(error)
            commit('mutationCarrerSelected', [])
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
