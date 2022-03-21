<template>
    <div class="navbar">
        <div class="hamburger-container" :title="isCollapse ? '点击展开' : '点击折叠'" @click="open">
            <IconFont style="font-size: 20px" :icon="isCollapse ? 'icon-indent' : 'icon-outdent'" />
        </div>

        <el-menu
            v-if="layout === 'mix'"
            class="el-menu-vertical-demo"
            mode="horizontal"
            router
            :default-active="defaultActive == '/home' ? '/' : defaultActive"
            :collapse-transition="false"
        >
            <el-menu-item v-for="item in filterRouter" :key="item.path" :index="item.path">
                <el-icon v-if="item.meta.icon">
                    <component :is="useRenderIcon(item.meta.icon)"></component>
                </el-icon>
                <template #title>
                    {{ item.meta.title }}
                </template>
            </el-menu-item>
        </el-menu>
        <Breadcrumb v-else ref="breadcrumbDom" class="breadcrumb-container" />
        <HeaderRight />
    </div>
</template>

<script setup lang="ts">
import { useLayoutStoreHook } from '@/layout/store'
import { useNav } from '../../hook/nav'
import Breadcrumb from './breadcrumb.vue'
import { useRenderIcon } from '@/config/iconfont/iconfont'
import HeaderRight from './header-right.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, reactive, onMounted, watch } from 'vue'

const { isCollapse, filterRouter, layout } = useNav()
const breadcrumbDom = ref()
const route = useRoute()

let defaultActive = ref()

onMounted(() => {
    // 4、调用子组件中的方法
    defaultActive.value = route?.meta?.parentid
})

watch(
    () => route.path,
    () => {
        console.warn(route.meta)

        defaultActive.value = route?.meta?.parentid
    }
)

function open() {
    useLayoutStoreHook().TOGGLE_SETTINGS('sidebarOpened', !useLayoutStoreHook().settings.sidebarOpened)
}
</script>

<style lang="scss" scoped>
.navbar {
    width: 100%;
    height: 48px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    border-bottom: 1px solid #e6e6e6;
    .hamburger-container {
        line-height: 48px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;
        padding: 0 15px;
    }
    .breadcrumb-container {
        font-size: 14px;
        line-height: 48px;
        float: left;
    }
}
</style>
