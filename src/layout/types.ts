import { Component } from 'vue'
export const routerArrays: Array<RouteConfigs> = [
    {
        path: '/welcome',
        parentPath: '/',
        meta: {
            title: 'menus.hshome',
            i18n: true,
            icon: 'home-filled',
        },
    },
]

export type routeMetaType = {
    title?: string
    i18n?: boolean
    icon?: string
    showLink?: boolean
    savedPosition?: boolean
    authority?: Array<string>
}

export type RouteConfigs = {
    path?: string
    parentPath?: string
    query?: object
    meta?: routeMetaType
    children?: RouteConfigs[]
    name?: string
}

export type multiTagsType = {
    tags: Array<RouteConfigs>
}

export type tagsViewsType = {
    icon: Component
    text: string
    divided: boolean
    disabled: boolean
    show: boolean
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

export interface childrenType {
    path: string
    name?: string
    meta: {
        icon?: string
        iconfont?: string
        title: string
        showParent?: boolean
    }
    children?: childrenType[]
}

export type themeColorsType = {
    rgb: string
    themeColor: string
}

export interface scrollbarDomType extends HTMLElement {
    wrap?: {
        offsetWidth: number
    }
}
