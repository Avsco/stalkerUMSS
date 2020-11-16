import Vue from 'vue'
import VueRouter from 'vue-router'

// import Frontend from '@/Layouts/Frontend.vue'

// import Stalker from '@/views/Stalker.vue'
// import Cappuchino from '@/views/Cappuchino.vue'
// import Menu from '@/views/deleteMe.vue'

Vue.use(VueRouter)
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    linkExactActiveClass: 'exact',
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            component: () => import('@/Layouts/Frontend.vue'),
            children: [
                {
                    path: '',
                    name: 'menu',
                    component: () => import('@/views/deleteMe.vue')
                },
                {
                    path: 'stalker',
                    name: 'Docentes',
                    component: () => import('@/views/Stalker.vue')
                },
                {
                    path: 'capucchino',
                    name: 'Horario',
                    component: () => import('@/views/Cappuchino.vue')
                }
            ]
        }
    ],
    scrollBehavior: (to: any, from: any) => ({ x: 0, y: 0 })
})

export default router
