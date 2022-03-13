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
                path: '/error/403',
                name: '403',
                component: () => import('@/views/error/403.vue'),
                meta: {
                    title: '403',
                },
            },
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
            {
                path: '/error/5001',
                name: '5001',
                component: () => import('@/views/error/500.vue'),
                meta: {
                    title: '5-0-0-1',
                },
            },
            {
                path: '/error/5002',
                name: '5002',
                component: () => import('@/views/error/500.vue'),
                meta: {
                    title: '5-0-0-2',
                },
            },
            {
                path: '/error/5003',
                name: '5003',
                component: () => import('@/views/error/500.vue'),
                meta: {
                    title: '5-0-0-3',
                },
            },
            {
                path: '/error/5004',
                name: '5004',
                component: () => import('@/views/error/500.vue'),
                meta: {
                    title: '5-0-0-4',
                },
            },
            {
                path: '/error/5005',
                name: '5005',
                component: () => import('@/views/error/500.vue'),
                meta: {
                    title: '5-0-0-5',
                },
            },
            {
                path: '/error/5006',
                name: '5006',
                component: () => import('@/views/error/500.vue'),
                meta: {
                    title: '5-0-0-6',
                },
            },
            {
                path: '/error/5007',
                name: '5007',
                component: () => import('@/views/error/500.vue'),
                meta: {
                    title: '5-0-0-7',
                },
            },
            {
                path: '/error/5008',
                name: '5008',
                component: () => import('@/views/error/500.vue'),
                meta: {
                    title: '5-0-0-8',
                },
            },
            {
                path: '/error/5009',
                name: '5009',
                component: () => import('@/views/error/500.vue'),
                meta: {
                    title: '5-0-0-9',
                },
            },
            {
                path: '/error/50061',
                name: '50061',
                component: () => import('@/views/error/500.vue'),
                meta: {
                    title: '5-0-0-61',
                },
            },
        ],
    },
]

export default homeRouter
