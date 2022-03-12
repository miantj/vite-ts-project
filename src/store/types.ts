export type positionType = {
    startIndex?: number
    length?: number
}

export type layoutType = {
    sidebar: {
        opened: boolean
        withoutAnimation: boolean
        // 判断是否手动点击Hamburger
        isClickHamburger: boolean
    }
    layout: string
    redirect: boolean
}

export type multiType = {
    path: string
    parentPath: string
    name: string
    meta: any
    query?: object
}

export type setType = {
    title: string
    fixedHeader: boolean
    hiddenSideBar: boolean
}

export type userType = {
    token: string
    name?: string
}
