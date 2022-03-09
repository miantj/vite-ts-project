import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupStore } from '@/store'
import { useIconFont } from '@/config/iconfont'

// 导入公共样式
import './style/index.scss'
const app = createApp(App)

// setupStore(app)

app.use(router)
app.use(useIconFont)
await router.isReady()
app.mount('#app')
