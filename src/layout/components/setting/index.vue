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
        >
        </el-switch>

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

        <el-divider v-show="!dataTheme">主题色</el-divider>
        <div class="theme-color">
            <el-color-picker v-model="themeColor" show-alpha :predefine="predefineColors" @change="themeColorChange" />
        </div>

        <el-divider>界面显示</el-divider>
        <ul class="setting">
            <li v-show="!dataTheme">
                <span>隐藏标签页</span>
                <el-switch
                    v-model="settings.hideTabs"
                    inline-prompt
                    inactive-color="#a6a6a6"
                    active-text="开"
                    inactive-text="关"
                    @change="tabsChange"
                >
                </el-switch>
            </li>
        </ul>
    </Panel>
</template>

<script setup lang="ts">
import rgbHex from 'rgb-hex'
import { ref, getCurrentInstance, reactive } from 'vue'
import Panel from './panel.vue'
import { useLayoutStoreHook } from '@/layout/store'

import dayIcon from '@/assets/svg/day.svg'
import darkIcon from '@/assets/svg/dark.svg'

const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
])

let dataTheme = ref<boolean>()
let themeColor = ref('#409EFF')
const settings = reactive({
    hideTabs: useLayoutStoreHook().settings.hideTabs,
})

const instanceConfig = getCurrentInstance()?.appContext.app.config.globalProperties.$config

let layoutTheme = ref({
    layout: instanceConfig?.Layout ?? 'vertical',
})

function dataThemeChange() {}
function tabsChange(value: boolean) {
    console.warn(value)
    useLayoutStoreHook().TOGGLE_SETTINGS('hideTabs', value)
}

setLayoutModel(useLayoutStoreHook().settings.layout)
function setLayoutModel(layout: string) {
    layoutTheme.value.layout = layout
    window.document.body.setAttribute('layout', layout)
    useLayoutStoreHook().TOGGLE_SETTINGS('layout', layout)
}

function themeColorChange(rgb: string) {
    const color = '#' + rgbHex(rgb)
    getOpacityColor(rgb, '0.6')
    document.documentElement.style.setProperty('--el-color-primary', color)
    document.documentElement.style.setProperty('--el-color-primary-light-3', getOpacityColor(rgb, '0.6'))
}

// 设置rgba透明度
function getOpacityColor(color: string, opacity: string) {
    let newColor = color
    let val = color.match(/(\d(\.\d+)?)+/g)
    if (val?.length == 4) {
        val[3] = opacity
        newColor = '#' + rgbHex('rgba(' + val.join(',') + ')')
    }
    return newColor
}
</script>

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
                    box-shadow: 0 0 1px #888;
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
                    box-shadow: 0 0 1px #888;
                }
            }
        }

        &:nth-child(3) {
            div {
                &:nth-child(1) {
                    width: 100%;
                    height: 30%;
                    background: #1b2a47;
                    box-shadow: 0 0 1px #888;
                }

                &:nth-child(2) {
                    width: 30%;
                    height: 70%;
                    bottom: 0;
                    left: 0;
                    background: #fff;
                    box-shadow: 0 0 1px #888;
                    position: absolute;
                }
            }
        }
    }
}

.theme-color {
    text-align: center;
    margin-top: 25px;
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
</style>
