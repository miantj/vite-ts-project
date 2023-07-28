<script setup lang="ts">
import { emitter } from '@/utils/mitt'

const count = ref(0)
const add = () => {
    emitter.emit('mittCountB')
}

// 接受来自A页面的事件
emitter.on('mittCountA', () => {
    count.value++
})
</script>

<template>
    <div>
        <div>Bmitt：{{ count }}</div>

        <el-button @click="add">新增 </el-button>
    </div>
</template>

<style lang="scss" scoped></style>
