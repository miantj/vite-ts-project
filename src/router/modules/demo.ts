/****************************************   router参数扩展   ***************************************
 *
 *  @Icon   {srting}                 展示icon
 *  @hiddenChildren {Boolean}        是否展示Children子页面
 *  @hidden {Boolean}                是否展示当前页面，优先级大于hiddenChildren
 *  @tagHidden {Boolean}             是否在tag展示当前页面
 *  @cache {Boolean}                 是否缓存当前页面，默认 false 关闭缓存
 *  @rank {Number}                   路由排序，数字越大权重越高
 *  @frameSrc {srting}               iframe页面地址
 *
 ***********************************************************************************************/

const demoRouter = [
    {
        path: '/components',
        name: 'components',
        component: () => import('@/layout/index.vue'),
        redirect: '/components/map',
        meta: {
            icon: 'setting',
            title: '组件',
        },
        children: [
            {
                path: '/components/map',
                name: 'map',
                component: () => import('@/views/components/map.vue'),
                meta: {
                    title: '地图组件',
                    cache: true,
                },
            },
            {
                path: '/components/lineTree',
                name: 'lineTree',
                component: () => import('@/views/components/line-tree.vue'),
                meta: {
                    title: '树形组件',
                },
            },
            {
                path: '/components/lineTreeSelect',
                name: 'lineTreeSelect',
                component: () => import('@/views/components/line-tree-select.vue'),
                meta: {
                    title: '树形选择器',
                },
            },
            {
                path: '/components/authCode',
                name: 'authCode',
                component: () => import('@/views/components/auth-code.vue'),
                meta: {
                    title: '授权码',
                },
            },
        ],
    },
]

export default demoRouter
