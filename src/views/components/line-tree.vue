<script setup lang="ts">
import ElTreeLine from '@/components/SaTreeLine'
import SaTreeLine from '@/components/SaTreeLine/index.vue'

interface Tree {
    id: string
    label: string
    children?: Tree[]
}
const router = useRouter()

const getKey = (prefix: string, id: number) => {
    return `${prefix}-${id}`
}
const createData = (maxDeep: number, maxChildren: number, minNodesNumber: number, deep = 1, key = 'node'): Tree[] => {
    let id = 0
    return Array.from({ length: minNodesNumber })
        .fill(deep)
        .map(() => {
            const childrenNumber = deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren)
            const nodeKey = getKey(key, ++id)
            return {
                id: nodeKey,
                label: nodeKey,
                children: childrenNumber
                    ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
                    : undefined,
            }
        })
}

const data = createData(4, 4, 4)

let dataProps = {
    value: 'id',
    label: 'label',
    children: 'children',
}
</script>

<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span class="font-medium"> 扩展elemenet-plus的树形组件连接线 </span>
            </div>
        </template>

        <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span class="font-medium"> 自定义树结构 </span>
                        </div>
                    </template>
                    <div>
                        <el-tree :data="(router.options.routes as any)" :props="dataProps" node-key="id" show-checkbox>
                            <template v-slot:default="{ node }">
                                <el-tree-line :node="node" :showLabelLine="true">
                                    <template v-slot:node-label>
                                        <span class="text-sm">{{
                                            node.data?.meta?.title ? node.data?.meta?.title : node.data.path
                                        }}</span>
                                    </template>
                                </el-tree-line>
                            </template>
                        </el-tree>
                    </div>
                </el-card>
            </el-col>

            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span class="font-medium"> 普通树结构 </span>
                        </div>
                    </template>
                    <div>
                        <SaTreeLine :data="data" :height="150" showEdit :props="dataProps" node-key="id" show-checkbox>
                        </SaTreeLine>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </el-card>
</template>
<style lang="scss" scoped>
</style>
