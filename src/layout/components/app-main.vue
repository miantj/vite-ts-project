<template>
    <main class="app-main">
        <el-input v-model="input" placeholder="Please input" />
        <el-rate v-model="value1"></el-rate>
        <el-time-picker v-model="value2" placeholder="Arbitrary time"> </el-time-picker>

        <!-- <router-view /> -->
    </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
const value1 = ref(null)
const value2 = ref()
</script>

<style scoped>
.app-main {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow-x: hidden;
}

.app-main-nofixed-header {
    width: 100%;
    min-height: 100vh;
    position: relative;
}

.main-content {
    margin: 24px;
}
</style>
