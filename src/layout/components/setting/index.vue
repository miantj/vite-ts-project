<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { ElMessageBox } from 'element-plus'
import { useLayoutStoreHook } from '@/layout/store'
import { themeColorsType } from '@/layout/types'
import { useNav } from '@/layout/hook/nav'
import { storageSession, storageLocal } from '@/utils/storage'
import { useRouter } from 'vue-router'
import Panel from './panel.vue'
import dayIcon from '@/assets/svg/day.svg'
import darkIcon from '@/assets/svg/dark.svg'

const router = useRouter()
let themeColors = ref<Array<themeColorsType>>([
    // 道奇蓝（默认）
    { rgb: '87, 169, 247', themeColor: 'default' },
    { rgb: '200, 112, 112', themeColor: 'red' },
])
const { switchTheme, togglePanel, openPanel } = useNav()
const { settings } = useLayoutStoreHook()

let dataTheme = ref<boolean>(settings.theme !== 'default')
let radio = ref<boolean>(settings.hideTabs)

let layoutTheme = reactive({
    loginRadio: storageLocal.getItem('befLogin') || 1,
    loginOptions: [
        {
            value: 1,
            label: '账号',
        },
        {
            value: 2,
            label: '二维码',
        },
    ],
    layout: settings.layout || 'vertical',
})

function dataThemeChange(value: any) {
    if (value) {
        switchTheme('red')
    } else {
        switchTheme('default')
    }
}

function tabsChange(value: any) {
    if (value) {
        useLayoutStoreHook().TOGGLE_SETTINGS('horizontalBreadcrumb', !value)
        useLayoutStoreHook().TOGGLE_SETTINGS('hideTabs', value)
    } else {
        useLayoutStoreHook().TOGGLE_SETTINGS('hideTabs', value)
        useLayoutStoreHook().TOGGLE_SETTINGS('horizontalBreadcrumb', !value)
    }
}

function loginChange(value: any) {
    storageLocal.setItem('befLogin', value)
}

function breadcrumbChange(value: any) {
    useLayoutStoreHook().TOGGLE_SETTINGS('horizontalBreadcrumb', value)
}

function multiTagsCacheChange(value: any) {
    useLayoutStoreHook().TOGGLE_SETTINGS('multiTagsCache', value)
}

function outAll(value: any) {
    ElMessageBox.confirm('您确定要清空全部缓存数据吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(() => {
            togglePanel(!openPanel)
            localStorage.clear()
            storageSession.clear()
            router.replace('/login')
        })
        .catch(() => {})
}

setLayoutModel(useLayoutStoreHook().settings.layout)
function setLayoutModel(layout: string) {
    layoutTheme.layout = layout
    window.document.body.setAttribute('layout', layout)
    useLayoutStoreHook().TOGGLE_SETTINGS('layout', layout)
}

const getThemeColorStyle = computed(() => {
    return (rgb: any) => {
        return { background: `rgb(${rgb})` }
    }
})

// 主题色 激活选择项
const getThemeColor = computed(() => {
    return (current: any) => {
        if (current === settings.theme && settings.theme !== 'default') {
            return 'color:#fff'
        } else if (current === settings.theme && settings.theme === 'default') {
            return 'color:#1d2b45'
        } else {
            return 'color:transparent'
        }
    }
})

onMounted(() => {
    console.warn(radio.value)
})
</script>

