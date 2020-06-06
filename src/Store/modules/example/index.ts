import { GetterTree, ActionTree, MutationTree } from 'vuex'

interface IState {}

const state = (): IState => ({})

type RootState = ReturnType<typeof state>

const getters: GetterTree<RootState, RootState> = {}

const mutations: MutationTree<RootState> = {}

const actions: ActionTree<RootState, RootState> = {}

export default {
    state,
    getters,
    mutations,
    actions
}
