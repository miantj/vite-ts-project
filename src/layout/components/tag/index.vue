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
            <!-- <li>
                <el-dropdown trigger="click" placement="bottom-end" @command="handleCommand">
                    <el-icon>
                        <IconifyIconOffline icon="arrow-down" />
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
                                <component :is="item.icon" :key="key" style="margin-right: 6px" />
                                {{ $t(item.text) }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </li> -->
            <li>
                <slot></slot>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue'
import { useRoute, useRouter, RouteLocationNormalized } from 'vue-router'
import { usePermissionStoreHook } from '@/store/modules/permission'
import { warn } from 'console'

const { navTags } = usePermissionStoreHook()
const router = useRouter()
const route = useRoute()

// 触发tags标签切换
function tagOnClick(item: RouteLocationNormalized) {
    console.warn(item)

    router.push({
        path: item?.path,
        query: item?.query,
    })
    // showMenuModel(item?.path, item?.query)
}

function deleteMenu(item: RouteLocationNormalized) {
    usePermissionStoreHook().deleteTags(item, router)
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