<template>
    <Panel>
        <el-divider>主题</el-divider>
        <el-switch
            v-model="dataTheme"
            inline-prompt
            class="pure-datatheme"
            :active-icon="dayIcon"
            :inactive-icon="darkIcon"
            @change="dataThemeChange"
        ></el-switch>

        <el-divider>导航栏模式</el-divider>
        <ul class="pure-theme">
            <el-tooltip class="item" content="左侧模式" placement="bottom">
                <li
                    :class="layoutTheme.layout === 'vertical' ? $style.isSelect : ''"
                    ref="verticalRef"
                    @click="setLayoutModel('vertical')"
                >
                    <div></div>
                    <div></div>
                </li>
            </el-tooltip>

            <el-tooltip class="item" content="顶部模式" placement="bottom">
                <li
                    :class="layoutTheme.layout === 'horizontal' ? $style.isSelect : ''"
                    ref="horizontalRef"
                    @click="setLayoutModel('horizontal')"
                >
                    <div></div>
                    <div></div>
                </li>
            </el-tooltip>

            <el-tooltip class="item" content="混合模式" placement="bottom">
                <li
                    :class="layoutTheme.layout === 'mix' ? $style.isSelect : ''"
                    ref="mixRef"
                    @click="setLayoutModel('mix')"
                >
                    <div></div>
                    <div></div>
                </li>
            </el-tooltip>
        </ul>

        <el-divider>主题色</el-divider>
        <ul class="theme-color">
            <li
                v-for="(item, index) in themeColors"
                :key="index"
                :style="getThemeColorStyle(item.rgb)"
                @click="switchTheme(item.themeColor)"
            >
                <el-icon style="margin: 1px 0 0 0" :style="getThemeColor(item.themeColor)">
                    <i-ep-check />
                </el-icon>
            </li>
        </ul>

        <el-divider>界面显示</el-divider>
        <ul class="setting">
            <li>
                <el-radio-group v-model="radio" @change="tabsChange">
                    <el-radio :label="false" size="large">标签导航</el-radio>
                    <el-radio :label="true" size="large">面包屑导航</el-radio>
                </el-radio-group>
            </li>

            <li>
                <span>默认登录方式</span>
                <el-select
                    v-model="layoutTheme.loginRadio"
                    placeholder="Select"
                    size="small"
                    style="width: 100px"
                    @change="loginChange"
                >
                    <el-option
                        v-for="item in layoutTheme.loginOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </li>

            <li>
                <span>标签页持久化</span>
                <el-switch
                    v-model="settings.multiTagsCache"
                    inline-prompt
                    inactive-color="#a6a6a6"
                    active-text="开"
                    inactive-text="关"
                    @change="multiTagsCacheChange"
                ></el-switch>
            </li>
        </ul>
        <el-divider></el-divider>
        <div class="out">
            <el-button type="danger" size="large" @click="outAll">
                <i-fa-sign-out></i-fa-sign-out>
                清空缓存并返回登录页
            </el-button>
        </div>
    </Panel>
</template>

<style scoped module>
.isSelect {
    border: 2px solid var(--el-color-primary);
}
</style>
<style lang="scss" scoped>
.pure-datatheme {
    width: 100%;
    height: 50px;
    text-align: center;
    display: block;
    padding-top: 25px;
}

.pure-theme {
    margin-top: 25px;
    width: 100%;
    height: 50px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    li {
        width: 18%;
        height: 45px;
        background: #f0f2f5;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        border-radius: 4px;
        box-shadow: 0 1px 2.5px 0 rgb(0 0 0 / 18%);

        &:nth-child(1) {
            div {
                &:nth-child(1) {
                    width: 30%;
                    height: 100%;
                    background: #1b2a47;
                }

                &:nth-child(2) {
                    width: 70%;
                    height: 30%;
                    top: 0;
                    right: 0;
                    background: #fff;
                    box-shadow: 0 0 1px #666;
                    position: absolute;
                }
            }
        }

        &:nth-child(2) {
            div {
                &:nth-child(1) {
                    width: 100%;
                    height: 30%;
                    background: #1b2a47;
                    box-shadow: 0 0 1px #666;
                }
            }
        }

        &:nth-child(3) {
            div {
                &:nth-child(1) {
                    width: 100%;
                    height: 30%;
                    background: #1b2a47;
                    box-shadow: 0 0 1px #666;
                }

                &:nth-child(2) {
                    width: 30%;
                    height: 70%;
                    bottom: 0;
                    left: 0;
                    background: #fff;
                    box-shadow: 0 0 1px #666;
                    position: absolute;
                }
            }
        }
    }
}

.theme-color {
    width: 100%;
    height: 40px;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    li {
        width: 20px;
        height: 20px;
        margin-top: 8px;
        margin-right: 8px;
        font-weight: 700;
        text-align: center;
        border-radius: 2px;
        cursor: pointer;
        &:nth-child(1) {
            border: 1px solid var(--element-tree-line-color);
        }
    }
}

.el-popper {
    z-index: 40001 !important;
}

.setting {
    width: 100%;

    li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 25px;
    }
}
.out {
    padding: 30px 10px;
    text-align: center;
}
</style>
