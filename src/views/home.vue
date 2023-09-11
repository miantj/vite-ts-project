<script setup lang="ts">
onMounted(async () => {})
</script>
<template>
    <div class="main">
        <div class="title">
            <span>学法闯关智多星</span>
        </div>
        <p><span @click="$router.push('/civilCode')">民法典大冲关</span></p>
        <p><span @click="$router.push('/campusBullying')">防范校园欺凌</span></p>
        <p><span @click="$router.push('/constitution')">宪法知识大冲关</span></p>

        <div class="bottom" style="text-align: left; padding: 40px 36%">
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
    background: url('@/assets/img/home.jpg') no-repeat;
    background-size: 100% 100%;
    font-family: 'Microsoft Yahei';
    font-weight: 500;
    margin: auto;
    overflow: hidden;
    text-align: center;
    padding-top: 11%;
    .title {
        font-size: 4vw;
        margin-bottom: 20px;
        span {
            border-radius: 10px;
            background: #111;
            color: #fff;
            padding: 5px 20px;
        }
    }
    p {
        margin: 5px;
        padding: 20px;
        span {
            font-size: 34px;
            color: #57a9f7;
            cursor: pointer;
        }
    }
    .bottom {
        div {
            font-size: 26px;
        }
    }
}
</style>
