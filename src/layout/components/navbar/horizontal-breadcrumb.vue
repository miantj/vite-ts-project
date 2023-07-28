<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter, RouteLocationMatched } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'
const route = useRoute()
const router = useRouter()

// 面包屑数组
const breadcrumbRoute = ref([{} as unknown as RouteLocationMatched])

// 设置面包屑
let oldItem = {} as any
const getBreadcrumb = (): void => {
    breadcrumbRoute.value = route.matched.filter(item => {
        let bool = oldItem?.meta?.title ? (oldItem.meta.title == item.meta.title ? false : true) : true
        oldItem = item
        return bool
    })
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
    <div class="breadcrumb">
        <i class="icon"></i>

        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item v-for="(item, index) in breadcrumbRoute" :key="item.path">
                <span
                    v-if="item.meta.hiddenChildren || index == breadcrumbRoute.length - 1"
                    class="no-redirect"
                    @click.prevent="handleLink(item)"
                >
                    {{ item.meta.title }}
                </span>
                <a v-else @click.prevent="handleLink(item)">
                    {{ item.meta.title }}
                </a>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<style lang="scss" scoped>
.breadcrumb {
    line-height: 38px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #e8eaec;
    padding: 0 20px;
    .icon {
        margin-right: 10px;
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-top: 1px;
        background: url(../../../assets/icon/break-icon.png) no-repeat center center;
        background-size: 18px 18px;
        vertical-align: sub;
    }

    :deep(.el-breadcrumb) {
        display: inline-block;
        vertical-align: middle;
        .el-breadcrumb__item {
            a,
            .no-redirect {
                color: #606266;
                cursor: pointer;
            }
        }
    }
}
// .app-breadcrumb.el-breadcrumb {
//     display: inline-block;
//     font-size: 14px;

//     .no-redirect {
//         color: #97a8be;
//         cursor: text;
//     }
// }
</style>
