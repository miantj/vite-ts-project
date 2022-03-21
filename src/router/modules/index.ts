import { RouteRecordRaw } from 'vue-router'

// 静态路由
const filtersFiles = import.meta.globEager('./*.ts')
let routes: Array<RouteRecordRaw> = []

for (const key in filtersFiles) {
    if (filtersFiles[key].default instanceof Array) {
        routes.push(...filtersFiles[key].default)
    } else {
        routes.push(filtersFiles[key].default)
    }
}
// 去重复
routes = repetition(routes)

// 排序路由
routes = ascending(routes)

// 添加父节点
routes = addParentRoutes(routes)

// 按照路由中meta下的rank等级升序来排序路由
function ascending(arr: any[]) {
    return arr.sort((a: { meta: { rank: number } }, b: { meta: { rank: number } }) => {
        return (b?.meta?.rank ? b?.meta?.rank : 0) - (a?.meta?.rank ? a.meta?.rank : 0)
    })
}

/**
 * 通过路由path判断去重复
 * @param routes 传入路由
 * @returns 返回处理后的路由
 */
function repetition(routes: Array<RouteRecordRaw>) {
    let arrays: any = []
    routes.map((item: { path: any }) => {
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
                if (item.meta) item.meta.parentid = iterator.path
            }
        }
    }
    return newRoutes
}
export default routes
