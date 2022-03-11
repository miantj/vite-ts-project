import { defineStore } from 'pinia'
import { RouteLocationNormalized, useRouter } from 'vue-router'
import store from '@/store'
import { multiType } from '../types'
import routes from '@/router/modules'

export const usePermissionStore = defineStore({
    id: 'pure-permission',
    state: () => ({
        // 静态路由生成的菜单
        constantMenus: routes,
        // 存储标签页信息（路由信息）
        navTags: new Map(),
        historyTags: new Map(),
    }),
    actions: {
        handleTags(value: RouteLocationNormalized) {
            console.warn(value);
            
            if (this.historyTags.has(value.name)) {
                this.historyTags.delete(value.name)
            }

            if (value?.meta?.title) {
                this.historyTags.set(value.name, value)
                this.navTags.set(value.name, value)
            }
        },

        deleteTags(value: RouteLocationNormalized, router: any) {
            if (this.navTags.has(value.name)) {
                this.navTags.delete(value.name)
                this.historyTags.delete(value.name)
            }
            const last = Array.from(this.historyTags)[this.historyTags.size - 1][1]

            router.push({
                path: last?.path,
                query: last?.query,
            })
        },
    },
})

export function usePermissionStoreHook() {
    return usePermissionStore(store)
}
