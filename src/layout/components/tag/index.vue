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
        <ul class="right-button"></ul>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { usePermissionStoreHook } from '@/store/modules/permission'

const { navTags } = usePermissionStoreHook()
const router = useRouter()

// 触发tags标签切换
function tagOnClick(item) {
    router.push({
        path: item?.path,
        query: item?.query,
    })
    // showMenuModel(item?.path, item?.query)
}

function deleteMenu(item, tag?: string) {
    usePermissionStoreHook().deleteTags(item, router)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
