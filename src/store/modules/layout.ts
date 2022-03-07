import { store } from '@/store'
import { layoutType } from '../types'
import { defineStore } from 'pinia'
import { getConfig } from '@/config'
// import { storageLocal } from '/@/utils/storage'
// import { deviceDetection } from '/@/utils/deviceDetection'

export const useLayoutStore = defineStore({
    id: 'pure-app',
    state: (): layoutType => ({
        sidebar: {
            opened: false,
            withoutAnimation: false,
            isClickHamburger: false,
        },
        // 这里的layout用于监听容器拖拉后恢复对应的导航模式
        layout: '',
        device: '',
    }),
    getters: {
        getSidebarStatus(): Boolean {
            return this.sidebar.opened
        },
        // getDevice() {
        //     return this.device
        // },
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
