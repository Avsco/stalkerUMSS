import { GetterTree, MutationTree } from 'vuex'
import ScheduleItem from '../../Class/ScheduleItem'

export interface IState {
    nameTeacher: string
    schedulesTeacher: ScheduleItem[]
}

export const state = (): IState => ({
    nameTeacher: '',
    schedulesTeacher: []
})

export type TypeState = ReturnType<typeof state>

export const getters: GetterTree<TypeState, TypeState> = {
    nameTeacher: (state) => state.nameTeacher,
    schedulesTeacher: (state) => state.schedulesTeacher
}

export const mutations: MutationTree<TypeState> = {
    mutationTeacher: (state, payload) => (state.nameTeacher = payload),
    mutationSchedules: (state, payload) => (state.schedulesTeacher = payload)
}
