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
import { useLayoutStoreHook } from '@/layout/store'
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

<style lang="scss" scoped></style>
