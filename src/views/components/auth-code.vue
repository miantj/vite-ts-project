<script setup lang="ts">
import SaPasswordInput from '@/components/SaPasswordInput/index.vue'

const code = ref()
const reverse = (data: any) => {
    console.warn(data)

    code.value = data
}
</script>

<template>
    <el-card>
        <template #header>
            <div class="card-header">
                <span class="font-medium">输入授权码或验证码</span>
            </div>
        </template>

        <el-row :gutter="24">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                <el-card>
                    <template #header>
                        <div class="card-header">
                            <span class="font-medium">授权码组件</span>
                        </div>
                    </template>
                    返回数据： {{ code }}
                    <SaPasswordInput :mask="false" :length="8" @reverse="reverse" />
                </el-card>
            </el-col>
        </el-row>
    </el-card>
</template>
<style lang="scss" scoped></style>
