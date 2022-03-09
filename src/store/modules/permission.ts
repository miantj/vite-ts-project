import { defineStore } from 'pinia'
import { store } from '@/store'
// import { cacheType } from "./types";
// import { cloneDeep } from "lodash-unified";
// import { RouteConfigs } from "/@/layout/types";
import routes from '@/router/modules'
// import { ascending, filterTree } from "/@/router/utils";

export const usePermissionStore = defineStore({
    id: 'pure-permission',
    state: () => ({
        // 静态路由生成的菜单
        constantMenus: routes,
    }),
    actions: {},
})

export function usePermissionStoreHook() {
    return usePermissionStore(store)
}
