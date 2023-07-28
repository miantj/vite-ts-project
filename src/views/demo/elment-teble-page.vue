<script setup lang="ts">
const tableData = ref()
const tableColumn = ref()
const pagination = ref()

const handleClick = (data: any) => {
    console.log('click', data)
}

const handleSelectionChange = (val: any) => {
    console.warn(val)
}

const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}

const handleEditRow = ({ row, column, event }: any) => {
    console.log(row)
}

const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}

tableColumn.value = [
    {
        type: 'selection',
        width: 50,
        align: 'center',
        selectable: (row: any) => {
            return row.status != 0
        },
    },
    {
        prop: 'date',
        label: 'Date',
        sortable: true,
        width: 180,
        rules: [{ required: true, message: 'data必填项不能为空', trigger: 'blur' }],
    },
    {
        prop: 'name',
        label: 'Name',
        slot: true,
        rules: [{ required: true, message: 'name必填项不能为空', trigger: 'blur' }],
    },
    {
        prop: 'address',
        label: 'Address',
        minWidth: 180,
    },
    {
        prop: 'edit',
        label: '编辑',
        width: 160,
        slot: true,
        fixed: 'right',
    },
]

onMounted(() => {
    setTimeout(() => {
        tableData.value = [
            {
                date: '2016-05-03',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                status: 0,
            },
            {
                date: '2016-05-02',
                name: 'Tom',
                address:
                    'No. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los AngelesNo. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-04',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                status: 0,
            },
            {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-04',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-04',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
        ]

        pagination.value = {
            currentPage: 1, //当前页数
            total: 11, // 总条目数
            pageSize: 10, // 每页显示条目个数
        }
    }, 1000)
})
</script>

<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span class="font-medium">扩展elemenet-table的表单动态编辑</span>
            </div>
        </template>
        <sa-table-page
            stripe
            :data="tableData"
            :tableColumn="tableColumn"
            :pagination="pagination"
            :rowEdit="true"
            :resizeHeight="84"
            @selection-change="handleSelectionChange"
            @size-change="handleSizeChange"
            @row-edit="handleEditRow"
            @current-change="handleCurrentChange"
        >
            <template #name="scope">
                <el-tag v-show="!scope.row.edit">{{ scope.row.name }}</el-tag>

                <!-- 失去焦点时更改"edit"属性，显示文本 -->
                <el-input v-show="scope.row.edit" type="text" v-model="scope.row.name" />
            </template>

            <template #edit="scope">
                <div class="edit-color">
                    <span @click="handleClick(scope)">编辑</span>
                    <span>修改</span>
                </div>
            </template>
        </sa-table-page>
    </el-card>
</template>

<style lang="scss" scoped></style>
