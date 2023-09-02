<script setup lang="ts">
onMounted(async () => {})
</script>
<template>
    <div class="main">
        <el-button type="primary" size="large" @click="$router.push('/civilCode')">民法典大冲关</el-button>
        <el-button type="primary" size="large" @click="$router.push('/campusBullying')">防范校园欺凌</el-button>
        <el-button type="primary" size="large" @click="$router.push('/constitution')">宪法知识大冲关</el-button>

        <div style="text-align: left; padding: 40px 38%">
            <div>监制单位：广州市白云区司法局龙归司法所</div>
            <div>制作人：明天健</div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.main {
    position: relative;
    width: 100%;
    height: 100%;
    background: url('@/assets/bg.jpg') no-repeat;
    background-size: 100% 100%;
    font-family: 'Microsoft Yahei';
    font-weight: 500;
    margin: auto;
    overflow: hidden;
    text-align: center;
    padding-top: 20%;
}
</style>
