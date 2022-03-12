<template>
    <template v-if="isShowChildren()">
        <el-menu-item :index="props.item.path">
            <el-icon v-if="props.item.meta.icon">
                <component :is="useRenderIcon(props.item.meta.icon)"></component>
            </el-icon>
            <template #title>
                {{ props.item.meta.title }}
            </template>
        </el-menu-item>
    </template>

    <template v-else>
        <el-sub-menu :index="props.item.path">
            <template #title>
                <el-icon v-if="props.item.meta.icon">
                    <component :is="useRenderIcon(props.item.meta.icon)"></component>
                </el-icon>
                <span> {{ props.item.meta.title }}</span>
            </template>
            <el-menu-item-group v-for="child in props.item.children" :key="child.path">
                <el-menu-item :index="child.path">
                    <el-icon v-if="child.meta.icon">
                        <component :is="useRenderIcon(child.meta.icon)"></component>
                    </el-icon>
                    <template #title>
                        {{ child.meta.title }}
                    </template>
                </el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
    </template>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import { useRenderIcon } from '@/config/iconfont/iconfont'


const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
})




// 校验是否显示子菜单
function isShowChildren(): Boolean {
    if (!props.item.meta?.hiddenChildren && props.item.children) {
        return false
    } else {
        return true
    }
}
</script>
