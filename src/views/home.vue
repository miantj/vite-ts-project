<script setup lang="ts">
import { useGlobalStoreHook } from '@/store/modules/global'
const aud = ref(useGlobalStoreHook().audioSwitch || false)

const audioChange = () => {
    const audioRef = document.getElementById('audioRef') as any
    if (aud.value) {
        audioRef.play()
    } else {
        audioRef.pause()
    }
    useGlobalStoreHook().audioSwitch = aud.value
}
</script>
<template>
    <div class="main">
        <div class="audio">
            <el-switch v-model="aud" @change="audioChange" />
        </div>
        <div class="title">
            <span>学法冲关智多星</span>
        </div>
        <p>
            <span @click="$router.push('/civilCode')" style="color: #67c23a">民法典大冲关</span>
        </p>
        <p><span @click="$router.push('/campusBullying')" style="color: #e77510">防范校园欺凌</span></p>
        <p><span @click="$router.push('/constitution')" style="color: #e9ae21">宪法知识大冲关</span></p>

        <div class="bottom" style="text-align: left; padding-left: 32%; padding-top: 40px">
            <div>监制单位：广州市白云区司法局龙归司法所</div>
            <div>开发制作：明天健</div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.main {
    position: relative;
    width: 100%;
    height: 100%;
    background: url('@/assets/img/home2.jpg') no-repeat;
    background-size: 100% 100%;
    font-family: 'Microsoft Yahei';
    font-weight: 500;
    margin: auto;
    overflow: hidden;
    text-align: center;
    padding-top: 8%;
    .title {
        font-size: 4.2vw;
        margin-bottom: 20px;

        span {
            border-radius: 10px;
            color: #57a9f7;
            padding: 5px 20px;
            font-weight: bold;
        }
    }
    p {
        margin: 5px;
        padding: 12px;
        span {
            font-size: 2.4vw;
            color: #57a9f7;
            cursor: pointer;
            font-weight: bold;
        }
    }
    .bottom {
        div {
            font-size: 26px;
            font-size: 2vw;
            font-weight: bold;
            color: #29d;
        }
    }
    .audio {
        position: absolute;
        top: 60px;
        left: 60px;
        z-index: 99;
    }
}
</style>
