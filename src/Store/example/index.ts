import { GetterTree, MutationTree, ActionTree } from 'vuex'

export interface IState {}

const state = (): IState => ({})

type TypeState = ReturnType<typeof state>

const getters: GetterTree<TypeState, TypeState> = {}

const mutations: MutationTree<TypeState> = {}

const actions: ActionTree<TypeState, TypeState> = {}

export default {
    namespaced: true,
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
}
