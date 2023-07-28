<script setup lang="ts">
import Amitt from './Amitt.vue'
import Bmitt from './Bmitt.vue'

onMounted(() => {})
</script>

<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span class="font-medium"> mitt事件总线使用 </span>
            </div>
        </template>
        <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span class="font-medium"> Amitt组件 </span>
                        </div>
                    </template>
                    <Amitt />
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span class="font-medium"> Bmitt组件 </span>
                        </div>
                    </template>
                    <Bmitt />
                </el-card>
            </el-col>
        </el-row>
    </el-card>
</template>

<style lang="scss" scoped></style>
