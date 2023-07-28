import { createApp } from 'vue'
import App from './App.vue'
import router from '@/config/router'
import store from './store'
import saIcon from '@/config/iconify'
import SaComponents from '@/components'
import { useGlobalStoreHook } from '@/store/modules/global'
import { useLayoutStoreHook } from '@/layout/store'
import { useThrottleFn } from '@vueuse/core'

import 'element-plus/dist/index.css'

// 导入公共样式
import './style/index.scss'
const __DEV__ = import.meta.env.MODE === 'development'
const app = createApp(App)

const startInit = async () => {
    app.component('saIcon', saIcon)

    app.use(router)
    app.use(store)
    await router.isReady()
    app.use(SaComponents)

    // 计算屏幕可用高度
    const menuWidthReset = useThrottleFn(() => {
        useGlobalStoreHook().menuWidthReset = false
    }, 1000)
    const throttledFn = () => {
        useGlobalStoreHook().menuWidthReset = true
        menuWidthReset()
    }
    useGlobalStoreHook().clientHeight = document.documentElement.clientHeight
    window.onresize = () => {
        throttledFn()
        let height = document.documentElement.clientHeight
        useGlobalStoreHook().clientHeight = !useLayoutStoreHook().frameParent ? height + 150 : height
    }

    if (__DEV__) {
        // 全局引入ui库
        import('element-plus').then(ElementPlus => {
            app.use(ElementPlus)
            app.mount('#app')
        })
    } else {
        app.mount('#app')
    }
}

startInit()
