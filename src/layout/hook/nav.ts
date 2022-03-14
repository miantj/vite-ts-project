import { computed } from 'vue'
import { useLayoutStoreHook } from '@/layout/store'

export function useNav() {
    const pureLayout = useLayoutStoreHook()

    const isCollapse = computed(() => {
        return !pureLayout.getSidebarStatus
    })

    return {
        isCollapse,
    }
}
