import { computed } from 'vue'
import { useLayoutStoreHook } from '@/store/modules/layout'

export function useNav() {
    const pureLayout = useLayoutStoreHook()

    const isCollapse = computed(() => {
        return !pureLayout.getSidebarStatus
    })

    return {
        isCollapse,
    }
}
