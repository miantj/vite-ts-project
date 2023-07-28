import { Component } from 'vue'
import { RouteRecordRaw } from 'vue-router'

export type layoutType = {
    settings: any
    mixRoutes: Array<RouteRecordRaw>
    frameParent: boolean
    openPanel: boolean
    navTags: Map<any, any>
    historyTags: Map<any, any>
    tagFirst: multiType | null
    tagsViews: Array<tagsViewsType>
    keepAliveInclude: Array<string>
}

export type tagsViewsType = {
    icon: Component | string
    text: string
    svg?: boolean
    divided: boolean
    disabled: boolean
}

export type multiType = {
    path: string
    name: any
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
export type themeColorsType = {
    rgb: string
    themeColor: string
}
