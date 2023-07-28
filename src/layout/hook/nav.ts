import { ref, computed } from 'vue'
import { useLayoutStoreHook } from '@/layout/store'
import themes from '@/style/themes'

export function useNav() {
    const pureLayout = useLayoutStoreHook()

    const isCollapse = computed(() => {
        return !pureLayout.getSidebarStatus
    })

    const settings = pureLayout.settings

    const layout = computed(() => {
        return pureLayout.settings.layout
    })

    function isLayout(type: string): boolean {
        return pureLayout.settings.layout == type
    }

    function navClear() {
        pureLayout.navTags.clear()
        pureLayout.historyTags.clear()
        pureLayout.tagFirst = null
    }

    function togglePanel(show: boolean) {
        return pureLayout.TOGGLE_PANEL(show)
    }

    const openPanel = computed(() => {
        return pureLayout.openPanel
    })

    const switchTheme = (type: string = 'default') => {
        const oldColorObj = themes[pureLayout.settings.theme]

        if (oldColorObj) {
            // 删除之前css变量
            Object.keys(oldColorObj).map(item => {
                document.documentElement.style.removeProperty(item)
            })
        }

        // 根据不同的主题类型 获取不同主题数据
        pureLayout.settings.theme = type
        const colorObj = themes[type]

        if (colorObj) {
            // 设置css 变量
            Object.keys(colorObj).map(item => {
                document.documentElement.style.setProperty(item, colorObj[item])
            })
        }
    }

    return {
        layout,
        isCollapse,
        isLayout,
        pureLayout,
        settings,
        openPanel,
        togglePanel,
        switchTheme,
        navClear,
    }
}
