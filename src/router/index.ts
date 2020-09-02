import Vue from 'vue'
import VueRouter from 'vue-router'

import Frontend from '@/Layouts/Frontend.vue'

import Stalker from '@/views/Stalker.vue'
import Cappuchino from '@/views/Cappuchino.vue'
import deleteMe from '@/views/deleteMe.vue'

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
                    name: 'menu',
                    component: deleteMe
                },
                {
                    path: 'stalker',
                    name: 'Docentes',
                    component: Stalker
                },
                {
                    path: 'capucchino',
                    name: 'Horario',
                    component: Cappuchino
                }
            ]
        }
    ],
    scrollBehavior: (to: any, from: any) => ({ x: 0, y: 0 })
})

export default router
