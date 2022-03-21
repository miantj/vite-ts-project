<template>
    <div class="horizontal-header">
        <div class="horizontal-header-left">
            <router-link v-if="!isCollapse" title="广州世安" class="sidebar-logo-link" to="/">
                <el-image src="https://element-plus.gitee.io/images/element-plus-logo.svg"></el-image>
            </router-link>
        </div>
        <el-menu
            class="el-menu-vertical-demo"
            router
            :mode="layout"
            :collapse="isCollapse"
            :collapse-transition="false"
            :default-active="route.path == '/home' ? '/' : route.path"
        >
            <SidebarItem v-for="item in filterRouter" :key="item.path" :item="item" />
        </el-menu>
        <HeaderRight />
    </div>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useNav } from '@/layout/hook/nav'
import HeaderRight from './navbar/header-right.vue'
import SidebarItem from './sidebar-item.vue'

const { isCollapse, layout, filterRouter } = useNav()
const route = useRoute()
</script>

<style lang="scss" scoped></style>
