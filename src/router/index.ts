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
                    name: 'Stalker',
                    component: () => import('@/views/Stalker.vue')
                },
                {
                    path: 'cappuchino',
                    name: 'Capuchino',
                    component: () => import('@/views/Cappuchino.vue')
                }
            ]
        }
    ],
    scrollBehavior: (to: any, from: any) => ({ x: 0, y: 0 })
})

export default router
