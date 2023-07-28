<script setup lang="ts">
import SaTreeSelect from '@/components/SaTreeSelect/index.vue'

interface Tree {
    id: string
    label: string
    children?: Tree[]
}
const value = ref()
const value2 = ref()

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
                            <span class="font-medium"> 单选树选择器 </span>
                        </div>
                    </template>
                    <div>
                        <SaTreeSelect v-model="value" :data="data" :props="dataProps" node-key="id"> </SaTreeSelect>
                    </div>
                </el-card>
            </el-col>

            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span class="font-medium"> 多选树选择器 </span>
                        </div>
                    </template>
                    <div>
                        <SaTreeSelect
                            v-model="value2"
                            :data="data"
                            :props="dataProps"
                            node-key="id"
                            multiple
                            show-checkbox
                            check-strictly
                            :sa-check="true"
                        >
                        </SaTreeSelect>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </el-card>
</template>
