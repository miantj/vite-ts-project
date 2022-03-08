import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupStore } from '@/store'
// 导入公共样式
import './style/index.scss'
import * as ElIconModules from '@element-plus/icons-vue'
const app = createApp(App)

// 全局注册IconFont图标库
import { IconFont } from './config/iconfont'

// 全局注册图标库
app.component('IconFont', IconFont)
for (const iconName in ElIconModules) {
    if (Reflect.has(ElIconModules, iconName)) {
        const item = ElIconModules[iconName]
        app.component(iconName, item)
    }
}

app.use(router)
// setupStore(app)
await router.isReady()
app.mount('#app')
