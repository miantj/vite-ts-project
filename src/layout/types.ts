import { Component } from 'vue'

export type layoutType = {
    sidebar: {
        opened: boolean
        withoutAnimation: boolean
        // 判断是否手动点击Hamburger
        isClickHamburger: boolean
    }
    layout: string
    redirect: boolean
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
        withoutAnimation: boolean
        isClickHamburger: boolean
    }
    classes: {
        hideSidebar: boolean
        openSidebar: boolean
    }
}
