<script lang="ts" setup>
import { useNav } from '@/layout/hook/nav'
import SidebarItem from '@/layout/components/sidebar-item.vue'
import { useFullscreen } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import { routes } from '@/router'
import { useGlobalStoreHook } from '@/store/modules/global'
import { storageSession } from '@/utils/storage'


const { layout, openPanel, togglePanel, settings, navClear, pureLayout } = useNav()
const { isFullscreen, toggle } = useFullscreen()
const route = useRoute()
const router = useRouter()
const childMenu = storageSession.getItem('childMenu')
const menuActive = ref(route.path)
const changPassword = ref<HTMLElement>() as any
const headData = reactive({
    password: {
        old_password: '',
        new_password: '',
        again_password: '',
    },
    loginEidt: {
        old_password: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        new_password: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
    },
    passwordVisible: false,
    loading: false,
    authorizedUnit: localStorage.getItem('authorized_umit') || '',
})

function passwordDevFun(formEl: any) {
    if (headData.password.new_password != headData.password.again_password) {
        ElMessage({
            message: '输入新密码不一致，请重新输入!',
            type: 'warning',
        })
        return false
    }

    formEl.validate(async (valid: boolean) => {
        if (valid) {
        }
    })
}

function logout() {
    router.replace('/login')
    navClear()
}

watch(
    () => route.path,
    () => {
        if (childMenu) {
            if (childMenu.includes(route.path, childMenu)) menuActive.value = route.path
        } else {
            menuActive.value = route.path
        }
    }
)
</script>

<template>
    <div
        class="horizontal-header"
        :class="{
            'header-red': settings.theme == 'red',
            'header-blue': settings.theme == 'default' || settings.theme == 'blue',
        }"
    >
        <div class="horizontal-header-left">
            <router-link title="世安智慧" class="sidebar-logo-link" :to="pureLayout.tagFirst?.path || '/'">
                <!-- <el-image style="width: 130px" :src="logo" fit="contain" /> -->
            </router-link>
            <div class="horizontal-header-title" v-if="headData.authorizedUnit">
                <p title="综合运维服务平台">综合运维服务平台综合运维服务平台</p>
                <span :title="headData.authorizedUnit">{{ headData.authorizedUnit }}</span>
            </div>
            <span v-else>综合运维服务平台</span>
        </div>

        <div class="horizontal-header-right">
            <div class="vertical-header-right">
                <span class="header-name">您好， admin</span>

                <el-icon :size="20" :title="isFullscreen ? '退出全屏' : '全屏'" @click="toggle">
                    <i-ant-design-fullscreen-exit-outlined v-if="isFullscreen" />
                    <i-ant-design-fullscreen-outlined v-else />
                </el-icon>

                <el-icon title="打开项目配置" @click="togglePanel(!openPanel)">
                    <i-ep-setting />
                </el-icon>

                <el-icon title="修改密码" @click="headData.passwordVisible = true">
                    <i-ep-key />
                </el-icon>

                <!-- 退出登陆 -->
                <el-popconfirm title="确定退出系统?" @confirm="logout">
                    <template #reference>
                        <el-icon class="out" title="退出系统">
                            <i-ant-design-logout-outlined />
                        </el-icon>
                    </template>
                </el-popconfirm>
            </div>

            <div class="horizontal-header-menu">
                <el-menu
                    class="el-menu-vertical-demo"
                    :mode="(layout as any)"
                    :collapse-transition="false"
                    :default-active="menuActive"
                    :style="{ width: useGlobalStoreHook().menuWidthReset ? '98%' : '100%' }"
                >
                    <SidebarItem v-for="item in routes" :key="item.path" :item="item" />
                </el-menu>
            </div>
        </div>

        <!-- 修改密码 -->
        <el-dialog title="修改密码" v-model="headData.passwordVisible" width="560px">
            <el-form
                :model="headData.password"
                ref="changPassword"
                :rules="headData.loginEidt"
                label-position="right"
                label-width="120px"
            >
                <el-form-item label="输入旧密码" prop="old_password">
                    <el-input
                        v-model="headData.password.old_password"
                        placeholder="请输入正确旧密码"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item label="输入新密码" prop="new_password">
                    <el-input
                        v-model="headData.password.new_password"
                        placeholder="请输入正确新密码"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item label="再次输入新密码" prop="again_password">
                    <el-input
                        v-model="headData.password.again_password"
                        placeholder="请再次输入新密码"
                        type="password"
                    ></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button type="primary" @click="passwordDevFun(changPassword)" :loading="headData.loading">
                        保 存
                    </el-button>
                    <el-button @click="headData.passwordVisible = false">取 消</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<style lang="scss" scoped>
.horizontal-header {
    background-size: 100% 100% !important;
    .sidebar-logo-link {
        margin-right: 12px;
    }

    .horizontal-header-left {
        .horizontal-header-title {
            font-size: 26px;
            color: #fff;
            white-space: nowrap;
            max-width: 300px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            p {
                max-width: 300px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
            span {
                font-size: 22px;
                max-width: 300px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        span {
            font-size: 26px;
            color: #fff;
            max-width: 300px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    .horizontal-header-right {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 0 14px;

        .vertical-header-right {
            display: flex;
            color: #fff;
            height: 24px;
            font-size: 14px;

            .el-icon,
            .header-name {
                margin: 0 5px;

                :hover {
                    color: #fff;
                    cursor: pointer;
                }
            }

            .screen-full {
                display: inline-block;
            }

            .out {
                :hover {
                    color: red;
                }
            }
        }

        .horizontal-header-menu {
            height: 50px;
        }
    }
}
.header-blue {
    background: url(../../assets/themes/blue/banner.png) no-repeat;
}
.header-red {
    background: url(../../assets/themes/red/banner.png) no-repeat;
}

:deep(.el-menu-vertical-demo) {
    margin-top: 10px;
    height: 32px !important;
    justify-content: flex-end !important;

    .el-menu-item {
        font-size: 18px;
        color: #fff;
        border-radius: 32px;
        border-bottom: none;

        &:hover {
            color: #b6d3ff;
            background-color: transparent;
        }
    }

    .el-sub-menu {
        border-radius: 32px;
    }

    .el-sub-menu__title {
        font-size: 18px;
        color: #fff;
        border-bottom: none;
        transition: none;

        &:hover {
            color: #b6d3ff;
            background-color: transparent;
        }
    }

    .is-active {
        border-color: transparent;
        background: #fff;

        &:hover {
            color: var(--el-color-primary);
            background-color: #fff;
        }

        .el-sub-menu__title {
            border-color: transparent;
            border-bottom: none;

            &:hover {
                color: var(--el-color-primary);
            }
        }
    }
}
</style>
