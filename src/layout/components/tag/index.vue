<script setup lang="ts">
import { ref, watch, computed, CSSProperties, unref, getCurrentInstance, onMounted } from 'vue'
import { useRoute, useRouter, RouteLocationNormalized } from 'vue-router'
import { tagsViewsType } from '../../types'
import { useLayoutStoreHook } from '@/layout/store'
import { templateRef } from '@vueuse/core'

const { tagsViews, navTags, showMenuModel, deleteTags, settings } = useLayoutStoreHook()

const router = useRouter()
const route = useRoute()
const instance = getCurrentInstance()
// 偏移量
const translateX = ref<number>(0)
const tabDom = templateRef<HTMLElement | null>('tabDom', null)
const scrollbarDom = templateRef<HTMLElement | null>('scrollbarDom', null)

// 触发tags标签切换
function tagOnClick(item: RouteLocationNormalized) {
    router.push({
        path: item?.path,
        query: item?.query,
    })
}

const handleScroll = (offset: number = 0): void => {
    const scrollbarDomWidth = scrollbarDom.value ? scrollbarDom.value?.offsetWidth : 0
    const tabDomWidth = tabDom.value ? tabDom.value?.offsetWidth : 0
    if (offset > 0) {
        translateX.value = Math.min(0, translateX.value + offset)
    } else {
        if (scrollbarDomWidth < tabDomWidth) {
            if (translateX.value >= -(tabDomWidth - scrollbarDomWidth)) {
                translateX.value = Math.max(translateX.value + offset, scrollbarDomWidth - tabDomWidth)
            }
        } else {
            translateX.value = 0
        }
    }
}

// 设置tags偏移量
const moveToView = async () => {
    const tagsArray = Array.from(navTags.values())
    const currentIndex = tagsArray.findIndex((v: any) => v.path == route.path)
    const scrollbarDomWidth = scrollbarDom.value ? scrollbarDom.value?.offsetWidth : 0
    const tabDomWidth = tabDom.value ? tabDom.value.offsetWidth : 0
    const maxOffset = scrollbarDomWidth - tabDomWidth //最大偏移量

    // console.warn(currentIndex)
    // console.warn('tags总宽度', tabDomWidth)
    // console.warn('总宽度', scrollbarDomWidth)
    // console.warn('最大偏移量', maxOffset)

    if (tabDomWidth > scrollbarDomWidth) {
        translateX.value = maxOffset
    } else {
        translateX.value = 0
    }

    const tabItemEl: any = instance?.refs[`dynamic${currentIndex}`]
    if (tabItemEl) {
        const tabItemElOffsetLeft = tabItemEl[0]?.offsetLeft + tabItemEl[0]?.offsetWidth + 5
        // console.warn('当前偏移量', tabItemElOffsetLeft)

        // 如果当前偏移量等于总宽度，则显示最后一位
        if (tabItemElOffsetLeft === tabDomWidth && tabDomWidth > scrollbarDomWidth) {
            translateX.value = maxOffset
        }

        // 如果当前tag偏移量大于显示范围，则显示当前tag
        if (tabItemElOffsetLeft > scrollbarDomWidth) {
            if (scrollbarDomWidth - tabItemElOffsetLeft - 60 > maxOffset) {
                translateX.value = scrollbarDomWidth - tabItemElOffsetLeft - 60
            } else {
                const x = scrollbarDomWidth - tabItemElOffsetLeft
                translateX.value = x < maxOffset ? maxOffset - 14 : x
            }
            return
        }

        // 如果总体宽度减当前偏移量大于显示范围，则显示第一位
        if (tabDomWidth - tabItemElOffsetLeft > scrollbarDomWidth) {
            if (tabItemElOffsetLeft + 30 > scrollbarDomWidth) {
                translateX.value = -30
            } else {
                translateX.value = 0
            }
        }
    }
}

const getTabStyle = computed((): CSSProperties => {
    return {
        transform: `translateX(${translateX.value}px)`,
    }
})

// 每次打开标签页菜单，更新状态
function handleOpen(visible: any) {
    if (visible) showMenuModel(route)
}

function handleCommand(command: { key: number; item: tagsViewsType }) {
    const { key, item } = command

    onClickDrop(key, item)
}

function onClickDrop(key: number, item: tagsViewsType) {
    if (item && item.disabled) return

    // 当前路由信息
    switch (key) {
        case 0:
            // 重新加载
            onFresh()
            break
        case 1:
            // 关闭当前标签页
            deleteMenu(route)
            break
        case 2:
            // 关闭左侧标签页
            deleteMenu(route, 'left')
            break
        case 3:
            // 关闭右侧标签页
            deleteMenu(route, 'right')
            break
        case 4:
            // 关闭其他标签页
            deleteMenu(route, 'other')
            break
        case 5:
            // 关闭全部标签页
            deleteMenu(route, 'all')
            break
    }
}

function deleteMenu(item: RouteLocationNormalized, type?: string) {
    deleteTags(
        {
            path: item.path,
            name: String(item.name),
            meta: item.meta,
            query: item.query,
        },
        router,
        type
    )
}

// 重新加载
function onFresh() {
    const { fullPath, query } = unref(route)
    router.replace({
        path: '/redirect' + fullPath,
        query: query,
    })
}
onMounted(() => {
    moveToView()
})

watch([route], () => {
    moveToView()
})
</script>

<template>
    <div class="tags-view">
        <div class="arrow-left" @click="handleScroll(200)">
            <el-icon>
                <i-ep-arrow-left-bold />
            </el-icon>
        </div>
        <div ref="scrollbarDom" class="scroll-container">
            <div class="tab" ref="tabDom" :style="getTabStyle">
                <div
                    v-for="(item, index) in navTags.values()"
                    :key="item.path"
                    :ref="'dynamic' + index"
                    :class="['scroll-item is-closable', { 'is-active': $route.path === item.path }]"
                    @click="tagOnClick(item)"
                >
                    {{ item.meta.title }}

                    <el-icon v-if="index !== 0" class="el-icon-close" @click.stop="deleteMenu(item)">
                        <i-ep-close />
                    </el-icon>
                </div>
            </div>
        </div>
        <span class="arrow-right" @click="handleScroll(-200)">
            <el-icon>
                <i-ep-arrow-right-bold />
            </el-icon>
        </span>
        <!-- 右键菜单按钮 -->

        <!-- 右侧功能按钮 -->
        <ul class="right-button">
            <li>
                <el-icon title="刷新路由" class="tag-right-button" @click="onFresh">
                    <i-ep-refresh-right />
                </el-icon>
            </li>
            <li>
                <el-dropdown
                    trigger="click"
                    placement="bottom-end"
                    @visible-change="handleOpen"
                    @command="handleCommand"
                >
                    <el-icon class="tag-right-button">
                        <i-ep-arrow-down />
                    </el-icon>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item
                                v-for="(item, key) in tagsViews"
                                :key="key"
                                :command="{ key, item }"
                                :divided="item.divided"
                                :disabled="item.disabled"
                            >
                                <el-icon v-if="item.svg">
                                    <component :is="item.icon" :key="key" />
                                </el-icon>

                                <sa-icon v-else :icon="item.icon" :key="key" />

                                {{ item.text }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
