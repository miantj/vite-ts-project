import { defineStore } from 'pinia'
import store from '@/store'

export const useGlobalStore = defineStore({
    id: 'pure-global',
    state: () => ({
        clientHeight: 0, //屏幕可用高度
        menuWidthReset: false, //刷新header菜单宽度
        leftMenuActive: {}, //三级菜单状态
    }),
    getters: {},
    actions: {},
})

export function useGlobalStoreHook() {
    return useGlobalStore(store)
}
