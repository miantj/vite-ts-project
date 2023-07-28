<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()
</script>

<template>
    <div class="screen-full" @click="toggle">
        <el-icon :size="20" :title="isFullscreen ? '退出全屏' : '全屏'">
            <i-ant-design-fullscreen-exit-outlined v-if="isFullscreen" />
            <i-ant-design-fullscreen-outlined v-else />
        </el-icon>
    </div>
</template>

<style lang="scss" scoped>
.screen-full {
    width: 36px;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: space-around;

    &:hover {
        background: #f6f6f6;
    }
}
</style>
