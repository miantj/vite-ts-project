<template>
    <div>
        <Vertical />
        <div class="main-container">
            <AppMain />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Vertical from './components/vertical.vue'
import AppMain from './components/app-main.vue'
</script>

<style lang="scss" scoped>
@mixin merge-style(/* vertical模式下主体内容距离网页文档左侧的距离 */ $sideBarWidth) {
    .main-container {
        height: 100vh;
        min-height: 100%;
        transition: margin-left 0.28s;
        margin-left: $sideBarWidth;
        position: relative;
        background: #f0f2f5;
    }
}

$sideBarWidth: 210px;
@include merge-style($sideBarWidth);
</style>
