import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import capucchino from './modules/capucchino'
import stalking from './modules/stalking'

export default new Vuex.Store({
    modules: {
        capucchino,
        stalking
    }
})
