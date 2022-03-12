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
        HANDLE_TAGS(value: RouteLocationNormalized) {
            if (value?.meta?.title) {
                this.historyTags.set(value.name, value)
                this.navTags.set(value.name, value)
            }
        },

        DELETE_TAGS(value: RouteLocationNormalized) {
            if (this.navTags.has(value.name)) {
                this.navTags.delete(value.name)
                this.historyTags.delete(value.name)
            }
        },

        handleTags(value: RouteLocationNormalized) {
            if (value.name == 'redirect') return
            
            if (this.historyTags.has(value.name)) {
                this.historyTags.delete(value.name)
            }

            this.HANDLE_TAGS(value)
        },

        deleteTags(value: RouteLocationNormalized, router: any) {
            this.DELETE_TAGS(value)
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
