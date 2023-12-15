import { RouteRecordRaw } from 'vue-router'
import basicRouter from './modules/basicRouter'
import router from '@/config/router'
import { useLayoutStoreHook } from '@/layout/store'
import { deepClone } from '@/utils/index'
import { storageSession } from '@/utils/storage'
import { menuPermissions, menuDynamic, menuStatic } from '@/config'
import { getMenu } from '@/api'

// 静态路由
const filtersFiles = import.meta.globEager('./modules/*.ts') as any

export let routes: Array<RouteRecordRaw> = deepClone(basicRouter)

export let routers: Array<RouteRecordRaw> = []

let routesStatic: any[] = []
let commonRouter: any[] = [] //通用路由地址
let levelMenu = {} as any // 一级菜单
let levelMenuChild = {} as any // 二级菜单

for (const key in filtersFiles) {
    if (key.includes('common.ts')) commonRouter = filtersFiles[key].default
    if (filtersFiles[key].default && JSON.stringify(filtersFiles[key].default) !== '{}') {
        if (filtersFiles[key].default instanceof Array) {
            routesStatic.push(...filtersFiles[key].default)
        } else {
            routesStatic.push(filtersFiles[key].default)
        }
    }
}

// 路由扁平化
if (menuDynamic) {
    for (let index = 0; index < routesStatic.length; index++) {
        const item = routesStatic[index]
        if (item.children) {
            item.children.forEach((element: any) => {
                if (element?.name) levelMenuChild[`_${element.name}_${element.path}`] = element
            })
        }

        levelMenu[item.name] = item
    }
}

// 按照路由中meta下的rank等级升序来排序路由
function ascending(arr: any[]) {
    return arr.sort((a: { meta: { rank: number } }, b: { meta: { rank: number } }) => {
        return (b?.meta?.rank ? b?.meta?.rank : 0) - (a?.meta?.rank ? a.meta?.rank : 0)
    })
}

/**
 * 通过路由path判断去重复合并
 * @param routes 传入路由
 * @returns 返回处理后的路由
 */
function repetition(routes: Array<RouteRecordRaw>) {
    let arrays: any = []
    routes.map((item: any) => {
        let index = arrays.findIndex((c: { path: any }) => c.path == item.path)

        if (index === -1) {
            arrays.push(item)
        }
    })

    return arrays
}

// 添加父节点
function addParentRoutes(routes: any) {
    const newRoutes = routes

    for (const iterator of newRoutes) {
        if (iterator.children) {
            for (const item of iterator?.children) {
                if (item.meta?.cache) useLayoutStoreHook().keepAliveInclude.push(item.name)
                if (item && item.meta) item.meta.parentid = iterator.path
            }
        } else {
            if (iterator.meta?.cache) useLayoutStoreHook().keepAliveInclude.push(iterator.name)
        }
    }
    return newRoutes
}

// 设置默认展示页面,设置成功返回false
function funTagFirst(route: any): boolean {
    if (route.meta && !route.meta?.hidden) {
        if (route?.children && route.children.length > 0) {
            route.children.forEach((el: any, index: number) => {
                if (index === 0) {
                    useLayoutStoreHook().tagFirst = {
                        path: el.path,
                        name: el.name,
                        meta: el.meta,
                    }
                }
                if (el.path == route.redirect) {
                    useLayoutStoreHook().tagFirst = {
                        path: el.path,
                        name: el.name,
                        meta: el.meta,
                    }
                }
            })
        } else {
            useLayoutStoreHook().tagFirst = {
                path: route.path,
                name: route.name,
                meta: route.meta,
            }
        }
        return false
    } else {
        return true
    }
}
// 动态生成路由
const importMenuDynamic = async (menu: any) => {
    if (menu && menu.topMenu) {
        for (let i = 0; i < menu.topMenu.length; i++) {
            const element = menu.topMenu[i]
            const key = element.urlpattern.replace(/\//g, '')
            const array = menu.childMenu[element.id]

            if (levelMenu[key]) {
                levelMenu[key].meta.title = element.name
                levelMenu[key].meta.rank = menu.topMenu.length - i
            } else {
                console.log(`动态路由，一级菜单${key}_${levelMenu[key]} 导入失败`)
            }

            if (array) {
                if (levelMenu[key]) levelMenu[key].children = []
                for (let index = 0; index < array.length; index++) {
                    const item = array[index]
                    const itemKey = item.urlpattern.replace(/\//g, '')
                    const itemKeyName = `_${itemKey}_/${levelMenu[key]?.name}/${itemKey}`

                    if (levelMenuChild[itemKeyName]) {
                        levelMenuChild[itemKeyName].meta.title = item.name
                        levelMenuChild[itemKeyName].meta.rank = array.length - index
                    }

                    if (!levelMenuChild[itemKeyName]) {
                        let impt = false
                        for (const keyChild in levelMenuChild) {
                            if (keyChild.includes(`_${itemKey}_`)) {
                                if (levelMenuChild[keyChild]) {
                                    levelMenuChild[keyChild].meta.title = item.name
                                    levelMenuChild[keyChild].meta.rank = array.length - index
                                }
                                impt = true
                                levelMenu[key].children.push(levelMenuChild[keyChild])
                            }
                        }

                        if (!impt) {
                            console.log(`动态路由，二级菜单${item.name}_${item.urlpattern} 导入失败`)
                        }
                    } else {
                        levelMenu[key].children.push(levelMenuChild[itemKeyName])
                    }
                }

                if (levelMenu[key]?.children && levelMenu[key]?.children.length > 0) {
                    for (let index = 0; index < commonRouter.length; index++) {
                        const element = commonRouter[index]
                        if (element.path.includes(key)) levelMenu[key].children.push(element)
                    }
                    levelMenu[key].redirect = levelMenu[key].children[0].path
                }
            } else {
                if (levelMenu[key]?.meta) levelMenu[key].meta.hiddenChildren = true
            }

            if (levelMenu[key]) routers.unshift(levelMenu[key])
        }
    }
}

// 初始化路由
export async function initRouter() {
    routers = []
    if (!menuDynamic && menuStatic) routers = deepClone(routesStatic)
    let tag = true
    let arr: unknown[] = []

    if (menuPermissions || menuDynamic) {
        let menu = await getMenu()
        if (menuPermissions && menu) {
            let topMenu = {} as any
            if (menu.topMenu) {
                menu.topMenu.forEach((element: any) => {
                    arr.push(element.urlpattern)
                    topMenu[element.id] = element.urlpattern
                })
            }

            if (menu.childMenu) {
                let childMenu = []
                for (const key in menu?.childMenu) {
                    const element = menu?.childMenu[key]
                    for (const i in element) {
                        childMenu.push(`${topMenu[element[i].pid]}${element[i].urlpattern}`)
                    }
                }

                storageSession.setItem('childMenu', childMenu)
            }
        }

        if (menuDynamic && menu) await importMenuDynamic(menu)
    }

    routes = deepClone(basicRouter)

    routers = routers.concat(routes)

    // 去重复
    routers = repetition(routers)

    // 排序路由
    routers = ascending(routers)

    // 添加父节点
    routers = addParentRoutes(routers)

    // 获取当前url
    let url = window.location.hash

    url = url.slice(1, url.length)

    routers.forEach(element => {
        if (menuPermissions && arr && !arr.includes('/' + String(element?.name))) return

        if (tag) {
            // 设置默认展示页面
            funTagFirst(element)
            tag = false
        }
        // 防止重复添加路由
        if (routes.findIndex(value => value.path === element.path) == -1) {
            routes.push(element)

            router.addRoute(element)
        }
    })

    return url ? { path: url } : null
}
