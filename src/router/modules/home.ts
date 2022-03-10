const Layout = () => import('@/layout/index.vue')

/****************************************   router参数扩展   ***************************************
 *
 *  @Icon   {srting}                 展示icon
 *  @hiddenChildren {Boolean}        是否展示Children子页面
 *  @hidden {Boolean}                是否展示当前页面，优先级大于hiddenChildren
 *  @activeMenu {srting||Array}      左侧菜单选中状态
 *  @activeHeadMenu {srting}         头部head选中状态
 *
 ***********************************************************************************************/

const homeRouter = [
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        meta: {
            title: '首页',
            hiddenChildren: true,
        },
        children: [
            {
                path: '/home',
                name: '首页',
                component: () => import('@/views/error/404.vue'),
                meta: {
                    title: '首页',
                },
            },
        ],
    },
    {
        path: '/error',
        name: 'error',
        component: Layout,
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
