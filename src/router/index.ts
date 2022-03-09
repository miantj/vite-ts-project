import { Router, createRouter, createWebHashHistory } from 'vue-router'
import routes from './modules'

// 创建路由实例
export const router: Router = createRouter({
    history: createWebHashHistory(),
    routes,
    strict: process.env.NODE_ENV !== 'production',
    scrollBehavior(to, from, savedPosition) {
        return new Promise(resolve => {
            if (savedPosition) {
                return savedPosition
            } else {
                if (from.meta.saveSrollTop) {
                    const top: number = document.documentElement.scrollTop || document.body.scrollTop
                    resolve({ left: 0, top })
                }
            }
        })
    },
})

export default router
