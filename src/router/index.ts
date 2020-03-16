import Vue from 'vue'
import VueRouter from 'vue-router'

import Frontend from '../Layouts/Frontend.vue'

import Stalker from '../views/Stalker.vue'
import SelectCarrer from '../views/SelectCarrer.vue'

Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    linkExactActiveClass: 'exact',
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            component: Frontend,
            children: [
                {
                    path: '',
                    name: 'Home',
                    component: SelectCarrer
                },
                {
                    path: '/searchDocent/:codeCarrer',
                    name: 'Docentes',
                    component: Stalker
                }
            ]
        }
    ],
    scrollBehavior: (to, from) => ({ x: 0, y: 0 })
})

export default router
