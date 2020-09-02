import { ActionContext } from 'vuex'

import axios from 'axios'

import { getUrl, concatUrl } from '@/@types/url'
import { carrer, basicCarrer } from '@/@types/cappuchino'
import { subjectMatter } from '@/classes/subjectMatter'

interface IState {
    carrerSelected: carrer
    carrers: basicCarrer[]
    subjectsMatter: subjectMatter[]
}

const state: IState = {
    carrerSelected: {
        name: 'undefined',
        levels: []
    },
    carrers: [],
    subjectsMatter: []
}

const getters = {
    carrerSelected: (state: IState) => state.carrerSelected,
    carrers: (state: IState) => state.carrers,
    subjectsMatter: (state: IState) => state.subjectsMatter
}

const mutations = {
    mutationCarrerSelected: (state: IState, payload: carrer) => (state.carrerSelected = payload),
    mutationCarrers: (state: IState, payload: basicCarrer[]) => (state.carrers = payload),
    mutationSubjectsMatter: (state: IState, payload: subjectMatter[]) => (state.subjectsMatter = payload)
}

//TODO probar que funciona
const actions = {
    actionGetCarrers: async ({ commit }: ActionContext<any, any>) => {
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
    state,
    getters,
    mutations,
    actions
}
