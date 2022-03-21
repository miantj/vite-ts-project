import { Component } from 'vue'
import { RouteRecordRaw } from 'vue-router'

export type layoutType = {
    settings: {
        sidebarOpened: boolean
        hideTabs: boolean
        layout: string
        // 判断是否手动点击Hamburger
        isClickHamburger: boolean
    }

    mixRoutes: Array<RouteRecordRaw>
    openPanel: boolean
    navTags: Map<any, any>
    historyTags: Map<any, any>
    tagsViews: Array<tagsViewsType>
}

export type tagsViewsType = {
    icon: Component | string
    text: string
    divided: boolean
    disabled: boolean
}

export type multiType = {
    path: string
    name: string
    meta: any
    query?: object
}

export interface setType {
    sidebar: {
        opened: boolean
    }
    classes: {
        hideSidebar: boolean
        openSidebar: boolean
    }
}
