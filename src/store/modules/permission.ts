import { defineStore } from 'pinia'
import store from '@/store'

export const usePermissionStore = defineStore({
    id: 'pure-permission',
    state: () => ({}),
    getters: {},
    actions: {},
})

export function usePermissionStoreHook() {
    return usePermissionStore(store)
}
