const Layout = () => import('@/layout/index.vue')

const errorRouter = [
    {
        path: '/error',
        name: 'error',
        component: Layout,
        redirect: '/error/403',
        meta: {
            icon: 'Setting',
            title: '错误页面',
        },
        children: [
            {
                path: '/error/403',
                name: '403',
                component: () => import('@/views/error/403.vue'),
                meta: {
                    title: '403',
                    icon: 'Document',
                },
            },
            {
                path: '/error/404',
                name: '404',
                component: () => import('@/views/error/404.vue'),
                meta: {
                    title: '404',
                    icon: 'Document',
                },
                children: [
                    {
                        path: '/error/4031',
                        name: '4031',
                        component: () => import('@/views/error/403.vue'),
                        meta: {
                            title: '4031',
                            icon: 'Document',
                        },
                    },
                    {
                        path: '/error/4041',
                        name: '4041',
                        component: () => import('@/views/error/404.vue'),
                        meta: {
                            title: '4041',
                            icon: 'Document',
                        },
                        children: [
                            {
                                path: '/error/4032',
                                name: '4032',
                                component: () => import('@/views/error/403.vue'),
                                meta: {
                                    title: '4032',
                                    icon: 'Document',
                                },
                            },
                            {
                                path: '/error/4042',
                                name: '4042',
                                component: () => import('@/views/error/404.vue'),
                                meta: {
                                    title: '4042',
                                    icon: 'Document',
                                },
                            },
                            {
                                path: '/error/50022',
                                name: '50022',
                                component: () => import('@/views/error/500.vue'),
                                meta: {
                                    title: '50022',
                                    icon: 'Document',
                                },
                            },
                        ],
                    },
                    {
                        path: '/error/50011',
                        name: '50011',
                        component: () => import('@/views/error/500.vue'),
                        meta: {
                            title: '50011',
                            icon: 'Document',
                        },
                    },
                ],
            },
            {
                path: '/error/500',
                name: '500',
                component: () => import('@/views/error/500.vue'),
                meta: {
                    title: '500',
                    icon: 'Document',
                },
            },
        ],
    },
    {
        path: '/redirect',
        name: 'redirect',
        component: Layout,
        meta: {
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
        path: '/:pathMatch(.*)',
        redirect: '/error/404',
    },
]
export default errorRouter
