import store from '@/store'
import { layoutType } from '../types'
import { defineStore } from 'pinia'

export const useLayoutStore = defineStore({
    id: 'pure-app',
    state: (): layoutType => ({
        sidebar: {
            opened: true,
            withoutAnimation: false,
            isClickHamburger: false,
        },
        // 这里的layout用于监听容器拖拉后恢复对应的导航模式
        layout: '',
        redirect: true,
    }),
    getters: {
        getSidebarStatus(): Boolean {
            return this.sidebar.opened
        },
    },
    actions: {
        TOGGLE_SIDEBAR(opened: boolean = false) {
            this.sidebar.opened = opened
        },
        async toggleSideBar(opened?: boolean) {
            await this.TOGGLE_SIDEBAR(opened)
        },
    },
})

export function useLayoutStoreHook() {
    return useLayoutStore(store)
}
