<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useLayoutStoreHook } from '@/layout/store'
import { useGlobalStoreHook } from '@/store/modules/global'
import { useNav } from '@/layout/hook/nav'
import { emitter } from '@/utils/mitt'
import { setType } from './types'
import Vertical from './components/vertical.vue'
import AppMain from './components/app-main.vue'
import Setting from './components/setting/index.vue'

const { isLayout, layout } = useNav()
const { settings, frameParent } = storeToRefs(useLayoutStoreHook())

const set: setType = reactive({
    sidebar: computed(() => {
        return {
            opened: settings.value.sidebarOpened,
        }
    }),
    classes: computed(() => {
        return {
            hideSidebar: !set.sidebar.opened,
            openSidebar: set.sidebar.opened,
        }
    }),
})

window.document.body.setAttribute('layout', layout.value)


onMounted(async () => {})
</script>

<template>
    <main
        :class="[
            'app-wrapper',
            { 'parent-iframe': !frameParent },
            { 'login-red': useNav().settings.theme == 'red' },
            set.classes,
        ]"
    >
        <Vertical v-if="!isLayout('horizontal')" />

        <div class="main-container">
            <!-- <el-scrollbar> -->
                <AppMain />
            <!-- </el-scrollbar> -->
        </div>
        <div class="main-footer" v-if="frameParent">© 广州世安信息技术股份有限公司 【V1.0.8】</div>
        <!-- 系统设置 -->
        <Setting />
    </main>
</template>

<style lang="scss" scoped>
.app-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
}
.main-footer {
    position: fixed;
    bottom: 0px;
    line-height: 24px;
    width: 100%;
    font-size: 14px;
    text-align: center;
    padding: 4px;
    background: #fff;
    border-top: 1px solid #f0f2f5;
}
</style>
