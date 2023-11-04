<script setup lang="ts">
import { useLayoutStoreHook } from '@/layout/store'
import music from '@/../public/music.mp3'
import music2 from '@/../public/music2.mp3'
import music3 from '@/../public/music3.mp3'
</script>

<template>
    <div style="width: 100%; height: 100%">
        <audio id="audioRef" :src="music" loop></audio>
        <audio id="audioRef2" :src="music2" loop></audio>
        <audio id="audioRef3" :src="music3" loop></audio>
        <router-view>
            <template #default="{ Component, route }">
                <transition name="fade-transform" mode="out-in">
                    <keep-alive :include="useLayoutStoreHook().keepAliveInclude">
                        <component :is="Component" :key="route.fullPath" class="main-content" />
                    </keep-alive>
                </transition>
            </template>
        </router-view>
    </div>
</template>

<style lang="scss" scoped>
.main-content {
    margin: 14px;
    overflow: hidden;
}
</style>
