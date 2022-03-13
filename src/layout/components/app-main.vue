<template>
    <section>
        <div class="fixed-header">
            <Navbar />
            <Tag />
        </div>

        <section class="app-main">
            <router-view>
                <template #default="{ Component, route }">
                    <el-scrollbar>
                        <!-- <el-backtop title="回到顶部" target=".app-main .el-scrollbar__wrap">
                            <backTop />
                        </el-backtop> -->
                        <transition name="fade-transform" mode="out-in">
                            <component
                                v-if="route?.meta?.noCache"
                                :is="Component"
                                :key="route.fullPath"
                                class="main-content"
                            />

                            <keep-alive v-else>
                                <component :is="Component" :key="route.fullPath" class="main-content" />
                            </keep-alive>
                        </transition>
                    </el-scrollbar>
                </template>
            </router-view>
        </section>
    </section>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'

import Navbar from './navbar/index.vue'
import Tag from './tag/index.vue'
</script>

<style lang="scss" scoped>
.app-main {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow-x: hidden;
    padding-top: 85px;
    .el-scrollbar {
        background: #f0f2f5;
    }
}

.app-main-nofixed-header {
    width: 100%;
    min-height: 100vh;
    position: relative;
}

.main-content {
    margin: 24px;
}
</style>
