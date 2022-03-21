<template>
    <div class="sidebar-logo-container">
        <router-link v-if="!isCollapse" :title="title" class="sidebar-logo-link" to="/">
            <el-image src="https://element-plus.gitee.io/images/element-plus-logo.svg"></el-image>
        </router-link>
        <router-link v-else :title="title" class="sidebar-logo-link" to="/">
            <el-image src="https://cn.vitejs.dev/logo.svg"></el-image>
        </router-link>
    </div>
</template>

<script setup lang="ts">
import { useNav } from '@/layout/hook/nav'
import loge from '@/assets/image/logo.png'

const { isCollapse } = useNav()

const title = '广州世安'
</script>

<style lang="scss" scoped>
.hideSidebar {
    .sidebar-logo-container {
        padding: 5px 10px;
    }
}
</style>
