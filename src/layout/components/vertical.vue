<script lang="ts" setup>
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router'
import { useNav } from '../hook/nav'

import SidebarItem from './sidebar-item.vue'
import { routes } from '@/router'

const { isCollapse, layout } = useNav()
const route = useRoute()
let mixRoutes = ref()
const menuData = computed(() => {
    return layout.value === 'mix' ? mixRoutes.value : routes
})

function getmixRoutes(path: RouteLocationNormalizedLoaded) {
    // path的上级路由组成的数组
    for (const iterator of routes) {
        if (path.meta && path.meta.parentid === iterator.path) {
            mixRoutes.value = iterator?.children
        }
    }
}

getmixRoutes(route)

watch(
    () => route.path,
    () => {
        getmixRoutes(route)
    }
)
</script>

<template>
    <div class="sidebar-container has-logo">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                class="el-menu-vertical-demo"
                router
                unique-opened
                :mode="layout == 'mix' ? 'vertical' : layout as any"
                :collapse="isCollapse"
                :collapse-transition="false"
                :default-active="route.path == '/home' && layout !== 'mix' ? '/' : route.path"
            >
                <SidebarItem v-for="item in menuData" :key="item.path" :item="item" :permissions="layout == 'mix'" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<style lang="scss" scoped></style>
