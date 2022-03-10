<template>
    <div class="screen-full" @click="toggle">
        <IconFont
            style="font-size: 20px"
            :title="isFullscreen ? '退出全屏' : '全屏'"
            :icon="isFullscreen ? 'icon-fullscreen-exit' : 'icon-fullscreen'"
        />
    </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()
</script>

<style lang="scss" scoped>
.screen-full {
    width: 36px;
    height: 48px;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: space-around;

    &:hover {
        background: #f6f6f6;
    }
}
</style>
