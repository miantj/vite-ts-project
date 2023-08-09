<script setup lang="ts">
onMounted(async () => {})
</script>
<template>
    <div class="main">
        <el-button type="primary" @click="$router.push('/civilCode')">民法典大冲关</el-button>
        <el-button type="primary" @click="$router.push('/campusBullying')">防范校园欺凌</el-button>
        <el-button type="primary" @click="$router.push('/constitution')">宪法知识大冲关</el-button>
    </div>
</template>
<style lang="scss" scoped>
.main {
    position: relative;
    width: 100%;
    height: 100%;
    background: url('../../public/bg.jpg') no-repeat;
    background-size: 100% 100%;
    font-family: 'Microsoft Yahei';
    font-weight: 500;
    margin: auto;
    overflow: hidden;
    text-align: center;
    padding-top: 20%;
}
</style>
