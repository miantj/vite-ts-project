<script lang="ts" setup>
import { useNav } from '@/layout/hook/nav'
import { useLayoutStoreHook } from '@/layout/store'
import Horizontal from './horizontal.vue'
import Navbar from './navbar/index.vue'
import Tag from './tag/index.vue'
import RouterView from './router-view.vue'
import HorizontalBreadcrumb from '@/layout/components/navbar/horizontal-breadcrumb.vue'

const { isLayout, settings } = useNav()
</script>

<template>
    <section>
        <div class="fixed-header" v-if="useLayoutStoreHook().frameParent">
            <Navbar v-if="!isLayout('horizontal')" />
            <Horizontal v-else />
            <Tag v-if="!settings.hideTabs" />
            <HorizontalBreadcrumb v-if="!settings.horizontalBreadcrumb" />
        </div>

        <section class="app-main">
            <el-scrollbar>
                <el-backtop title="回到顶部" target=".app-main .el-scrollbar__wrap">
                    <el-icon :size="24">
                        <i-ph-rocket />
                    </el-icon>
                </el-backtop>
                <RouterView />
            </el-scrollbar>
        </section>
    </section>
</template>

<style lang="scss" scoped>
.app-main {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow-x: hidden;
    padding-top: 99px;
    padding-bottom: 33px;
    .el-scrollbar {
        background: #f0f2f5;
    }
}

.app-main-nofixed-header {
    width: 100%;
    min-height: 100vh;
    position: relative;
}
</style>
