import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { useIconFont } from '@/config/iconfont'

// 导入公共样式
import './style/index.scss'
const __DEV__ = import.meta.env.MODE === 'development'
const app = createApp(App)

app.use(router)
app.use(store)
app.use(useIconFont)

if (__DEV__) {
    import('element-plus/dist/index.css')
    // 全局引入ui库
    import('element-plus').then(ElementPlus => {
        app.use(ElementPlus)
        app.mount('#app')
    })
} else {
    app.mount('#app')
}
