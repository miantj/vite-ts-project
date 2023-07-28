<script setup lang="ts">
import noAccess from '@/assets/svg/403.svg?component' 
</script>

<template>
    <div class="justify-center">
        <noAccess />

        <div class="text">
            <p class="font-medium">403</p>
            <p class="text-gray">抱歉，你无权访问该页面</p>
            <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
        </div>
    </div>
</template>
