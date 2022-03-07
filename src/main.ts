import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupStore } from '@/store'
// 导入公共样式
import './style/index.scss'

const app = createApp(App)

app.use(router)
// setupStore(app)
await router.isReady()
app.mount('#app')
