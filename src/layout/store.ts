import { shallowRef } from 'vue'
import { layoutType, multiType } from './types'
import { defineStore } from 'pinia'
import { RouteLocationNormalized, Router } from 'vue-router'

import closeLeft from '@/assets/svg/close_left.svg'
import closeRight from '@/assets/svg/close_right.svg'

export const useLayoutStore = defineStore({
    id: 'pure-app',
    state: (): layoutType => ({
        sidebar: {
            opened: true,
            withoutAnimation: false,
            isClickHamburger: false,
        },
        // 这里的layout用于监听容器拖拉后恢复对应的导航模式
        layout: '',
        redirect: true,
        // 存储标签页信息（路由信息）
        navTags: new Map(),
        historyTags: new Map(),
        tagsViews: [
            {
                icon: 'refreshRight',
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
                text: '关闭左侧标签页',
                divided: true,
                disabled: true,
            },
            {
                icon: shallowRef(closeRight),
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
    }),
    getters: {
        getSidebarStatus(): Boolean {
            return this.sidebar.opened
        },
        tagsArray(): any {
            return Array.from(this.navTags.values())
        },
    },
    actions: {
        TOGGLE_SIDEBAR(opened: boolean = false) {
            this.sidebar.opened = opened
        },
        async toggleSideBar(opened?: boolean) {
            await this.TOGGLE_SIDEBAR(opened)
        },

        // 检查当前右键的菜单两边是否存在别的菜单，如果左侧的菜单是首页，则不显示关闭左侧标签页，如果右侧没有菜单，则不显示关闭右侧标签页
        showMenuModel(item: RouteLocationNormalized) {
            // 当前为首页时状态
            if (item.name == 'home') {
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

            let currentIndex = this.tagsArray.findIndex((v: any) => v.path == item.path)

            /**
             * currentIndex为1时，左侧的菜单是首页，则不显示关闭左侧标签页
             */
            if (currentIndex == 1) {
                this.tagsViews[2].disabled = true
            }
            /**
             * 如果size等于length，右侧没有菜单，则不显示关闭右侧标签页
             */
            if (currentIndex == this.tagsArray.length - 1) {
                this.tagsViews[3].disabled = true
            }
            /**
             * 不显示关闭其他标签页
             */
            if (currentIndex == 1 && currentIndex == this.tagsArray.length - 1) {
                this.tagsViews[4].disabled = true
            }
        },

        HANDLE_TAGS(value: multiType) {
            if (value?.meta?.title) {
                this.historyTags.set(value.name, value)
                this.navTags.set(value.name, value)
            }
        },

        DELETE_TAGS(value: multiType) {
            if (value.name !== 'home' && this.navTags.has(value.name)) {
                this.navTags.delete(value.name)
                this.historyTags.delete(value.name)
            }
        },

        handleTags(value: multiType) {
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
                            console.warn(key)
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
                        const home = this.navTags.get('home')
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
                        const home = this.navTags.get('home')
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
                    const last = Array.from(this.historyTags)[this.historyTags.size - 1][1]

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
    return useLayoutStore()
}
