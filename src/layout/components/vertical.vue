<template>
    <div class="sidebar-container has-logo">
        <Logo />

        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                class="el-menu-vertical-demo"
                router
                :mode="layout == 'mix' ? 'vertical' : layout"
                :collapse="isCollapse"
                :collapse-transition="false"
                :default-active="route.path == '/home' && layout !== 'mix' ? '/' : route.path"
            >
                <SidebarItem v-for="item in menuData" :key="item.path" :item="item" />
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useRoute, RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router'
import { useNav } from '../hook/nav'
import Logo from './logo.vue'
import SidebarItem from './sidebar-item.vue'

const { isCollapse, layout, filterRouter } = useNav()
const route = useRoute()
let mixRoutes = ref([])
const menuData = computed(() => {
    return layout.value === 'mix' ? mixRoutes.value : filterRouter.value
})

function getmixRoutes(path: RouteLocationNormalizedLoaded) {
    // path的上级路由组成的数组
    for (const iterator of filterRouter.value) {
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

<style lang="scss" scoped></style>
