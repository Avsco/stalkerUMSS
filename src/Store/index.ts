import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import stalking from './stalking'
import capucchino from './capucchino'

export default new Vuex.Store({
    modules: {
        obj1: stalking,
        // obj2: capucchino,
    },
})
