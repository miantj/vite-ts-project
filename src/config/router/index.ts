import { routes, initRouter } from '@/router'
import { Router, createRouter, createWebHashHistory } from 'vue-router'
import { useLayoutStoreHook } from '@/layout/store'
import NProgress from '@/utils/progress'

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

let init = true
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
    // console.warn('beforeEach', to, from)
    NProgress.start()

    let data: any
    // 是否开启标签页持久化
    const { handleTags, settings, navTags, tagFirst } = useLayoutStoreHook()

    if (init) {
        if (to.path !== '/login') data = await initRouter()

        if (navTags.size && !settings.multiTagsCache) {
            navTags.clear()
        }
        init = false
    }
    handleTags(to)

    if (data) {
        next(data.path)
    } else {
        if (to.path == '/home') {
            if (tagFirst) {
                if (tagFirst?.path != to.path) {
                    next(`${tagFirst?.path}`)
                } else {
                    next()
                }
            } else {
                next('/login')
            }
        } else {
            next()
        }
    }
})

// 全局解析守卫
router.beforeResolve(async to => {
    // console.warn('beforeResolve', to)
})

// 全局后置钩子
router.afterEach((to, from, failure) => {
    NProgress.done()
    // console.warn('afterEach', to, from)
})

export default router
