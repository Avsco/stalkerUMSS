import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import stalking from './stalking'

export default new Vuex.Store({
    modules: {
        stalking
    }
})
