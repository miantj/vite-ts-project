<template>
    <!-- <div :class="[set.classes]"> -->
    <main :class="['app-main', set.classes]">
        <Vertical v-if="!isLayout('horizontal')" />

        <div class="main-container">
            <AppMain />
        </div>
        <!-- 系统设置 -->
        <Setting />
    </main>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import Vertical from './components/vertical.vue'

import AppMain from './components/app-main.vue'
import Setting from './components/setting/index.vue'
import { useLayoutStoreHook } from '@/layout/store'
import { useNav } from '@/layout/hook/nav'

import { setType } from './types'

const { isLayout, layout } = useNav()
const set: setType = reactive({
    sidebar: computed(() => {
        return {
            opened: useLayoutStoreHook().settings.sidebarOpened,
        }
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
}
setTheme(layout.value)
</script>

<style lang="scss" scoped></style>
