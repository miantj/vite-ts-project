<template>
    <div class="justify-center">
        <noServer />

        <div class="text">
            <p class="font-medium">500</p>
            <p class="text-gray">抱歉，服务器出错了</p>
            <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import noServer from '@/assets/status/500.svg'
</script>
