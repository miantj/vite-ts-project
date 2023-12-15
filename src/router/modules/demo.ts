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
    {
        path: '/demo',
        name: 'demo',
        component: () => import('@/layout/index.vue'),
        redirect: '/demo/elmentTeblePage',
        meta: {
            icon: 'setting',
            title: 'demo',
        },
        children: [
            {
                path: '/demo/elmentTeblePage',
                name: 'elmentTeblePage',
                component: () => import('@/views/demo/elment-teble-page.vue'),
                meta: {
                    title: '表单动态编辑',
                },
            },
            {
                path: '/demo/elmentTebleRadio',
                name: 'elmentTebleRadio',
                component: () => import('@/views/demo/elment-teble-radio.vue'),
                meta: {
                    title: '表单单选',
                },
            },
            {
                path: '/demo/elmentTeble',
                name: 'elmentTeble',
                component: () => import('@/layout/components/router-view.vue'),
                redirect: '/demo/elmentTebleAdd',
                meta: {
                    title: '表单动态添加',
                    hiddenChildren: true,
                },
                children: [
                    {
                        path: '/demo/elmentTebleAdd',
                        name: 'elmentTebleAdd',
                        component: () => import('@/views/demo/elment-teble-add.vue'),
                        meta: {
                            title: '表单动态添加',
                        },
                    },
                    {
                        path: '/demo/elmentTebleAdd/edit',
                        name: 'elmentTebleEdit',
                        component: () => import('@/views/demo/elment-teble-edit.vue'),
                        meta: {
                            title: '表单动态编辑',
                        },
                    },
                ],
            },
            {
                path: '/demo/baidu',
                name: 'reFrameBaidu',
                component: () => import('@/layout/frame-view.vue'),
                meta: {
                    title: 'iframe页面',
                    frameSrc: 'https://v3.cn.vuejs.org/',
                },
            },
            {
                path: '/demo/emitter',
                name: 'emitter',
                component: () => import('@/views/demo/emitter/index.vue'),
                meta: {
                    title: 'mitt事件总线',
                },
            },
            {
                path: '/demo/echarts',
                name: 'echarts',
                component: () => import('@/views/demo/echarts/index.vue'),
                meta: {
                    title: '组件库',
                },
            },
        ],
    },
]

export default demoRouter
