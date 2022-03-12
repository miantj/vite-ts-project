<template>
    <div class="tags-view">
        <div class="arrow-left">
            <el-icon><arrow-left-bold /></el-icon>
        </div>
        <div ref="scrollbarDom" class="scroll-container">
            <div class="tab" ref="tabDom">
                <div
                    v-for="(item, index) in navTags.values()"
                    :key="item.path"
                    :class="['scroll-item is-closable', { 'is-active': $route.path === item.path }]"
                    @click="tagOnClick(item)"
                >
                    {{ item.meta.title }}
                    <el-icon v-if="index !== 0" class="el-icon-close" @click.stop="deleteMenu(item)"><close /></el-icon>
                </div>
            </div>
        </div>
        <span class="arrow-right">
            <el-icon><arrow-right-bold /></el-icon>
        </span>
        <!-- 右键菜单按钮 -->

        <!-- 右侧功能按钮 -->
        <ul class="right-button">
            <li @click="onFresh">
                <el-icon title="刷新路由" class="el-icon-refresh-right rotate">
                    <refresh-right />
                </el-icon>
            </li>
            <li>
                <el-dropdown trigger="click" placement="bottom-end" @command="handleCommand">
                    <el-icon :size="30" style="padding: 8px">
                        <arrow-down />
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
                                <el-icon>
                                    <component :is="useRenderIcon(item.icon)" :key="key" />
                                </el-icon>

                                {{ item.text }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, unref, shallowRef } from 'vue'
import { useRoute, useRouter, RouteLocationNormalized } from 'vue-router'
import { tagsViewsType } from '../../types'
import { useRenderIcon } from '@/config/iconfont/iconfont'
import { useLayoutStoreHook } from '@/layout/store'

const { navTags } = useLayoutStoreHook()
const router = useRouter()
const route = useRoute()
const { tagsViews, showMenuModel, deleteTags } = useLayoutStoreHook()

// 触发tags标签切换
function tagOnClick(item: RouteLocationNormalized) {
    router.push({
        path: item?.path,
        query: item?.query,
    })
    showMenuModel(item)
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
    showMenuModel(item)
}

// 重新加载
function onFresh() {
    const { fullPath, query } = unref(route)
    router.replace({
        path: '/redirect' + fullPath,
        query: query,
    })
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
