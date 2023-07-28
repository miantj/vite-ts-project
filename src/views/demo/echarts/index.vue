<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { email } from '@/utils'

import RePie from './Pie.vue'
import ReBar from './Bar.vue'
import ReLine from './Line.vue'
import SaTagsInput from '@/components/SaTagsInput/index.vue'

/**
 *
 * tagsInput组件
 *
 **/
const tagsDate = reactive({
    tagsArr: ['123456@qq.com', '234567@qq.com'],
})

const close = (e: any, index: number) => {
    tagsDate.tagsArr.splice(index, 1)
}

const inputConfirm = (e: string, callback: any) => {
    if (email(e)) {
        tagsDate.tagsArr.push(e as never)
        callback('')
    } else {
        ElMessage({
            message: '请填写正确的邮箱地址！',
            type: 'error',
        })
    }
}
</script>

<template>
    <div>
        <el-card>
            <template #header>
                <div class="card-header">
                    <span class="font-medium">tagsInput</span>
                </div>
            </template>

            <el-row :gutter="24">
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                    <el-card>
                        <template #header>
                            <div class="card-header">
                                <span class="font-medium">tagsInput组件【fixed类型展示】</span>
                            </div>
                        </template>
                        <div>
                            <SaTagsInput
                                :data="tagsDate.tagsArr"
                                placeholder="请输入邮箱地址,按enter键确认"
                                @close="close"
                                @inputConfirm="inputConfirm"
                            />
                        </div>
                    </el-card>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                    <el-card>
                        <template #header>
                            <div class="card-header">
                                <span class="font-medium">tagsInput组件【inline类型展示】</span>
                            </div>
                        </template>
                        <div>
                            <SaTagsInput
                                :data="tagsDate.tagsArr"
                                placeholder="请输入邮箱地址,按enter键确认"
                                type="inline"
                                @close="close"
                                @inputConfirm="inputConfirm"
                            />
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
        <el-divider />
        <el-card>
            <template #header>
                <div class="card-header">
                    <span class="font-medium">echarts</span>
                </div>
            </template>

            <el-row :gutter="24">
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                    <el-card>
                        <template #header>
                            <div class="card-header">
                                <span class="font-medium">饼图信息</span>
                            </div>
                        </template>
                        <div>
                            <RePie />
                        </div>
                    </el-card>
                </el-col>

                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                    <el-card>
                        <template #header>
                            <div class="card-header">
                                <span class="font-medium">柱状图信息</span>
                            </div>
                        </template>
                        <div>
                            <ReBar />
                        </div>
                    </el-card>
                </el-col>

                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                    <el-card>
                        <template #header>
                            <div class="card-header">
                                <span class="font-medium">折线图信息</span>
                            </div>
                        </template>
                        <div>
                            <ReLine />
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>
<style lang="scss" scoped></style>
