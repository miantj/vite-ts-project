import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 导入公共样式
import './style/index.scss'

const app = createApp(App)

app.use(router)
await router.isReady()
app.mount('#app')
