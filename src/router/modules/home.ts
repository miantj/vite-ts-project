const Layout = () => import('@/layout/index.vue')

/****************************************   router参数扩展   ***************************************
 *
 *  @Icon   {srting}                 展示icon
 *  @hiddenChildren {Boolean}        是否展示Children子页面
 *  @hidden {Boolean}                是否展示当前页面，优先级大于hiddenChildren
 *  @noCache {Boolean}               是否缓存当前页面，默认 false 开启缓存
 *  @activeMenu {srting||Array}      左侧菜单选中状态
 *  @activeHeadMenu {srting}         头部head选中状态
 *
 ***********************************************************************************************/

const homeRouter = [
    {
        path: '/',
        name: 'index',
        component: Layout,
        redirect: '/home',
        meta: {
            icon: 'homeFilled',
            title: '首页',
            hiddenChildren: true,
        },
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/home.vue'),
                meta: {
                    title: '首页',
                },
            },
        ],
    },
    {
        path: '/redirect',
        name: 'redirect',
        component: Layout,
        meta: {
            icon: 'homeFilled',
            title: '首页',
            noCache: true,
            hidden: true,
        },
        children: [
            {
                path: '/redirect/:path(.*)',
                name: 'redirect',
                component: () => import('@/views/redirect.vue'),
            },
        ],
    },
    {
        path: '/error',
        name: 'error',
        component: Layout,
        redirect: '/error/404',
        meta: {
            icon: 'homeFilled',
            title: '错误页面',
        },
        children: [
            {
                path: '/error/404',
                name: '404',
                component: () => import('@/views/error/404.vue'),
                meta: {
                    title: '404',
                },
            },
            {
                path: '/error/500',
                name: '500',
                component: () => import('@/views/error/500.vue'),
                meta: {
                    title: '500',
                },
            },
        ],
    },
]

export default homeRouter
