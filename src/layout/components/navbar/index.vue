<script setup lang="ts">
import { useLayoutStoreHook } from '@/layout/store'
import { useNav } from '../../hook/nav'
import Breadcrumb from './breadcrumb.vue'
import HeaderRight from './header-right.vue'
import SidebarItem from '../sidebar-item.vue'
import { useRoute } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import Logo from '../logo.vue'
import { routes } from '@/router'

const { isCollapse, layout } = useNav()
const breadcrumbDom = ref()
let defaultActive = ref()
const route = useRoute()

onMounted(() => {
    // 4、调用子组件中的方法
    defaultActive.value = route?.meta?.parentid
})

watch(
    () => route.path,
    () => {
        defaultActive.value = route?.meta?.parentid
    }
)

function open() {
    useLayoutStoreHook().TOGGLE_SETTINGS('sidebarOpened', !useLayoutStoreHook().settings.sidebarOpened)
}
</script>

<template>
    <div class="navbar">
        <Logo />

        <div class="hamburger-container" :title="isCollapse ? '点击展开' : '点击折叠'" @click="open">
            <el-icon :size="22">
                <iBiTextIndentLeft v-if="isCollapse" />
                <i-bi-text-indent-right v-else />
            </el-icon>
        </div>

        <div class="horizontal-header-menu">
            <el-menu
                v-if="layout === 'mix'"
                class="el-menu-vertical-demo"
                mode="horizontal"
                router
                :default-active="defaultActive == '/home' ? '/' : defaultActive"
                :collapse-transition="false"
            >
                <SidebarItem v-for="item in routes" :key="item.path" :item="item" />
            </el-menu>

            <!-- <Breadcrumb v-else ref="breadcrumbDom" class="breadcrumb-container" /> -->
        </div>

        <HeaderRight />
    </div>
</template>

<style lang="scss" scoped>
.navbar {
    display: flex;
    width: 100%;
    height: 60px;
    overflow: hidden;
    box-shadow: 0 0px 1px #666;
    border-bottom: 1px solid var(--element-tree-line-color);
    background: #fff;
    .hamburger-container {
        line-height: 72px;
        height: 100%;

        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;
        padding: 0 15px;
    }

    .horizontal-header-menu {
        width: calc(100% - 240px);
    }

    .breadcrumb-container {
        font-size: 14px;
        line-height: 60px;
        float: left;
    }
}
</style>
