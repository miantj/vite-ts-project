<script setup lang="ts">
import SaLeftMenu from '@/components/SaLeftMenu/index.vue'
import Echarts from '@/views/demo/echarts/index.vue'

const leftMenu = [
    {
        label: '三级菜单-A',
        value: 'conf',
    },
    {
        label: '三级菜单-B',
        value: 'wrong',
    },
]

const tabOrder = (active: any) => {
    console.log(active)
}
</script>

<template>
    <div class="main">
        <SaLeftMenu :data="leftMenu" title="自定义菜单名称" @handleTabClick="tabOrder" />
        <div class="main_right">
            <Echarts />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main {
    height: calc(100% - 31px);
    flex: auto;
    display: flex;
    .main_right {
        width: calc(100% - 305px);
        margin-left: 14px;
        flex: auto;
        background: #ffffff;
        padding: 4px 14px;
    }
}
</style>
