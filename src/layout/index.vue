<template>
    <!-- <div :class="[set.classes]"> -->
    <main :class="['app-main', set.classes]">
        <Vertical />
        <div class="main-container">
            <AppMain />
        </div>
    </main>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import Vertical from './components/vertical.vue'
import AppMain from './components/app-main.vue'
import { useLayoutStoreHook } from '@/store/modules/layout'
import { setType } from './types'

const set: setType = reactive({
    sidebar: computed(() => {
        return useLayoutStoreHook().sidebar
    }),
    classes: computed(() => {
        return {
            hideSidebar: !set.sidebar.opened,
            openSidebar: set.sidebar.opened,
        }
    }),
})

function setTheme(layoutModel: string) {
    window.document.body.setAttribute('layout', layoutModel)
    // instance.$storage.layout = {
    //     layout: `${layoutModel}`,
    //     theme: instance.$storage.layout?.theme,
    //     darkMode: instance.$storage.layout?.darkMode,
    //     sidebarStatus: instance.$storage.layout?.sidebarStatus,
    //     epThemeColor: instance.$storage.layout?.epThemeColor,
    // }
}
setTheme('vertical')
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
