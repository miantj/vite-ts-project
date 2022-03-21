import { ref, computed } from 'vue'
import { useLayoutStoreHook } from '@/layout/store'
import routes from '@/router/modules'

export function useNav() {
    const pureLayout = useLayoutStoreHook()

    const isCollapse = computed(() => {
        return !pureLayout.getSidebarStatus
    })

    const settings = computed(() => {
        return pureLayout.settings
    })

    const layout = computed(() => {
        return pureLayout.settings.layout
    })

    function isLayout(type: string): boolean {
        return pureLayout.settings.layout == type
    }

    function togglePanel(show: boolean) {
        return pureLayout.TOGGLE_PANEL(show)
    }

    // 过滤路由
    function filterTree(data: any) {
        const newTree = data.filter((e: { meta: { hidden: boolean } }) => e.meta && e.meta?.hidden !== true)
        newTree.forEach((v: { children: any }) => {
            v.children && (v.children = filterTree(v.children))
        })
        return newTree
    }

    const openPanel = computed(() => {
        return pureLayout.openPanel
    })

    // 过滤路由生成新的菜单
    const filterRouter = computed(() => filterTree(routes))

    return {
        layout,
        isCollapse,
        isLayout,
        settings,
        openPanel,
        togglePanel,
        filterRouter,
    }
}
