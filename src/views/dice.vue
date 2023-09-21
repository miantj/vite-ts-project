<script setup lang="ts">
const emit = defineEmits(['startEnd', 'startChange'])

const props = defineProps({
    start: {
        type: Boolean,
        default: true,
    },
})

const dicData = reactive({
    loseNumber: 1,
} as any)

const startRun = () => {
    if (!props.start) return
    emit('startChange')
    const box = document.querySelector('.dice-box') as any
    box.style.animation = `rotate 0.1s linear infinite`
    setTimeout(() => {
        dicData.loseNumber = Math.round(Math.random() * 5 + 1)
        console.warn(dicData.loseNumber)

        switch (dicData.loseNumber) {
            case 2:
                box.style.transform = `rotateY(80deg) rotateX(150deg) rotateZ(340deg)`
                break
            case 3:
                box.style.transform = `rotateY(290deg) rotateX(135deg) rotateZ(300deg)`
                break
            case 4:
                box.style.transform = `rotateY(115deg) rotateX(50deg) rotateZ(300deg)`
                break
            case 5:
                box.style.transform = `rotateY(290deg) rotateX(150deg) rotateZ(30deg)`
                break
            case 6:
                box.style.transform = `rotateY(0deg) rotateX(200deg) rotateZ(320deg)`
                break

            default:
                box.style.transform = `rotateY(185deg) rotateX(160deg) rotateZ(315deg)`
                break
        }
        box.style.animation = 'none'

        // emit('startEnd',18)
        emit('startEnd', dicData.loseNumber)
    }, 1000)
}
onMounted(async () => {})
</script>
<template>
    <div class="dice" @click="startRun">
        <div class="dice-box">
            <div class="dice first-face">
                <span class="dot"></span>
            </div>
            <div class="dice second-face">
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
            <div class="dice third-face">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
            <div class="dice fourth-face">
                <div class="column">
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
                <div class="column">
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            </div>
            <div class="dice fifth-face">
                <div class="column">
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
                <div class="column">
                    <span class="dot"></span>
                </div>
                <div class="column">
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            </div>
            <div class="dice sixth-face">
                <div class="column">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
                <div class="column">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.dice {
    width: 100px;
    display: inline-block;
    cursor: pointer;
    .dice-box {
        margin: 50px auto;
        width: 50px;
        height: 50px;
        position: relative;
        transform-style: preserve-3d;
        transform: rotateY(185deg) rotateX(160deg) rotateZ(315deg);
        animation: none;
    }
    .dice {
        width: 50px;
        height: 50px;
        padding: 8px;
        box-sizing: border-box;
        opacity: 1;
        background-color: #fff;
        border-radius: 10%;
        position: absolute;
        border: 1px solid;
    }

    .dot {
        display: inline-block;
        width: 10px;
        height: 10px;
        background-color: #111;
        border-radius: 50%;
    }

    /* 第一个面的点水平垂直居中 */
    .first-face {
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateZ(25px);
    }

    /* 放置在flex容器的开头和结尾 */
    .second-face {
        display: flex;
        justify-content: space-between;
        transform: translateX(-25px) rotateY(90deg);
    }
    /* item对齐到flex容器的末尾 */
    .second-face .dot:nth-of-type(2) {
        align-self: flex-end;
    }

    .third-face {
        display: flex;
        justify-content: space-between;
        transform: translateY(25px) rotateX(90deg);
    }
    /* item对齐到flex容器的中间 */
    .third-face .dot:nth-of-type(2) {
        align-self: center;
    }
    /* item对齐到flex容器的末尾 */
    .third-face .dot:nth-of-type(3) {
        align-self: flex-end;
    }

    .fourth-face {
        display: flex;
        justify-content: space-between;
        transform: translateY(-25px) rotateX(90deg);
    }
    .fourth-face .column {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .fifth-face {
        display: flex;
        justify-content: space-between;
        transform: translateX(25px) rotateY(90deg);
    }
    .fifth-face .column {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .fifth-face .column:nth-of-type(2) {
        justify-content: center;
    }

    .sixth-face {
        display: flex;
        justify-content: space-between;
        transform: translateZ(-25px);
    }
    .sixth-face .column {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    @keyframes rotate {
        from {
            transform: rotateY(0) rotateX(45deg) rotateZ(45deg);
        }
        to {
            transform: rotateY(360deg) rotateX(45deg) rotateZ(45deg);
        }
    }
}
</style>
