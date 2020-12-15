import Vue from 'vue'
import VueRouter from 'vue-router'

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
