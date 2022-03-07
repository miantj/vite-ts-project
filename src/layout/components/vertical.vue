<template>
    <div class="sidebar-container">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            @open="handleOpen"
            @close="handleClose"
        >
            <el-sub-menu index="1">
                <template #title>
                    <el-icon><location /></el-icon>
                    <span>Navigator One</span>
                </template>
                <el-menu-item-group>
                    <template #title><span>Group One</span></template>
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                    <template #title><span>item four</span></template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="2">
                <el-icon><icon-menu /></el-icon>
                <template #title>Navigator Two</template>
            </el-menu-item>
            <el-menu-item index="3">
                <el-icon><document /></el-icon>
                <template #title>Navigator Three</template>
            </el-menu-item>
            <el-menu-item index="4">
                <el-icon><setting /></el-icon>
                <template #title>Navigator Four</template>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLayoutStoreHook } from '@/store/modules/layout'
import { Location, Document, Menu as IconMenu, Setting } from '@element-plus/icons-vue'

const isCollapse = computed(() => {
    return !useLayoutStoreHook().getSidebarStatus
})

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>

//
<style lang="scss" scoped>
// .sidebar-container {
//     transition: width 0.28s;
//     width: 210px !important;
//     height: 100%;
//     position: fixed;
//     font-size: 0;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     z-index: 1001;
//     overflow: hidden;
//     box-shadow: 0 0 1px #888;
//     .el-menu {
//         border-right: none;
//     }
// }

// .hideSidebar {
//     width: 64px !important;
// }

// .el-menu-vertical-demo:not(.el-menu--collapse) {
//     width: 200px;
// }
</style>
