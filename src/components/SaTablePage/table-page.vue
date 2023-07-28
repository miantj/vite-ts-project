<script setup lang="ts">
import { useGlobalStoreHook } from '@/store/modules/global'
import { useLayoutStoreHook } from '@/layout/store'
import type { ElTable, FormInstance } from 'element-plus'

const props = defineProps({
    // 表单数据
    native: {
        type: Boolean,
        default: false,
    },
    // 表单数据
    data: {
        type: Array as unknown as any[],
        default: [],
    },
    // 表单标题
    tableColumn: {
        type: Array as unknown as any[],
        default: [],
    },
    // 分页数据
    pagination: {
        type: Object,
        default: {
            currentPage: 1, //当前页数
            total: 0, // 总条目数
            pageSize: 10, // 每页显示条目个数
            pageSizes: [10, 20, 30, 40], // 每页显示个数选择器的选项设置
            background: false, // 是否展示分页按钮背景色
        },
    },
    // 是否展示分页
    showPagination: {
        type: Boolean,
        default: true,
    },
    // 调整表单高度
    resizeHeight: {
        type: Number,
        default: 0,
    },
    // 设置表单高度
    height: {
        type: Number,
        default: 0,
    },
    // 设置已选择描述
    selectionText: {
        type: String,
        default: '项数据',
    },
    // 是否开启选中背景色，不兼容stripe斑马线样式
    selectionBg: {
        type: Boolean,
        default: false,
    },
    // 是否开启编辑功能
    rowEdit: {
        type: Boolean,
        default: false,
    },
    // 是否开启单行显示
    tooltip: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits(['selectionChange', 'sizeChange', 'currentChange', 'rowEdit'])

const sum = ref(0)
const selectionArr = ref()
const editRow = ref()

// 表单数据与校验
const tableRuleFormRef = ref<FormInstance>()
const formData = ref()
let formRules = {} as any

for (let index = 0; index < props.tableColumn.length; index++) {
    const element = props.tableColumn[index]
    if (element?.rules) {
        formRules[element?.prop] = toRaw(element.rules)
    }
}

const clientHeight = computed(() => {
    let height
    height = props.height
    if (height == 0) {
        height = useGlobalStoreHook().clientHeight - props.resizeHeight - (props.showPagination ? 249 : 194)
    }
    return height
})

const handleSelectionChange = (val: any) => {
    selectionArr.value = val
    sum.value = val.length

    emit('selectionChange', val)
}

const handleSizeChange = (val: number) => {
    console.warn(val)

    emit('sizeChange', val)
}

const handleCurrentChange = (val: number) => {
    console.warn(val)
    emit('currentChange', val)
}

const tableRowClassName = ({ row, rowIndex }: { row: any; rowIndex: number }) => {
    if (props.selectionBg && selectionArr.value?.includes(row)) {
        return 'success-row'
    }
    return ''
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()

const toggleRowSelection = (row: any, type: boolean): any => {
    multipleTableRef.value?.toggleRowSelection(row, type)
}

async function handleRowClick(row: any, column: any, event: any) {
    let vali = true
    if (props.rowEdit) {
        if (editRow.value?.row !== row) {
            if (editRow.value?.row) {
                // 检验表单
                vali = (await validate()) as any
            }

            if (vali) {
                if (editRow.value?.row && editRow.value?.row?.edit) {
                    editRow.value.row.edit = false
                    emit('rowEdit', editRow.value)
                    editRow.value = null
                }

                editRow.value = { row, column, event }
                formData.value = editRow.value?.row

                row.edit = true
            }
        }
    }
}

async function closeEditRow(e: any) {
    if (props.rowEdit && editRow.value) {
        let row: any = null
        for (let index = 0; index < editRow.value?.event?.path.length; index++) {
            const element = editRow.value?.event?.path[index]
            if (element.className?.includes('el-table__row')) {
                row = element
            }
        }

        if (!row?.contains(e.target)) {
            // 检验表单
            let vali = (await validate()) as any
            if (vali && editRow.value?.row?.edit) {
                emit('rowEdit', editRow.value)
                editRow.value.row.edit = false
                editRow.value = null
            }
        }
    }
}

async function saveAll() {
    for (let index = 0; index < props.data.length; index++) {
        const element = props.data[index]
        // 编辑状态列表进行检验
        if (element.edit) {
            formData.value = element
            let vali = (await validate()) as any
            if (vali) {
                element.edit = false
            }
        }
    }
}

const validate = () => {
    const formEl = tableRuleFormRef.value

    return new Promise<void>((resolve, reject) => {
        nextTick(() => {
            if (formEl) {
                formEl.validate((valid: any, fields: any) => {
                    if (valid) {
                        resolve(valid)
                    } else {
                        const obj = Object.keys(fields)
                        formEl?.scrollToField(obj[0])
                    }
                })
            }
        })
    })
}

defineExpose({
    toggleRowSelection, //设置是否选中状态
    validate, //校验表单
    saveAll, //保持全部列表
})

onMounted(() => {
    nextTick(() => {
        document.addEventListener('click', closeEditRow)
    })
})
onActivated(() => {
    nextTick(() => {
        document.addEventListener('click', closeEditRow)
    })
})

// 移除绑定的closeEditRow事件监听
onBeforeUnmount(() => {
    document.removeEventListener('click', closeEditRow)
})
onDeactivated(() => {
    document.removeEventListener('click', closeEditRow)
})
</script>

<template>
    <div class="sa-table-page">
        <el-form ref="tableRuleFormRef" :model="formData" :inline="true">
            <el-table
                ref="multipleTableRef"
                :data="props.data"
                :height="clientHeight"
                :header-cell-style="{ background: 'var(--sa-table-header-color)', color: '#333' }"
                :row-class-name="tableRowClassName"
                @selection-change="handleSelectionChange"
                @row-click="handleRowClick"
                v-bind="$attrs"
            >
                <slot v-if="props.native"></slot>
                <template v-else>
                    <template v-for="item in props.tableColumn" :key="item.prop">
                        <slot v-if="item.init"></slot>
                        <el-table-column
                            v-else
                            :prop="item.prop"
                            :label="item.label"
                            :type="item?.type"
                            :sortable="item?.sortable"
                            :selectable="item?.selectable"
                            :fixed="item?.fixed"
                            :width="item?.width"
                            :min-width="item?.minWidth"
                            :show-overflow-tooltip="props.tooltip && !item?.noTooltip"
                            :align="item?.align ? item?.align : 'center'"
                        >
                            <template v-if="item?.slot" #default="scope">
                                <slot v-if="!scope.row.edit" :name="item.prop" v-bind="scope"></slot>

                                <el-form-item v-if="scope.row.edit" :prop="item.prop" :rules="item.rules">
                                    <slot :name="item.prop" v-bind="scope"></slot>
                                </el-form-item>
                            </template>

                            <template v-else-if="item.type !== 'selection'" #default="scope">
                                <span v-show="!scope.row.edit">
                                    {{ scope.row[item.prop] ? scope.row[item.prop] : item.empty ? item.empty : '-' }}
                                </span>
                                <el-form-item v-if="scope.row.edit" :prop="item.prop" :rules="item.rules">
                                    <el-input type="text" v-model="scope.row[item.prop]" />
                                </el-form-item>
                            </template>
                        </el-table-column>
                    </template>
                </template>
            </el-table>
        </el-form>

        <div v-if="props.showPagination" class="demo-pagination-block">
            <div class="selection">
                <span v-show="props.tableColumn[0].type == 'selection'">
                    已选择 {{ sum }} {{ props.selectionText }}
                </span>
            </div>
            <div class="pagination">
                <el-pagination
                    v-model:currentPage="props.pagination.currentPage"
                    ref="paginationRef"
                    v-model:page-size="props.pagination.pageSize"
                    :page-sizes="props.pagination.pageSizes"
                    :background="props.pagination.background"
                    layout="total, prev, pager, next, sizes, jumper"
                    :total="props.pagination.total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.sa-table-page {
    background: #fff;

    :deep(.el-table) {
        margin: 10px 0;
        .success-row {
            background-color: #f5f7fa !important;
        }

        .cell {
            .el-button + .el-button {
                margin-left: 0;
            }
        }
    }

    .demo-pagination-block {
        .selection {
            width: 20%;
            line-height: 36px;
            display: inline-block;
            vertical-align: bottom;
        }
        .pagination {
            width: 80%;
            height: 36px;
            display: inline-block;
            .el-pagination {
                display: flex;
                justify-content: flex-end;
            }
        }
    }
}
</style>
