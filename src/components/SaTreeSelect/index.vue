<script setup lang="ts">
import ElTreeLine from '@/components/SaTreeLine'
import { ElTree } from 'element-plus'
import './index.scss'

const emit = defineEmits(['handleNodeClick', 'addDialog', 'detentDialogOrg'])
const props = defineProps({
    defaultLabel: {
        type: String,
        default: '所有组',
    },
    showEdit: {
        type: Boolean,
        default: false,
    },
})

let current = ref() //当前选中
const treeRef = ref<InstanceType<typeof ElTree>>()
const attrs = useAttrs() as any

let currentLabel = computed(() => {
    return current.value || props.defaultLabel
})

const handleNodeClick = async (data: any) => {
    emit('handleNodeClick', data)
}

// 弹出添加分组弹窗 type 1为添加  2为修改
const openOrgDialog = (data: any, type: any, e: any) => {
    emit('addDialog', data, type, e)
}

//删除分组弹框
const openDeleteDialog = (data: any, node: string) => {
    emit('detentDialogOrg', data, node)
}

const setCheckedKeys = (data: Array<string> = [], type: boolean) => {
    treeRef.value!.setCheckedKeys(data, type)
}

const filter = (val: any) => {
    treeRef.value!.filter(val)
}

const checkedArr = (data: any, key: string) => {
    let checked: any = []
    checked.push(data[key])
    if (data[attrs?.props?.children]) {
        data[attrs?.props?.children].forEach((element: any) => {
            let arr = checkedArr(element, key)
            checked = [...checked, ...arr]
        })
    }

    return checked
}

let Lastdept: any[] = []

const handleCheckClear = (data: any, checked: any) => {
    const i = Lastdept.indexOf(data)
    Lastdept.splice(i, 1)
}

const handleCheckCheck = (data: any, checked: any) => {
    if (attrs['sa-check']) {
        setTimeout(() => {
            let modelValue = attrs.modelValue as any

            const value = `${attrs?.props?.value}` || 'value'

            if (Lastdept.includes(data[value])) {
                const i = Lastdept.indexOf(data[value])
                Lastdept.splice(i, 1)
            } else {
                let arr: any = checkedArr(data, value)

                arr.forEach((element: any) => {
                    if (!Lastdept.includes(element as never)) {
                        Lastdept.push(element as never)
                    }
                    if (!modelValue.includes(element as never)) {
                        modelValue.push(element)
                    }
                })
                setCheckedKeys(Lastdept, false)
            }
        }, 0)
    }
}

defineExpose({
    setCheckedKeys, //设置勾选
    filter,
})
</script>

<template>
    <div>
        <el-scrollbar>
            <el-tree-select
                ref="treeRef"
                icon="span"
                popper-class="sa-tree-select"
                @check="handleCheckCheck"
                @remove-tag="handleCheckClear"
                default-expand-all
                v-bind="$attrs"
            >
                <template #default="{ node, data }">
                    <el-tree-line
                        :node="node"
                        :showLabelLine="false"
                        @mouseenter="data.isShow = 1"
                        @mouseleave="data.isShow = 0"
                        @click="current = node.label"
                    >
                        <span class="custom-tree-node">
                            <span
                                :class="{
                                    'node-label': node.label == currentLabel,
                                }"
                                :title="node.label"
                            >
                                {{ node.label }}
                            </span>

                            <span
                                class="orgNav"
                                v-show="props.showEdit && data.isShow && data.id != '0' && data.id != ''"
                            >
                                <el-icon
                                    :size="18"
                                    @click="openOrgDialog(data, 2, 2)"
                                    v-if="data.id != 'notGroup' && data.id != 'allGroup'"
                                >
                                    <i-ep-edit-pen />
                                </el-icon>

                                <el-icon
                                    :size="18"
                                    @click="openDeleteDialog(data, node)"
                                    v-if="data.son === undefined || data.son === null"
                                >
                                    <i-ep-remove />
                                </el-icon>

                                <el-icon :size="18" @click="openOrgDialog(data, 1, 1)" v-if="data.level < 3">
                                    <i-ep-circle-plus />
                                </el-icon>
                            </span>
                        </span>
                    </el-tree-line>
                </template>
            </el-tree-select>
        </el-scrollbar>
    </div>
</template>

<style lang="scss" scoped></style>
