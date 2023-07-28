<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter, RouteLocationMatched } from 'vue-router'
import { useLayoutStoreHook } from '@/layout/store'
const route = useRoute()
const router = useRouter()
const { tagFirst } = useLayoutStoreHook()

// 面包屑数组
const breadcrumbRoute = ref([{} as unknown as RouteLocationMatched])

const getBreadcrumb = (): void => {
    // 设置面包屑
    const first = route.matched[0]
    if (first?.meta?.title !== tagFirst?.meta?.title) {
        breadcrumbRoute.value = tagFirst?.path
            ? [tagFirst as unknown as RouteLocationMatched].concat(route.matched)
            : route.matched
    } else {
        breadcrumbRoute.value = route.matched.filter(item => !item.meta.hiddenChildren)
    }
}

getBreadcrumb()

watch(
    () => route.path,
    () => getBreadcrumb()
)

const handleLink = (item: RouteLocationMatched): any => {
    const { redirect, path } = item
    if (redirect) {
        router.push(redirect.toString())
        return
    }
    router.push(path)
}
defineExpose({
    getBreadcrumb,
})
</script>

<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in breadcrumbRoute" :key="item.path">
            <span v-if="item.meta.hiddenChildren || index == breadcrumbRoute.length - 1" class="no-redirect">
                {{ item.meta.title }}
            </span>
            <a v-else @click.prevent="handleLink(item)">
                {{ item.meta.title }}
            </a>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<style lang="scss" scoped>
.el-breadcrumb {
    display: inline-block;
}
.app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;

    .no-redirect {
        color: #97a8be;
        cursor: text;
    }
}
</style>
