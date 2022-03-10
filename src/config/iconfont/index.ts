import { App, Component } from 'vue'
import { Location, Document, Menu, Setting, HomeFilled } from '@element-plus/icons-vue'
import { IconFont } from '@/config/iconfont/iconfont'

// 注册element-icon
const components = [Location, Document, Menu, Setting, HomeFilled]

export function useIconFont(app: App) {
    // 全局注册图标库
    app.component('IconFont', IconFont)
    components.forEach((component: Component) => {
        if (component.name) app.component(component.name, component)
    })
}
