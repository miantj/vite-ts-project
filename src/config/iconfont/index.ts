import { App, Component } from 'vue'
import { Location, Document, Menu, Setting } from '@element-plus/icons-vue'
import { IconFont } from '@/config/iconfont/iconfont'

const components = [Location, Document, Menu, Setting]

export function useIconFont(app: App) {
    // 全局注册图标库
    app.component('IconFont', IconFont)
    components.forEach((component: Component) => {
        app.component(component.name, component)
    })
}
