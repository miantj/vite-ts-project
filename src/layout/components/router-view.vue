<script setup lang="ts">
import { useLayoutStoreHook } from '@/layout/store'
</script>

<template>
    <router-view>
        <template #default="{ Component, route }">
            <transition name="fade-transform" mode="out-in">
                <keep-alive :include="useLayoutStoreHook().keepAliveInclude">
                    <component :is="Component" :key="route.fullPath" class="main-content" />
                </keep-alive>
            </transition>
        </template>
    </router-view>
</template>

<style lang="scss" scoped>
.main-content {
    margin: 14px;
    overflow: hidden;
}
</style>
