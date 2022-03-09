<template>
    <template v-if="isShowChildren()">
        <el-menu-item :index="props.item.path">
            <template #title>
                {{ props.item.meta.title }}
            </template>
        </el-menu-item>
    </template>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import path from 'path'
import { childrenType } from '../types'

const props = defineProps({
    item: {
        type: Object as PropType<childrenType>,
        default: {},
    },
    isNest: {
        type: Boolean,
        default: false,
    },
    basePath: {
        type: String,
        default: '',
    },
})

function resolvePath(routePath: any) {
    const httpReg = /^http(s?):\/\//
    console.warn(routePath)
    if (httpReg.test(routePath) || httpReg.test(props.basePath)) {
        console.warn(routePath || props.basePath)

        return routePath || props.basePath
    } else {
        console.warn(path.resolve(props.basePath, routePath))

        return path.resolve(props.basePath, routePath)
    }
}

// 校验是否有子菜单
function isShowChildren(): Boolean {
    // console.log(props.item)
    if (props.item?.children) {
        return true
    }
    // const showingChildren = children.filter((item: any) => {
    //     // onlyOneChild.value = item
    //     console.log(item)

    //     return true
    // })

    // if (showingChildren[0]?.meta?.showParent) {
    //     return false
    // }

    // if (showingChildren.length === 1) {
    //     return true
    // }

    // if (showingChildren.length === 0) {
    //     onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    //     return true
    // }
    return false
}
</script>
