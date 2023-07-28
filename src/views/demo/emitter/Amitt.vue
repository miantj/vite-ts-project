<script setup lang="ts">
import { emitter } from '@/utils/mitt'

const count = ref(0)
const add = () => {
    emitter.emit('mittCountA')
}

// 接受来自B页面的事件
emitter.on('mittCountB', () => {
    count.value++
})
onMounted(() => {})
</script>

<template>
    <div>
        <div>Amitt：{{ count }}</div>

        <el-button @click="add">新增 </el-button>
    </div>
</template>

<style lang="scss" scoped></style>
