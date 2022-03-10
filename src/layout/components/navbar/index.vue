<template>
    <div class="navbar">
        <!-- <Hamburger class="hamburger-container" /> -->

        <div class="hamburger-container" @click="open">
            <IconFont style="font-size: 20px" :icon="isCollapse ? 'icon-indent' : 'icon-outdent'" />
        </div>
        <Breadcrumb />
    </div>
</template>

<script setup lang="ts">
import { useLayoutStoreHook } from '@/store/modules/layout'
import { useNav } from '../../hook/nav'
import Breadcrumb from './breadcrumb.vue'

const { isCollapse } = useNav()

function open() {
    useLayoutStoreHook().toggleSideBar(!useLayoutStoreHook().sidebar.opened)
    console.warn(useLayoutStoreHook().sidebar.opened)
}
</script>

<style lang="scss" scoped>
.navbar {
    width: 100%;
    height: 48px;
    line-height: 50px;
    overflow: hidden;
    background: #fff;
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
}
</style>
