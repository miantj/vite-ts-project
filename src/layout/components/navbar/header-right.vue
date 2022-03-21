<template>
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

        <el-icon class="el-icon-setting" title="打开项目配置" @click="togglePanel(!openPanel)">
            <setting />
        </el-icon>
    </div>
</template>

<script setup lang="ts">
import { useNav } from '../../hook/nav'
import Screenfull from './screenfull.vue'

const { openPanel, togglePanel } = useNav()

function logout() {}
</script>

<style lang="scss" scoped>
.vertical-header-right {
    display: flex;
    min-width: 180px;
    height: 48px;
    align-items: center;
    color: #000000d9;
    justify-content: flex-end;

    .el-dropdown-link {
        width: 100px;
        height: 48px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        cursor: pointer;

        &:hover {
            background: #f6f6f6;
        }

        p {
            font-size: 14px;
        }

        img {
            width: 22px;
            height: 22px;
            border-radius: 50%;
        }
    }
    .el-icon-setting {
        cursor: pointer;
        padding: 0 10px;
        height: 100%;
        box-sizing: content-box;
        &:hover {
            background: #f6f6f6;
        }
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
