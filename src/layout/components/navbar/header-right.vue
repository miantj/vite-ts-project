<script setup lang="ts">
import { useNav } from '../../hook/nav'
import Screenfull from './screenfull.vue'
import user from '@/assets/icon/userRed_icon.png'
const { openPanel, togglePanel } = useNav()

function logout() {}
</script>

<template>
    <div class="vertical-header-right">
        <!-- <el-icon class="el-icon-setting" title="搜索菜单">
            <i-ep-search />
        </el-icon> -->

        <Screenfull />

        <!-- 退出登陆 -->
        <el-dropdown trigger="click">
            <span class="el-dropdown-link">
                <img :src="user" />
                <p>admin</p>
            </span>
            <template #dropdown>
                <el-dropdown-menu class="logout">
                    <el-dropdown-item @click="logout">
                        <el-icon :size="20">
                            <i-ant-design-logout-outlined />
                        </el-icon>

                        退出系统
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <el-icon class="el-icon-setting" title="打开项目配置" @click="togglePanel(!openPanel)">
            <i-ep-setting />
        </el-icon>
    </div>
</template>

<style lang="scss" scoped></style>
