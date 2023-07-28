import { shallowRef } from 'vue'
import { layoutType, multiType } from './types'
import { defineStore } from 'pinia'
import { RouteLocationNormalized, Router, RouteRecordRaw } from 'vue-router'
import store from '@/store'

import closeLeft from '@/assets/svg/close_left.svg'
import closeRight from '@/assets/svg/close_right.svg'

export const useLayoutStore = defineStore({
    id: 'pure-app',
    state: (): layoutType => ({
        settings: {
            sidebarOpened: true,
            hideTabs: true,
            horizontalBreadcrumb: false,
            multiTagsCache: false,
            // 布局类型
            layout: 'horizontal',
            theme: 'default',
            isClickHamburger: false,
        },
        frameParent: true,
        openPanel: false,
        // 存储混合模式路由信息
        mixRoutes: [],
        // 存储标签页信息（路由信息）
        navTags: new Map(),
        historyTags: new Map(),
        tagFirst: null,
        tagsViews: [
            {
                icon: 'refresh-right',
                text: '重新加载',
                divided: false,
                disabled: false,
            },
            {
                icon: 'close',
                text: '关闭当前标签页',
                divided: false,
                disabled: true,
            },
            {
                icon: shallowRef(closeLeft),
                svg: true,
                text: '关闭左侧标签页',
                divided: true,
                disabled: true,
            },
            {
                icon: shallowRef(closeRight),
                svg: true,
                text: '关闭右侧标签页',
                divided: false,
                disabled: true,
            },
            {
                icon: 'remove',
                text: '关闭其他便签页',
                divided: true,
                disabled: true,
            },
            {
                icon: 'minus',
                text: '关闭全部标签页',
                divided: false,
                disabled: true,
            },
        ],
        // 缓存路由列表
        keepAliveInclude: [],
    }),
    getters: {
        getSidebarStatus(): Boolean {
            return this.settings.sidebarOpened
        },
    },
    actions: {
        TOGGLE_SETTINGS(key: string, data: string | boolean = false) {
            this.settings[key] = data
        },

        TOGGLE_PANEL(panel: boolean = false) {
            this.openPanel = panel
        },

        HANDLE_TAGS(value: multiType) {
            if (!value?.meta?.tagHidden && value?.meta?.title) {
                this.historyTags.set(value.name, value)
                this.navTags.set(value.name, value)
            }
        },

        DELETE_TAGS(value: multiType) {
            if (value.name !== this.tagFirst?.name && this.navTags.has(value.name)) {
                this.navTags.delete(value.name)
                this.historyTags.delete(value.name)
            }
        },

        CHANGE_MIX_ROUTES(value: Array<RouteRecordRaw>) {
            this.mixRoutes = value
        },

        CHANGE_IFRAME(value: boolean) {
            this.frameParent = value
        },

        // 检查当前右键的菜单两边是否存在别的菜单，如果左侧的菜单是首页，则不显示关闭左侧标签页，如果右侧没有菜单，则不显示关闭右侧标签页
        showMenuModel(item: RouteLocationNormalized) {
            const tagsArray = Array.from(this.navTags.values())

            // 当前为首页时状态
            if (item.name == this.tagFirst?.name) {
                // 重置状态
                Array.of(1, 2, 3, 4, 5).forEach(v => {
                    this.tagsViews[v].disabled = true
                })
                if (this.navTags.size > 1) {
                    Array.of(3, 4, 5).forEach(v => {
                        this.tagsViews[v].disabled = false
                    })
                }

                return
            } else {
                // 重置状态
                Array.of(1, 2, 3, 4, 5).forEach(v => {
                    this.tagsViews[v].disabled = false
                })
            }

            let currentIndex = tagsArray.findIndex((v: any) => v.path == item.path)

            /**
             * currentIndex为1时，左侧的菜单是首页，则不显示关闭左侧标签页
             */
            if (currentIndex == 1) {
                this.tagsViews[2].disabled = true
            }
            /**
             * 如果size等于length，右侧没有菜单，则不显示关闭右侧标签页
             */
            if (currentIndex == tagsArray.length - 1) {
                this.tagsViews[3].disabled = true
            }
            /**
             * 不显示关闭其他标签页
             */
            if (currentIndex == 1 && currentIndex == tagsArray.length - 1) {
                this.tagsViews[4].disabled = true
            }
        },

        handleTags(to: any) {
            if (this.tagFirst && this.navTags.size == 0 && to.name !== this.tagFirst.name) {
                this.HANDLE_TAGS(this.tagFirst)
            }

            let value = {
                path: to.path,
                name: String(to.name),
                meta: to.meta,
                query: to.query,
            }

            if (value.name == 'redirect') return

            if (this.historyTags.has(value.name)) {
                this.historyTags.delete(value.name)
            }

            this.HANDLE_TAGS(value)
        },

        deleteTags(value: multiType, router: Router, type?: string) {
            switch (type) {
                // 关闭左侧标签页
                case 'left':
                    for (const [key, element] of this.navTags) {
                        if (key !== value.name) {
                            this.DELETE_TAGS(element)
                        } else {
                            return
                        }
                    }
                    break
                // 关闭右侧标签页
                case 'right':
                    let del = false
                    for (const [key, element] of this.navTags) {
                        if (del) this.DELETE_TAGS(element)
                        if (key == value.name) {
                            del = true
                        }
                    }
                    break
                // 关闭其他标签页
                case 'other':
                    {
                        const home = this.navTags.get(this.tagFirst?.name)
                        const tag = this.navTags.get(value.name)
                        this.navTags.clear()
                        this.historyTags.clear()
                        this.HANDLE_TAGS(home)
                        this.HANDLE_TAGS(tag)
                    }

                    break
                // 关闭全部标签页
                case 'all':
                    {
                        const home = this.navTags.get(this.tagFirst?.name)
                        router.push({
                            path: home?.path,
                            query: home?.query,
                        })
                        this.navTags.clear()
                        this.historyTags.clear()
                        this.HANDLE_TAGS(home)
                    }

                    break
                // 关闭当前标签页
                default:
                    this.DELETE_TAGS(value)
                    let last
                    if (this.historyTags.size === 0) {
                        last = Array.from(this.navTags)[this.navTags.size - 1][1]
                    } else {
                        last = Array.from(this.historyTags)[this.historyTags.size - 1][1]
                    }

                    router.push({
                        path: last?.path,
                        query: last?.query,
                    })

                    break
            }
        },
    },
})

export function useLayoutStoreHook() {
    return useLayoutStore(store)
}
