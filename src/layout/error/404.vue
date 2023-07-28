<script setup lang="ts">
import noExist from '@/assets/svg/404.svg?component'
import { useLayoutStoreHook } from '@/layout/store'
let { path, query } = useLayoutStoreHook().tagFirst || { path: '/', query: {} }
</script>

<template>
    <div class="justify-center">
        <noExist />

        <div class="text">
            <p class="font-medium">404</p>
            <p class="text-gray">抱歉，你访问的页面不存在</p>
            <el-button
                type="primary"
                @click="
                    $router.push({
                        path: path,
                        query: query,
                    })
                "
            >
                返回首页
            </el-button>
        </div>
    </div>
</template>
