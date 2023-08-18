const __DEV__ = import.meta.env.MODE === 'development'

// 是否开启一级菜单权限
let menuPermissions: Boolean = false

// 是否开启二级菜单权限设置
let childMenuPermissions: Boolean = false

// 是否开启动态路由
let menuDynamic: Boolean = false

// 是否开启静态路由
let menuStatic: Boolean = true

// 是否开启mock
let mock: Boolean = true

/**
 *
 * 需要持久化的数据
 *
 */

let piniaStorageLocal: any = {
    // 'pure-app': ['navTags', 'settings'],
}

let piniaStorageSession: any = {
    'pure-global': ['leftMenuActive'],
}

// if (!__DEV__) {
//     menuPermissions = true
//     childMenuPermissions = true
//     menuDynamic = true
//     menuStatic = false
//     mock = false
// }

export { piniaStorageLocal, piniaStorageSession, menuPermissions, childMenuPermissions, menuDynamic, menuStatic, mock }
