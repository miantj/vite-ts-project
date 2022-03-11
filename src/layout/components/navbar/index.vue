<template>
    <div class="navbar">
        <!-- <Hamburger class="hamburger-container" /> -->

        <div class="hamburger-container" :title="isCollapse ? '点击展开' : '点击折叠'" @click="open">
            <IconFont style="font-size: 20px" :icon="isCollapse ? 'icon-indent' : 'icon-outdent'" />
        </div>
        <Breadcrumb class="breadcrumb-container" />
        <div class="vertical-header-right">
            <Screenfull />

            <!-- 退出登陆 -->
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    <img src="https://avatars.githubusercontent.com/u/29756128?s=40&v=4" />
                    <p>admin</p>
                </span>
                <template #dropdown>
                    <el-dropdown-menu class="logout">
                        <el-dropdown-item @click="logout">
                            <IconFont style="font-size: 20px" icon="icon-logout" />
                            退出系统
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLayoutStoreHook } from '@/store/modules/layout'
import { useNav } from '../../hook/nav'
import Breadcrumb from './breadcrumb.vue'
import Screenfull from './screenfull.vue'

const { isCollapse } = useNav()

function open() {
    useLayoutStoreHook().toggleSideBar(!useLayoutStoreHook().sidebar.opened)
   
}
function logout() {}
</script>

<style lang="scss" scoped>
.navbar {
    width: 100%;
    height: 48px;
    line-height: 50px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    border-bottom: 1px solid #e6e6e6;

    .hamburger-container {
        line-height: 48px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;
        padding: 0 15px;
    }
    .breadcrumb-container {
        font-size: 14px;
        line-height: 48px;
        float: left;
    }
    .vertical-header-right {
        display: flex;
        min-width: 280px;
        height: 48px;
        align-items: center;
        color: #000000d9;
        justify-content: flex-end;
    }

    .logout {
        max-width: 120px;

        ::v-deep(.el-dropdown-menu__item) {
            min-width: 100%;
            display: inline-flex;
            flex-wrap: wrap;
        }
    }
}
</style>
