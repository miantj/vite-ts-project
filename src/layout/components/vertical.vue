<template>
    <div class="sidebar-container has-logo">
        <Logo />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                :collapse="isCollapse"
                router
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

                <SidebarItem v-for="item in routes" :key="item.path" :item="item" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { RouteComponent } from 'vue-router'
import { useNav } from '../hook/nav'
import { usePermissionStoreHook } from '@/store/modules/permission'
import Logo from './logo.vue'
import SidebarItem from './sidebar-item.vue'
import { Menu as IconMenu } from '@element-plus/icons-vue'
import { childrenType } from '../types'

const { isCollapse } = useNav()
const { constantMenus } = usePermissionStoreHook()
const routes = computed(() => filterTree(constantMenus))

function filterTree(data: any) {
    const newTree = data.filter((e: { meta: { hidden: boolean } }) => e.meta && e.meta?.hidden !== true)
    newTree.forEach((v: { children: any }) => v.children && (v.children = filterTree(v.children)))
    return newTree
}

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>

//
<style lang="scss" scoped></style>
