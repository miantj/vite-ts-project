<script setup lang="ts">
import ElTreeLine from '@/components/SaTreeLine'
import { useGlobalStoreHook } from '@/store/modules/global'
import { ElTree } from 'element-plus'

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
    // 调整高度
    resizeHeight: {
        type: Number,
        default: 0,
    },
    // 设单高度
    height: {
        type: Number,
        default: 0,
    },
    // 允许层级，默认最多添加三层
    level: {
        type: Number,
        default: 3,
    },
    //是否启用缓存
    noCache: {
        type: Boolean,
        default: false,
    },
    //使用默认icon
    noIcon: {
        type: Boolean,
        default: false,
    },
    //开启插槽
    slot: {
        type: Boolean,
        default: false,
    },
    //开启虚拟化树形控件
    v2: {
        type: Boolean,
        default: false,
    },
})

let current = ref() //当前选中

const treeRef = ref<InstanceType<typeof ElTree>>()
let currentLabel = computed(() => {
    return current.value || props.defaultLabel
})

let clientHeight = computed(() => {
    let height
    height = props.height
    if (height == 0) {
        height = useGlobalStoreHook().clientHeight - props.resizeHeight - 228
    }
    return height
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

const setCheckedNodes = (data: any, checked: boolean) => {
    treeRef.value!.setCheckedNodes(data, checked)
}
const setCheckedKeys = (data: Array<string> = [], type: boolean) => {
    treeRef.value!.setCheckedKeys(data, type)
}
const currentChecked = (label: string, data: any) => {
    data.currentLabel = label
    current.value = data.id || label
}
const filter = (val: any) => {
    treeRef.value!.filter(val)
}

const ifV2 = (attrs: any) => {
    return attrs.data?.length >= 1000
}

onMounted(() => {})

defineExpose({
    setCheckedNodes, //设置勾选
    setCheckedKeys, //设置勾选
    filter,
})
</script>

<template>
    <div :style="{ height: clientHeight + 'px' }">
        <el-tree-v2
            v-if="ifV2($attrs) || props.v2"
            ref="treeRef"
            :class="{ 'icon-class': !props.noIcon }"
            :icon="props.noIcon ? '' : 'span'"
            :props="{
                children: 'son',
                label: 'name',
            }"
            @node-click="handleNodeClick"
            :item-size="34"
            :expand-on-click-node="false"
            :height="clientHeight"
            v-bind="$attrs"
        >
            <template #default="{ node, data }">
                <slot v-bind="{ node, data }" v-if="props.slot"></slot>
                <el-tree-line
                    v-else
                    :node="node"
                    :showLabelLine="false"
                    @mouseenter="data?.permission != 0 ? (data.isShow = 1) : ''"
                    @mouseleave="data.isShow = 0"
                    @click="currentChecked(node.label, data)"
                >
                    <span class="custom-tree-node">
                        <span
                            :class="{
                                'node-label': data.id == currentLabel || node.label == currentLabel,
                            }"
                            :title="node.label"
                        >
                            {{ node.label }}
                        </span>

                        <span class="orgNav" v-show="props.showEdit && data.isShow && data.id != '0' && data.id != ''">
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

                            <el-icon :size="18" @click="openOrgDialog(data, 1, 1)" v-if="data.level < props.level">
                                <i-ep-circle-plus />
                            </el-icon>
                        </span>
                    </span>
                </el-tree-line>
            </template>
        </el-tree-v2>
        <el-scrollbar v-else>
            <el-tree
                ref="treeRef"
                :class="{ 'icon-class': !props.noIcon }"
                :icon="props.noIcon ? '' : 'span'"
                :props="{
                    children: 'son',
                    label: 'name',
                }"
                @node-click="handleNodeClick"
                :expand-on-click-node="false"
                v-bind="$attrs"
            >
                <template #default="{ node, data }">
                    <slot v-bind="{ node, data }" v-if="props.slot"></slot>
                    <el-tree-line
                        v-else
                        :node="node"
                        :showLabelLine="false"
                        @mouseenter="data?.permission != 0 ? (data.isShow = 1) : ''"
                        @mouseleave="data.isShow = 0"
                        @click="currentChecked(node.label, data)"
                    >
                        <span class="custom-tree-node">
                            <span
                                :class="{
                                    'node-label': data.id == currentLabel || node.label == currentLabel,
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

                                <el-icon :size="18" @click="openOrgDialog(data, 1, 1)" v-if="data.level < props.level">
                                    <i-ep-circle-plus />
                                </el-icon>
                            </span>
                        </span>
                    </el-tree-line>
                </template>
            </el-tree>
        </el-scrollbar>
    </div>
</template>

<style lang="scss" scoped>
.tree {
    overflow-y: hidden;
    overflow-x: scroll;
}
.el-tree {
    min-width: 100%;
    display: inline-block !important;
    padding: 5px 12px;
    .node-label {
        border: 1px solid var(--el-color-primary) !important;
    }

    .orgNav {
        display: inline-block;
        margin: 0;
        line-height: initial;
        vertical-align: sub;
        .el-icon {
            margin-left: 5px;
        }
    }

    .el-button {
        padding: 0;
    }
}

.icon-class {
    :deep(.el-tree-node__expand-icon) {
        &.is-leaf {
            opacity: 0;
        }

        span {
            height: 12px;
            width: 12px;
            background-image: url('../../assets/icon/+.png');
        }
        &.expanded {
            transform: rotate(0deg);
            span {
                height: 12px;
                width: 12px;
                background-image: url('../../assets/icon/-.png');
            }
        }
    }
}

.el-tree-v2 {
}
</style>
