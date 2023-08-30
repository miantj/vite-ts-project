<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'

import Dice from './dice.vue'
import { fa } from 'element-plus/es/locale'

let horizontal = 8 //横
let vertical = 6 //竖
const gridData = reactive({
    pace: 1,
    total: 0,
    width: 137,
    dialogVisible: false,
    container: null,
    text: '',
    answer: '',
    showAnswer: false,
} as any)

const startEnd = (data: number) => {
    console.warn('结果', data)
    const active = document.querySelector('.active') as any
    let stop = 1
    const time = setInterval(() => {
        if (stop >= data) {
            const text = gridData.container[gridData.pace + 1].getElementsByTagName('div')[0]
            const answer = gridData.container[gridData.pace + 1].getElementsByTagName('div')[1]
            console.warn(answer)
            gridData.answer = ''
            if (text) gridData.text = text.innerHTML
            if (answer) gridData.answer = answer.innerHTML

            setTimeout(() => {
                gridData.dialogVisible = true
            }, 1000)
            clearInterval(time)
        }
        stop++

        if (gridData.pace <= gridData.total - 1) {
            ;[active.style.left, active.style.top] = direction(++gridData.pace)
            if (gridData.pace > gridData.total - 1) {
                setTimeout(() => {
                    ElMessageBox.alert('恭喜你到达终点了！', '提示', {
                        confirmButtonText: '重新开始',
                        callback: (action: any) => {
                            gridData.pace = 1
                            active.style.top = '685px'
                            active.style.left = '150px'
                        },
                    })
                }, 600)
                clearInterval(time)
            }
        }
    }, 1000)
}

const direction = (index: number) => {
    let left = 0,
        top = 0
    if (index < horizontal) {
        left = index == 0 ? 0 : index * gridData.width
        top = 685
    } else {
        const row = vertical - index

        if (0 <= vertical + row) {
            left = (horizontal - 1) * gridData.width
            top = (vertical + row) * gridData.width
        } else {
            const row2 = horizontal * 2 + vertical - 3
            if (index > row2) {
                const row3 = horizontal * 2 + vertical
                if (index > row3) {
                    left = (index - row3) * gridData.width
                    top = (vertical - 3) * gridData.width
                    if (index == gridData.total) {
                        top = top - 177
                        left = left - 137
                    }
                } else {
                    left = 0
                    top = (index - row2) * gridData.width
                }
            } else {
                left = (vertical + horizontal + (horizontal - 3) - index) * gridData.width
                top = 0
            }
        }
    }
    return [left + 'px', top + 'px']
}

// 初始化地图
const init = () => {
    gridData.container = document.querySelectorAll('.grid-item') as any

    gridData.total = gridData.container.length - 1
    gridData.container.forEach((box: any, index: number) => {
        // box.textContent = String(index)
        ;[box.style.left, box.style.top] = direction(index)
    })
}

const dialogClose = () => {
    gridData.showAnswer = false
    if (gridData.text.includes('前进3步')) startEnd(3)

    if (gridData.text.includes('后退3格')) {
        gridData.pace = gridData.pace - 4
        startEnd(1)
    }
}
onMounted(async () => {
    init()
})
</script>
<template>
    <div class="main">
        <div class="grid">
            <div class="active"></div>
            <div class="grid-item grid-start" style="background: #ffff33">
                <p></p>
                <p class="text">
                    起点
                    <br />
                    start
                </p>
                <el-icon :size="70" style="margin-left: 120px">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                        <path
                            fill="#ff6242"
                            d="m14.05 26.58l5.67-7a19.55 19.55 0 0 0-8.5-.24c-3.12.77-3.61 6.66-3.66 9.45a.87.87 0 0 0 1.31.77Z"
                        />
                        <path
                            fill="#ff866e"
                            d="M11.24 22a18.17 18.17 0 0 1 6.62-.13l1.86-2.28a19.55 19.55 0 0 0-8.5-.24c-3.12.76-3.61 6.65-3.66 9.44a.85.85 0 0 0 .14.48c.3-2.94 1.09-6.66 3.54-7.27Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m14.05 26.58l5.67-7a19.55 19.55 0 0 0-8.5-.24c-3.12.77-3.61 6.66-3.66 9.45a.87.87 0 0 0 1.31.77Z"
                        />
                        <path
                            fill="#ff6242"
                            d="m20.86 33.4l7-5.67a19.52 19.52 0 0 1 .24 8.49c-.73 3.12-6.58 3.61-9.41 3.66a.87.87 0 0 1-.77-1.31Z"
                        />
                        <path
                            fill="#ff866e"
                            d="M25.41 36.21a18 18 0 0 0 .13-6.63l2.28-1.85a19.52 19.52 0 0 1 .24 8.49c-.73 3.12-6.58 3.61-9.41 3.66a.87.87 0 0 1-.48-.14c2.94-.26 6.66-1.09 7.24-3.53Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m20.86 33.4l7-5.67a19.52 19.52 0 0 1 .24 8.49c-.73 3.12-6.58 3.61-9.41 3.66a.87.87 0 0 1-.77-1.31Z"
                        />
                        <path
                            fill="#e8f4fa"
                            d="M39.48 21.56c5.42-5.7 3.71-12.73 2.86-15.2a2 2 0 0 0-.48-.78a2.13 2.13 0 0 0-.77-.48c-2.47-.85-9.51-2.56-15.21 2.9C18.84 14.66 14 26.5 14 26.5l7 7s11.78-4.9 18.48-11.94Z"
                        />
                        <path
                            fill="#fff"
                            d="M28.05 11.87c5.53-5.27 12.31-3.8 15-2.94a17.29 17.29 0 0 0-.66-2.57a2 2 0 0 0-1.3-1.26c-2.47-.85-9.51-2.56-15.21 2.9C18.84 14.66 14 26.5 14 26.5l2.69 2.69c1.43-3.19 5.68-11.92 11.36-17.32Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M39.48 21.56c5.42-5.7 3.71-12.73 2.86-15.2a2 2 0 0 0-.48-.78a2.13 2.13 0 0 0-.77-.48c-2.47-.85-9.51-2.56-15.21 2.9C18.84 14.66 14 26.5 14 26.5l7 7s11.78-4.9 18.48-11.94Z"
                        />
                        <path fill="#45413c" d="M18.22 44.21a10 1.5 0 1 0 20 0a10 1.5 0 1 0-20 0Z" opacity=".15" />
                        <path
                            fill="#ff6242"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M22.7 25.65a.68.68 0 0 0-.92-.93a22.13 22.13 0 0 0-5.31 3.8a17.84 17.84 0 0 0-3.87 5.86a.34.34 0 0 0 .44.45A17.84 17.84 0 0 0 18.9 31a21.91 21.91 0 0 0 3.8-5.35Z"
                        />
                        <path
                            fill="#c0dceb"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M28.24 13.72a5.49 5.49 0 1 0 10.98 0a5.49 5.49 0 1 0-10.98 0Z"
                        />
                        <path fill="#00b8f0" d="M29.96 13.69a3.8 3.8 0 1 0 7.6 0a3.8 3.8 0 1 0-7.6 0Z" />
                        <path
                            fill="#4acfff"
                            d="M31.07 11a3.8 3.8 0 0 0 0 5.38a3.94 3.94 0 0 0 .85.62l3.55-6.69a3.77 3.77 0 0 0-4.4.69Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M29.96 13.69a3.8 3.8 0 1 0 7.6 0a3.8 3.8 0 1 0-7.6 0Z"
                        />
                        <path
                            fill="#ff8a14"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11.34 41.47c-.7.7-5.16 2.21-7.42 2.94c-.42.14-1-.47-.89-.89c.73-2.25 2.24-6.71 3-7.42c.95-1 3.43-1 4.91.46s1.35 3.96.4 4.91Z"
                        />
                        <path
                            fill="#ffe500"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M10.13 39.79c-.5.49-2.57 1-3 .56s.07-2.54.57-3a1.57 1.57 0 0 1 2.13.34a1.56 1.56 0 0 1 .3 2.1Z"
                        />
                        <path
                            fill="#ffe500"
                            d="m43.32 23.69l.8 1.51a.42.42 0 0 0 .32.22l1.69.2a.42.42 0 0 1 .25.71l-1.19 1.22a.39.39 0 0 0-.11.37l.33 1.67a.42.42 0 0 1-.59.46l-1.53-.76a.44.44 0 0 0-.39 0l-1.49.84a.43.43 0 0 1-.62-.43L41 28a.41.41 0 0 0-.13-.36l-1.21-1.14a.42.42 0 0 1 .21-.72l1.68-.29a.41.41 0 0 0 .31-.23l.72-1.55a.41.41 0 0 1 .74-.02Z"
                        />
                        <path
                            fill="#fff48c"
                            d="m40.53 27.31l1.06-.19a.4.4 0 0 0 .31-.23l.72-1.55a.42.42 0 0 1 .75 0l.79 1.51a.42.42 0 0 0 .32.22l1.07.13l.83-.85a.42.42 0 0 0-.25-.71l-1.69-.2a.42.42 0 0 1-.32-.22l-.8-1.51a.41.41 0 0 0-.74 0l-.72 1.55a.41.41 0 0 1-.31.23l-1.68.29a.42.42 0 0 0-.21.72Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m43.32 23.69l.8 1.51a.42.42 0 0 0 .32.22l1.69.2a.42.42 0 0 1 .25.71l-1.19 1.22a.39.39 0 0 0-.11.37l.33 1.67a.42.42 0 0 1-.59.46l-1.53-.76a.44.44 0 0 0-.39 0l-1.49.84a.43.43 0 0 1-.62-.43L41 28a.41.41 0 0 0-.13-.36l-1.21-1.14a.42.42 0 0 1 .21-.72l1.68-.29a.41.41 0 0 0 .31-.23l.72-1.55a.41.41 0 0 1 .74-.02Z"
                        />
                        <path
                            fill="#ffe500"
                            d="m31.74 40.59l.26 1.35a.35.35 0 0 0 .2.24l1.27.54a.34.34 0 0 1 0 .6l-1.2.68a.32.32 0 0 0-.17.26l-.1 1.37a.34.34 0 0 1-.57.22l-1-.93a.3.3 0 0 0-.3-.08l-1.34.3a.34.34 0 0 1-.38-.47l.59-1.25a.31.31 0 0 0 0-.31l-.7-1.18a.34.34 0 0 1 .33-.51l1.36.16a.38.38 0 0 0 .3-.11l.9-1a.34.34 0 0 1 .55.12Z"
                        />
                        <path
                            fill="#fff48c"
                            d="m28.76 42.75l.86.1a.35.35 0 0 0 .3-.11l.9-1a.34.34 0 0 1 .59.15l.27 1.35a.31.31 0 0 0 .19.24l.8.34l.84-.47a.34.34 0 0 0 0-.6l-1.27-.54a.35.35 0 0 1-.2-.24l-.27-1.35a.34.34 0 0 0-.58-.16l-.9 1a.38.38 0 0 1-.3.11l-1.36-.16a.34.34 0 0 0-.33.51Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m31.74 40.59l.26 1.35a.35.35 0 0 0 .2.24l1.27.54a.34.34 0 0 1 0 .6l-1.2.68a.32.32 0 0 0-.17.26l-.1 1.37a.34.34 0 0 1-.57.22l-1-.93a.3.3 0 0 0-.3-.08l-1.34.3a.34.34 0 0 1-.38-.47l.59-1.25a.31.31 0 0 0 0-.31l-.7-1.18a.34.34 0 0 1 .33-.51l1.36.16a.38.38 0 0 0 .3-.11l.9-1a.34.34 0 0 1 .55.12Z"
                        />
                        <path fill="#9ceb60" d="M11.86 7a3.06 3.06 0 1 1-2.59-3.44A3.06 3.06 0 0 1 11.86 7Z" />
                        <path
                            fill="#c8ffa1"
                            d="M9.27 5.74a3.06 3.06 0 0 1 2.41 2a2.87 2.87 0 0 0 .18-.74a3.06 3.06 0 0 0-6.06-.85A3.23 3.23 0 0 0 6 7.67a3.08 3.08 0 0 1 3.27-1.93Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11.86 7a3.06 3.06 0 1 1-2.59-3.44A3.06 3.06 0 0 1 11.86 7Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M5.86 7.3C5.1 7.82 3.57 9 4 9.86s10.49-5.15 10.14-6s-2.5.12-3.26.48"
                        />
                    </svg>
                </el-icon>
            </div>
            <div class="grid-item" style="background: #529b2e">
                <i class="index">1</i>
                <div></div>
            </div>
            <div class="grid-item" style="background: #529b2e">
                <i class="index">1</i>
                <div>若小张阻止施暴男子过程中，自己的名牌眼镜被对方打坏，如何索赔</div>
                <div style="display: none">
                    向施暴男子要求索赔，如果施暴男子逃跑或者无力赔偿的，可由受助者给予适当补偿。《民法典》第一百八十三条因保护他人民事权益使自己受到损害的，由侵权人承担民事责任，受益人可以给予适当补偿。没有侵权人、侵权人逃逸或者无力承担民事责任，受害人请求补偿的，受益人应当给予适当补偿。
                </div>
            </div>
            <div class="grid-item" style="background: #337ecc">
                <i class="index">2</i>
                <div>
                    小明见到一个小女孩被一群人围住，于是决定见义勇为。上前搭救过程中不慎造成小女孩受伤，请问小明是否需要承担民事责任？
                </div>
                <div style="display: none">
                    不需要，《民法典》第一百八十四条 因自愿实施紧急救助行为造成受助人损害的，救助人不承担民事责任。
                </div>
            </div>
            <div class="grid-item" style="background: #f3d19e">
                <i class="index">3</i>
                <div>
                    <span style="color: red">前进3步</span>
                </div>
                <el-icon :size="50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                        <path
                            fill="#fff"
                            d="M46.56 19.71a11.69 11.69 0 0 0-7.38-9.41v-.21A5.14 5.14 0 0 0 34.06 5a5.07 5.07 0 0 0-3 1a8.44 8.44 0 1 0-11.57 12.2A17.78 17.78 0 0 1 15 19.83a35.28 35.28 0 0 1-7.57.84a.56.56 0 0 0-.34 1a3.23 3.23 0 0 1 1.44 2.76a2.74 2.74 0 0 1-1.62 2.69a.55.55 0 0 0-.28.77a2.33 2.33 0 0 1 .16 1.56c-.24 1.19-1.92 1.74-1.92 1.74a39 39 0 0 1 10.23.75a19.09 19.09 0 0 1 3.12.9a7.55 7.55 0 1 0 14 5.31a5 5 0 0 0 4.16.7a5 5 0 0 0 3.54-3.6a5.1 5.1 0 0 0-.34-3.41a11.61 11.61 0 0 0 6.98-12.13Z"
                        />
                        <path
                            fill="#e5f8ff"
                            d="M46.4 18.89a11.59 11.59 0 0 1-6.83 8.33a5.1 5.1 0 0 1 .34 3.41a5 5 0 0 1-3.54 3.6a5 5 0 0 1-4.16-.7a7.54 7.54 0 0 1-14.55.72a7.54 7.54 0 1 0 14.55 3.9a5 5 0 0 0 4.16.7a5 5 0 0 0 3.54-3.6a5.1 5.1 0 0 0-.34-3.41a11.61 11.61 0 0 0 7-12.13a7.43 7.43 0 0 0-.17-.82ZM21.86 30a28.44 28.44 0 0 0-6.73-2.66a39.66 39.66 0 0 0-7.32-.81a2.43 2.43 0 0 1-.87.61a.55.55 0 0 0-.28.77a2.33 2.33 0 0 1 .16 1.56c-.24 1.19-1.92 1.74-1.92 1.74a39 39 0 0 1 10.23.75c.82.17 2.46.68 3.12.9A6.69 6.69 0 0 1 21.86 30Z"
                        />
                        <path
                            fill="#45413c"
                            d="M8.8 45.31a15.2 1.69 0 1 0 30.4 0a15.2 1.69 0 1 0-30.4 0Z"
                            opacity=".15"
                        />
                        <path
                            fill="#fff"
                            d="M6.49 16.88s3.61-.5 5.11-2.88s.94-4.83-1.33-5.16A2.18 2.18 0 0 0 7.82 12a3.61 3.61 0 0 1-1.33 4.88Z"
                        />
                        <path
                            fill="#e5f8ff"
                            d="M11.6 11.18a6.45 6.45 0 0 1-3.33 2.42a3.52 3.52 0 0 1-1.78 3.28s3.61-.5 5.11-2.88a4.06 4.06 0 0 0 .54-3.91a5.52 5.52 0 0 1-.54 1.09Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.49 16.88s3.61-.5 5.11-2.88s.94-4.83-1.33-5.16A2.18 2.18 0 0 0 7.82 12a3.61 3.61 0 0 1-1.33 4.88Z"
                        />
                        <path
                            fill="#fff"
                            d="M5.19 34.23s4.93.08 6.84 1.82s2.12 4.43.1 4.9s-2.61-.77-3-2.2s-1.88-3.98-3.94-4.52Z"
                        />
                        <path
                            fill="#e5f8ff"
                            d="M12.9 39.3c-1.89.44-2.61-.78-2.94-2.2a7 7 0 0 0-1.21-2.45a21 21 0 0 0-3.56-.42c2.06.54 3.62 2.94 4 4.52s1.05 2.64 3 2.2A1.8 1.8 0 0 0 13.56 39a2 2 0 0 1-.66.3Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M5.19 34.23s4.93.08 6.84 1.82s2.12 4.43.1 4.9s-2.61-.77-3-2.2s-1.88-3.98-3.94-4.52Z"
                        />
                        <path
                            fill="#e5f8ff"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.49 18.26c3.07 2 5.32 1.47 5.32 1.47M18.25 32.9c2.06-3.32 4.94-3.1 4.94-3.1m-11.86-5.4a30.49 30.49 0 0 0 8.16-1.5m-6.71 4.32a22.35 22.35 0 0 1 5.25 0"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M46.56 19.71a11.69 11.69 0 0 0-7.38-9.41v-.21A5.14 5.14 0 0 0 34.06 5a5.07 5.07 0 0 0-3 1a8.44 8.44 0 1 0-11.57 12.2A17.78 17.78 0 0 1 15 19.83a35.28 35.28 0 0 1-7.57.84a.56.56 0 0 0-.34 1a3.23 3.23 0 0 1 1.44 2.76a2.74 2.74 0 0 1-1.62 2.69a.55.55 0 0 0-.28.77a2.33 2.33 0 0 1 .16 1.56c-.24 1.19-1.92 1.74-1.92 1.74a39 39 0 0 1 10.23.75a19.09 19.09 0 0 1 3.12.9a7.55 7.55 0 1 0 14 5.31a5 5 0 0 0 4.16.7a5 5 0 0 0 3.54-3.6a5.1 5.1 0 0 0-.34-3.41a11.61 11.61 0 0 0 6.98-12.13Z"
                        />
                    </svg>
                </el-icon>
            </div>
            <div class="grid-item" style="background: #f89898">
                <i class="index">4</i>
                <div>
                    11岁的小强用妈妈的手机玩游戏并充值了10000元买装备，妈妈知道之后很生气，她可以要求有些平台返还这笔钱吗？
                </div>
                <div style="display: none">
                    可以。《民法典》第十九条、第二十条规定：“不满八周岁的未成年人为无民事行为能力人，由其法定代理人代理实施民事法律行为。八周岁以上的未成年人为限制民事行为能力人，实施民事法律行为由其法定代理人代理或者经其法定代理人同意、追认；但是，可以独立实施纯获利益的民事法律行为或者与其年龄、智力相适应的民事法律行为。”
                    小强妈妈不同意、不追认小强的充值行为，小强给游戏大额充值的行为属无效，依法有权要求游戏公司退款，游戏公司也应当将充值金额予以退还。
                </div>
            </div>
            <div class="grid-item" style="background: #a0cfff">
                <i class="index">5</i>
                <div>
                    <span style="color: red">再投一次</span>
                </div>
                <el-icon :size="50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                        <path
                            fill="#45413c"
                            d="M8.98 45.04a15.02 1.96 0 1 0 30.04 0a15.02 1.96 0 1 0-30.04 0Z"
                            opacity=".15"
                        />
                        <path
                            fill="#daedf7"
                            d="M24 20.8v23.7a6.62 6.62 0 0 0 2.36-.44l15.39-6a3.92 3.92 0 0 0 2.5-3.65V15.65a3.9 3.9 0 0 0-.81-2.37ZM4.56 13.28a3.9 3.9 0 0 0-.81 2.37v18.8a3.92 3.92 0 0 0 2.5 3.65l15.39 6a6.62 6.62 0 0 0 2.36.4V20.8Z"
                        />
                        <path
                            fill="#fff"
                            d="M24 20.8v23.7a6.62 6.62 0 0 0 2.36-.44l15.39-6a3.92 3.92 0 0 0 2.5-3.65V15.65a3.9 3.9 0 0 0-.81-2.37ZM4.56 13.28a3.9 3.9 0 0 0-.81 2.37v18.8a3.92 3.92 0 0 0 2.5 3.65l15.39 6a6.62 6.62 0 0 0 2.36.4V20.8Z"
                        />
                        <path
                            fill="#daedf7"
                            d="m41.75 34.4l-15.39 6a6.62 6.62 0 0 1-2.36.4v3.7a6.62 6.62 0 0 0 2.36-.44l15.39-6a3.92 3.92 0 0 0 2.5-3.65v-3.67a3.94 3.94 0 0 1-2.5 3.66Zm-35.5 0a3.94 3.94 0 0 1-2.5-3.66v3.71a3.92 3.92 0 0 0 2.5 3.65l15.39 6a6.62 6.62 0 0 0 2.36.4v-3.7a6.62 6.62 0 0 1-2.36-.44Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M24 20.8v23.7a6.62 6.62 0 0 0 2.36-.44l15.39-6a3.92 3.92 0 0 0 2.5-3.65V15.65a3.9 3.9 0 0 0-.81-2.37ZM4.56 13.28a3.9 3.9 0 0 0-.81 2.37v18.8a3.92 3.92 0 0 0 2.5 3.65l15.39 6a6.62 6.62 0 0 0 2.36.4V20.8Z"
                        />
                        <path
                            fill="#fff"
                            d="m24 20.8l19.44-7.52A4 4 0 0 0 41.75 12L26.36 6a6.51 6.51 0 0 0-4.72 0L6.25 12a4 4 0 0 0-1.69 1.29Z"
                        />
                        <path
                            fill="#daedf7"
                            d="m41.75 12l-1.28-.49L26 17.09a5.58 5.58 0 0 1-4.06 0L7.53 11.5l-1.28.5a4 4 0 0 0-1.69 1.29L24 20.8l19.44-7.52A4 4 0 0 0 41.75 12Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m24 20.8l19.44-7.52A4 4 0 0 0 41.75 12L26.36 6a6.51 6.51 0 0 0-4.72 0L6.25 12a4 4 0 0 0-1.69 1.29Z"
                        />
                        <path
                            fill="#ff6242"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.43 12.89a4.57 1.96 0 1 0 9.14 0a4.57 1.96 0 1 0-9.14 0Z"
                        />
                        <path
                            fill="#656769"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11.57 24.08c.23 1.61-.3 3-1.19 3.15s-1.81-1.07-2-2.68s.3-3 1.19-3.14s1.77 1.07 2 2.67Zm26.78-3.28c-.23 1.6.3 3 1.2 3.14s1.8-1.07 2-2.68s-.3-3-1.19-3.14s-1.78 1.07-2.01 2.68ZM27.32 36.47c-.23 1.61.3 3 1.2 3.15s1.8-1.07 2-2.68s-.3-3-1.19-3.14s-1.78 1.07-2.01 2.67Zm5.8-7.79c-.23 1.6.31 3 1.2 3.14s1.8-1.07 2-2.67s-.31-3-1.2-3.15s-1.76 1.07-2 2.68Zm-15.63 4.57c.23 1.61-.3 3-1.2 3.14s-1.8-1.07-2-2.67s.3-3 1.19-3.15s1.78 1.07 2.01 2.68Z"
                        />
                    </svg>
                </el-icon>
            </div>
            <div class="grid-item" style="background: #ab9bb8">
                <i class="index">6</i>
                <div>
                    老王乘坐高铁时霸占他人座位，还说“我想坐那儿就坐那儿，你们还能赶我下车？”对于老王这种行为，法律没有明确规定。对吗？
                </div>
                <div style="display: none">
                    错，民法典第八百一十五条规定：旅客应当按照有效客票记载的时间、班次和座位号乘坐。旅客无票乘坐、超程乘坐、越级乘坐或者持不符合减价条件的优惠客票乘坐的，应当补交票款，承运人可以按照规定加收票款；旅客不支付票款的，承运人可以拒绝运输。
                </div>
            </div>
            <div class="grid-item" style="background: #fab6b6">
                <i class="index">7</i>
                <div>
                    <span style="color: red">原地转3圈</span>
                </div>
                <el-icon :size="50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                        <path
                            fill="#656769"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m36.018 35.967l.769-3.925h0l2.179.427a1.13 1.13 0 0 1 .891 1.326l-1.195 6.104h0a3.34 3.34 0 0 1-2.636-3.92Z"
                        />
                        <path
                            fill="#00b8f0"
                            d="M23.69 26.78a2.66 2.66 0 0 0-.43 3.74l1.53 1.93a11.28 11.28 0 0 0 6.76 4.08l4.21.78l1-5.27l-3.68-.71a7.9 7.9 0 0 1-4.8-3l-.85-1.12a2.67 2.67 0 0 0-3.77-.47Z"
                        />
                        <path
                            fill="#009fd9"
                            d="m28.31 28.37l-.85-1.12a2.66 2.66 0 1 0-4.2 3.27l1.53 1.93a10.86 10.86 0 0 0 2 2a28.38 28.38 0 0 1 4-3.94a7.89 7.89 0 0 1-2.48-2.14Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M23.69 26.78a2.66 2.66 0 0 0-.43 3.74l1.53 1.93a11.28 11.28 0 0 0 6.76 4.08l4.21.78l1-5.27l-3.68-.71a7.9 7.9 0 0 1-4.8-3l-.85-1.12a2.67 2.67 0 0 0-3.77-.47Z"
                        />
                        <path
                            fill="#656769"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m15.727 38.995l3.69 1.543h0l-.848 2.03a1.13 1.13 0 0 1-1.423.63l-5.785-2.418h0a3.34 3.34 0 0 1 4.366-1.785Z"
                        />
                        <path
                            fill="#00b8f0"
                            d="m24.17 26.07l-3.05 2.2a15.81 15.81 0 0 0-4.95 6.29l-1.69 3.89l5 2.08L21 36.85a10.09 10.09 0 0 1 3.24-4.18l3.2-2.31a2.69 2.69 0 0 0 .52-3.77a2.69 2.69 0 0 0-3.79-.52Z"
                        />
                        <path
                            fill="#009fd9"
                            d="M27.94 26.59a2.69 2.69 0 0 0-3.77-.52l-3.05 2.2a15.32 15.32 0 0 0-2.42 2.27a63.18 63.18 0 0 0 9-.42a2.69 2.69 0 0 0 .24-3.53Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m24.17 26.07l-3.05 2.2a15.81 15.81 0 0 0-4.95 6.29l-1.69 3.89l5 2.08L21 36.85a10.09 10.09 0 0 1 3.24-4.18l3.2-2.31a2.69 2.69 0 0 0 .52-3.77h0a2.69 2.69 0 0 0-3.79-.52Z"
                        />
                        <path
                            fill="#e04122"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m20.376 16.805l.361.317a1.77 1.77 0 0 1 .137 2.527l-2.98 3.399h0l-3.007-2.638h0l2.98-3.398a1.77 1.77 0 0 1 2.498-.164Z"
                        />
                        <path
                            fill="#45413c"
                            d="M10.44 44.74a12.96 1.69 0 1 0 25.92 0a12.96 1.69 0 1 0-25.92 0Z"
                            opacity=".15"
                        />
                        <path
                            fill="#ff6242"
                            d="m27.91 24.69l-5.4 2.8A1.13 1.13 0 0 1 21 27a16.73 16.73 0 0 1-2-4.85c-1.05-3.41-1.28-6.51.44-7.41a2.43 2.43 0 0 1 3.07.56l5.78 7.7a1.14 1.14 0 0 1-.38 1.69Z"
                        />
                        <path
                            fill="#ff866e"
                            d="M21.21 27.3c-.25-.64-.53-1.43-.83-2.39c-1.05-3.4-1.29-6.51.44-7.41a2.43 2.43 0 0 1 3.07.56l4.56 6a1.12 1.12 0 0 0-.16-1.06l-5.83-7.69a2.43 2.43 0 0 0-3.07-.56c-1.73.9-1.49 4-.44 7.41A16.73 16.73 0 0 0 21 27a1.06 1.06 0 0 0 .21.3Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m27.91 24.69l-5.4 2.8A1.13 1.13 0 0 1 21 27a16.73 16.73 0 0 1-2-4.85c-1.05-3.41-1.28-6.51.44-7.41h0a2.43 2.43 0 0 1 3.07.56l5.78 7.7a1.14 1.14 0 0 1-.38 1.69Z"
                        />
                        <path
                            fill="#ffcebf"
                            d="M8.61 19.37a1.74 1.74 0 0 0 .05 2.47L10 23.12a5.31 5.31 0 0 0 7.64-.35l-2.59-2.33a1.89 1.89 0 0 1-2.72.11l-1.27-1.23a1.74 1.74 0 0 0-2.45.05Z"
                        />
                        <path
                            fill="#ffb59e"
                            d="M14.35 24.5a5.25 5.25 0 0 0 3.3-1.73l-2.59-2.33a1.84 1.84 0 0 1-1.39.63Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M8.61 19.37a1.74 1.74 0 0 0 .05 2.47L10 23.12a5.31 5.31 0 0 0 7.64-.35h0l-2.59-2.33h0a1.89 1.89 0 0 1-2.72.11l-1.27-1.23a1.74 1.74 0 0 0-2.45.05Z"
                        />
                        <path
                            fill="#ff6242"
                            d="M20.257 14.871a2.13 2.13 0 0 1 2.953-.595l3.765 2.5l-2.335 3.516l-3.748-2.49a2.13 2.13 0 0 1-.635-2.931Z"
                        />
                        <path
                            fill="#ff866e"
                            d="M22.29 16.24a2.13 2.13 0 0 1 2.95-.6L27 16.78v-.05l-3.75-2.5a2.13 2.13 0 1 0-2.35 3.55l1.62 1.08a2.14 2.14 0 0 1-.23-2.62Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M20.257 14.871h0a2.13 2.13 0 0 1 2.953-.595l3.765 2.5h0l-2.335 3.516h0l-3.748-2.49a2.13 2.13 0 0 1-.635-2.931Z"
                        />
                        <path
                            fill="#ffcebf"
                            d="M27.85 27.25a1.73 1.73 0 0 1-1.49-1.94l.33-2.42a2.25 2.25 0 0 0-.91-2.12l-1-.73l1.94-3l.61.44A6.77 6.77 0 0 1 30.05 24l-.27 1.81a1.72 1.72 0 0 1-1.93 1.44Z"
                        />
                        <path
                            fill="#ffb59e"
                            d="m27.33 17.49l-.61-.44l-1.94 3l1 .73a2.19 2.19 0 0 1 .64.75l1.43-3.59c-.17-.16-.34-.31-.52-.45Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M27.85 27.25a1.73 1.73 0 0 1-1.49-1.94l.33-2.42a2.25 2.25 0 0 0-.91-2.12l-1-.73l1.94-3l.61.44A6.77 6.77 0 0 1 30.05 24l-.27 1.81a1.72 1.72 0 0 1-1.93 1.44Z"
                        />
                        <path
                            fill="#ffcebf"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9.52 8.42a5.66 5.66 0 1 0 11.32 0a5.66 5.66 0 1 0-11.32 0Z"
                        />
                        <path
                            fill="#a86c4d"
                            d="M17.8 2.3a7.14 7.14 0 0 0-5.15-.17a2.75 2.75 0 0 1-3.13-.57s-2.08 3.6.35 4.9c2.55 1 5.63-.19 5.63-.19l-.29 2s1.3-.73 2 .06s.34 3-1.14 2.78a3 3 0 0 0 1.06 2.68a5.65 5.65 0 0 0 3.67-4.5c.44-3.15-.22-5.36-3-6.99Z"
                        />
                        <path
                            fill="#de926a"
                            d="M9.2 4.63a.56.56 0 0 1 .35-.32a.54.54 0 0 1 .46.06a3.06 3.06 0 0 0 2.64.16a7.14 7.14 0 0 1 5.15.17a5.6 5.6 0 0 1 3 4.16c.34-2.9-.37-5-3-6.56a7.14 7.14 0 0 0-5.15-.17a2.75 2.75 0 0 1-3.13-.57s-1.33 2.3-.62 3.89a6.87 6.87 0 0 1 .3-.82Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.8 2.3a7.14 7.14 0 0 0-5.15-.17a2.75 2.75 0 0 1-3.13-.57s-2.08 3.6.35 4.9c2.55 1 5.63-.19 5.63-.19l-.29 2s1.3-.73 2 .06s.34 3-1.14 2.78a3 3 0 0 0 1.06 2.68a5.65 5.65 0 0 0 3.67-4.5c.44-3.15-.22-5.36-3-6.99Z"
                        />
                    </svg>
                </el-icon>
            </div>
            <div class="grid-item" style="background: #529b2e">
                <i class="index">8</i>
                <div>
                    小雨住的高层住宅坠落了一个花盆砸伤了人，在难以确定具体“真凶”的情况下，小雨可能承担补偿责任吗？
                </div>
                <div style="display: none">
                    可能，民法典第一千二百五十四条规定：禁止从建筑物中抛掷物品。从建筑物中抛掷物品或者从建筑物上坠落的物品造成他人损害的，由侵权人依法承担侵权责任；经调查难以确定具体侵权人的，除能够证明自己不是侵权人的外，由可能加害的建筑物使用人给予补偿。可能加害的建筑物使用人补偿后，有权向侵权人追偿。
                </div>
            </div>
            <div class="grid-item" style="background: #f3d19e">
                <i class="index">9</i>
                <div>问：胎儿尚未出生，父亲因车祸不幸身亡，胎儿是否有权继承父亲的遗产？</div>
                <div style="display: none">
                    是，《民法典》第十六条规定，涉及遗产继承、接受赠与等胎儿利益保护的，胎儿视为具有民事权利能力。但是，胎儿娩出时为死体的，其民事权利能力自始不存在。
                    《民法典》第一千一百五十五条规定，遗产分割时，应当保留胎儿的继承份额。胎儿娩出时是死体的，保留的份额按照法定继承办理。
                </div>
            </div>
            <div class="grid-item" style="background: #f89898">
                <i class="index">10</i>
                <div>《民法典》的正式施行日期是？</div>
                <div style="display: none">2021年1月1日</div>
            </div>
            <div class="grid-item" style="background: #a0cfff">
                <i class="index">11</i>
                <div><span style="color: red">青蛙跳3次</span></div>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                    <path fill="#45413c" d="M12.5 44.5a11.5 1.5 0 1 0 23 0a11.5 1.5 0 1 0-23 0Z" opacity=".15" />
                    <path
                        fill="#6dd627"
                        d="M37.3 21.87V15.8A7.22 7.22 0 0 0 24 12.17a7.22 7.22 0 0 0-13.28 3.63v6.07c-3.21 1.87-5.2 4.41-5.2 7.22C5.5 34.84 13.78 39.5 24 39.5s18.5-4.66 18.5-10.41c0-2.81-1.99-5.35-5.2-7.22Z"
                    />
                    <path
                        fill="#9ceb60"
                        d="M17.93 11.75a7.16 7.16 0 0 1 4.94 2a1.64 1.64 0 0 0 2.26 0a7.21 7.21 0 0 1 12.15 5V15.8A7.22 7.22 0 0 0 24 12.17a7.22 7.22 0 0 0-13.28 3.63v2.89a7.22 7.22 0 0 1 7.21-6.94Z"
                    />
                    <path
                        fill="none"
                        stroke="#45413c"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M37.3 21.87V15.8h0A7.22 7.22 0 0 0 24 12.17a7.22 7.22 0 0 0-13.28 3.63h0v6.07c-3.21 1.87-5.2 4.41-5.2 7.22C5.5 34.84 13.78 39.5 24 39.5s18.5-4.66 18.5-10.41c0-2.81-1.99-5.35-5.2-7.22Z"
                    />
                    <path
                        fill="none"
                        stroke="#45413c"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M11.28 30.83S13 34.88 24 34.88s12.72-4.05 12.72-4.05"
                    />
                    <path
                        fill="#c8ffa1"
                        d="M38.5 26.61a1.82 1.82 0 1 1-1.82-1.82a1.81 1.81 0 0 1 1.82 1.82Zm-25.36 0a1.82 1.82 0 1 1-1.82-1.82a1.82 1.82 0 0 1 1.82 1.82Z"
                    />
                    <path
                        fill="#fff"
                        stroke="#45413c"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M20.53 26.78a3.37 3.37 0 0 1 2.31 2.31m4.63-2.31a3.37 3.37 0 0 0-2.31 2.31"
                    />
                    <path
                        fill="#fff"
                        d="M18 11.75a4.34 4.34 0 0 0-4.34 4.34v2.31a4.34 4.34 0 0 0 8.68 0v-2.31A4.34 4.34 0 0 0 18 11.75Z"
                    />
                    <path
                        fill="#f0f0f0"
                        d="M18 11.75a4.34 4.34 0 0 0-4.34 4.34v1.68a4.34 4.34 0 0 1 8.68 0v-1.68A4.34 4.34 0 0 0 18 11.75Z"
                    />
                    <path
                        fill="#45413c"
                        stroke="#45413c"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.5 17.93a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0Z"
                    />
                    <path
                        fill="none"
                        stroke="#45413c"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M18 11.75a4.34 4.34 0 0 0-4.34 4.34v2.31a4.34 4.34 0 0 0 8.68 0v-2.31A4.34 4.34 0 0 0 18 11.75Z"
                    />
                    <path
                        fill="#fff"
                        d="M30 11.75a4.34 4.34 0 0 1 4.34 4.34v2.31a4.34 4.34 0 0 1-8.68 0v-2.31A4.34 4.34 0 0 1 30 11.75Z"
                    />
                    <path
                        fill="#f0f0f0"
                        d="M30 11.75a4.34 4.34 0 0 1 4.34 4.34v1.68a4.34 4.34 0 0 0-8.68 0v-1.68A4.34 4.34 0 0 1 30 11.75Z"
                    />
                    <path
                        fill="#45413c"
                        stroke="#45413c"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M28.5 17.93a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0Z"
                    />
                    <path
                        fill="none"
                        stroke="#45413c"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M30 11.75a4.34 4.34 0 0 1 4.34 4.34v2.31a4.34 4.34 0 0 1-8.68 0v-2.31A4.34 4.34 0 0 1 30 11.75Z"
                    />
                </svg>
            </div>
            <div class="grid-item" style="background: #faecd8">
                <i class="index">12</i>
                <div>小花遭父亲虐待，父亲被法院撤销监护权后，有义务继续付抚养费吗？</div>
                <div style="display: none">
                    有，《民法典》第三十七条规定，依法负担被监护人抚
                    养费、赡养费、扶养费的父母、子女、配偶等，被人民法院撤销监护人资格后，应当继续履行负担的义务。
                </div>
            </div>
            <div class="grid-item" style="background: #c45656">
                <i class="index">13</i>
                <div><span style="color: red">后退3格</span></div>
                <el-icon :size="50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                        <path fill="#ffe500" d="M5.04 24.46a18.96 18.96 0 1 0 37.92 0a18.96 18.96 0 1 0-37.92 0Z" />
                        <path
                            fill="#ebcb00"
                            d="M24 5.5a19 19 0 1 0 19 19a19 19 0 0 0-19-19Zm0 35.07a17.3 17.3 0 1 1 17.3-17.3A17.3 17.3 0 0 1 24 40.57Z"
                        />
                        <path fill="#fff48c" d="M18.31 9.29a5.69 1.42 0 1 0 11.38 0a5.69 1.42 0 1 0-11.38 0Z" />
                        <path
                            fill="#45413c"
                            d="M8.83 45.5a15.17 1.5 0 1 0 30.34 0a15.17 1.5 0 1 0-30.34 0Z"
                            opacity=".15"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M5.04 24.46a18.96 18.96 0 1 0 37.92 0a18.96 18.96 0 1 0-37.92 0Z"
                        />
                        <path
                            fill="#fff"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M18.79 23a3.32 3.32 0 1 1-3.32-3.32A3.32 3.32 0 0 1 18.79 23Z"
                        />
                        <path
                            fill="#ffaa54"
                            d="M37.74 29.2c0 .78-1.06 1.42-2.37 1.42S33 30 33 29.2s1.07-1.42 2.37-1.42s2.37.63 2.37 1.42Zm-27.48 0c0 .78 1.06 1.42 2.37 1.42S15 30 15 29.2s-1.07-1.42-2.37-1.42s-2.37.63-2.37 1.42Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M28.27.5v17.06m4.26-15.38v15.64M36.8 5.03v14.69"
                        />
                        <path
                            fill="#fff"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M35.85 23a3.32 3.32 0 1 1-3.32-3.32A3.32 3.32 0 0 1 35.85 23Z"
                        />
                        <path
                            fill="#ffb0ca"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M24 36.6a14.27 14.27 0 0 1 5.77 1.22c1.94.87 4.18.31 4.66-2.26c.66-3.56-4.27-8.73-10.43-8.73S12.91 32 13.57 35.56c.48 2.57 2.72 3.13 4.66 2.26A14.27 14.27 0 0 1 24 36.6Z"
                        />
                        <path
                            fill="#ff87af"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M24 36.6a14.27 14.27 0 0 1 5.77 1.22a3.37 3.37 0 0 0 3.56-.26a11.81 11.81 0 0 0-18.66 0a3.37 3.37 0 0 0 3.56.26A14.27 14.27 0 0 1 24 36.6Z"
                        />
                    </svg>
                </el-icon>
            </div>
            <div class="grid-item" style="background: #a0cfff">
                <i class="index">14</i>
                <div>遇到校园欺凌了，你该怎么处理？</div>
            </div>
            <div class="grid-item" style="background: #f89898">
                <i class="index">15</i>
                <div>一条宠物狗与主人走失，被小张收留并悉心照顾，数天后狗主人来领，小明可以向狗主人要饲养费吗？</div>
                <div style="display: none">
                    可以，《民法典》第九百七十九条
                    管理人没有法定的或者约定的义务，为避免他人利益受损失而管理他人事务的，可以请求受益人偿还因管理事务而支出的必要费用;管理人因管理事务受到损失的，可以请求受益人给予适当补偿。
                </div>
            </div>
            <div class="grid-item" style="background: #9381a9">
                <i class="index">16</i>
                <div>
                    <span style="color: red">再投一次</span>
                </div>
                <el-icon :size="50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                        <path
                            fill="#45413c"
                            d="M8.98 45.04a15.02 1.96 0 1 0 30.04 0a15.02 1.96 0 1 0-30.04 0Z"
                            opacity=".15"
                        />
                        <path
                            fill="#daedf7"
                            d="M24 20.8v23.7a6.62 6.62 0 0 0 2.36-.44l15.39-6a3.92 3.92 0 0 0 2.5-3.65V15.65a3.9 3.9 0 0 0-.81-2.37ZM4.56 13.28a3.9 3.9 0 0 0-.81 2.37v18.8a3.92 3.92 0 0 0 2.5 3.65l15.39 6a6.62 6.62 0 0 0 2.36.4V20.8Z"
                        />
                        <path
                            fill="#fff"
                            d="M24 20.8v23.7a6.62 6.62 0 0 0 2.36-.44l15.39-6a3.92 3.92 0 0 0 2.5-3.65V15.65a3.9 3.9 0 0 0-.81-2.37ZM4.56 13.28a3.9 3.9 0 0 0-.81 2.37v18.8a3.92 3.92 0 0 0 2.5 3.65l15.39 6a6.62 6.62 0 0 0 2.36.4V20.8Z"
                        />
                        <path
                            fill="#daedf7"
                            d="m41.75 34.4l-15.39 6a6.62 6.62 0 0 1-2.36.4v3.7a6.62 6.62 0 0 0 2.36-.44l15.39-6a3.92 3.92 0 0 0 2.5-3.65v-3.67a3.94 3.94 0 0 1-2.5 3.66Zm-35.5 0a3.94 3.94 0 0 1-2.5-3.66v3.71a3.92 3.92 0 0 0 2.5 3.65l15.39 6a6.62 6.62 0 0 0 2.36.4v-3.7a6.62 6.62 0 0 1-2.36-.44Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M24 20.8v23.7a6.62 6.62 0 0 0 2.36-.44l15.39-6a3.92 3.92 0 0 0 2.5-3.65V15.65a3.9 3.9 0 0 0-.81-2.37ZM4.56 13.28a3.9 3.9 0 0 0-.81 2.37v18.8a3.92 3.92 0 0 0 2.5 3.65l15.39 6a6.62 6.62 0 0 0 2.36.4V20.8Z"
                        />
                        <path
                            fill="#fff"
                            d="m24 20.8l19.44-7.52A4 4 0 0 0 41.75 12L26.36 6a6.51 6.51 0 0 0-4.72 0L6.25 12a4 4 0 0 0-1.69 1.29Z"
                        />
                        <path
                            fill="#daedf7"
                            d="m41.75 12l-1.28-.49L26 17.09a5.58 5.58 0 0 1-4.06 0L7.53 11.5l-1.28.5a4 4 0 0 0-1.69 1.29L24 20.8l19.44-7.52A4 4 0 0 0 41.75 12Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m24 20.8l19.44-7.52A4 4 0 0 0 41.75 12L26.36 6a6.51 6.51 0 0 0-4.72 0L6.25 12a4 4 0 0 0-1.69 1.29Z"
                        />
                        <path
                            fill="#ff6242"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.43 12.89a4.57 1.96 0 1 0 9.14 0a4.57 1.96 0 1 0-9.14 0Z"
                        />
                        <path
                            fill="#656769"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11.57 24.08c.23 1.61-.3 3-1.19 3.15s-1.81-1.07-2-2.68s.3-3 1.19-3.14s1.77 1.07 2 2.67Zm26.78-3.28c-.23 1.6.3 3 1.2 3.14s1.8-1.07 2-2.68s-.3-3-1.19-3.14s-1.78 1.07-2.01 2.68ZM27.32 36.47c-.23 1.61.3 3 1.2 3.15s1.8-1.07 2-2.68s-.3-3-1.19-3.14s-1.78 1.07-2.01 2.67Zm5.8-7.79c-.23 1.6.31 3 1.2 3.14s1.8-1.07 2-2.67s-.31-3-1.2-3.15s-1.76 1.07-2 2.68Zm-15.63 4.57c.23 1.61-.3 3-1.2 3.14s-1.8-1.07-2-2.67s.3-3 1.19-3.15s1.78 1.07 2.01 2.68Z"
                        />
                    </svg>
                </el-icon>
            </div>
            <div class="grid-item" style="background: #f3d19e">
                <i class="index">17</i>
                <div>
                    小张在餐厅吃放，服务员误将他人点的一道菜上给他，小张明知上错菜仍然吃完，服务员发现后，可否让小张付钱？
                </div>
                <div style="display: none">
                    可以，《民法典》第九百八十七条
                    得利人知道或者应当知道取得的利益没有法律根据的，受损失的人可以请求得利人返还其取得的利益并依法赔偿损失。
                </div>
            </div>
            <div class="grid-item" style="background: #79bbff">
                <i class="index">18</i>
                <div><span style="color: red">原地转3圈</span></div>
                <el-icon :size="50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                        <path
                            fill="#656769"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m36.018 35.967l.769-3.925h0l2.179.427a1.13 1.13 0 0 1 .891 1.326l-1.195 6.104h0a3.34 3.34 0 0 1-2.636-3.92Z"
                        />
                        <path
                            fill="#00b8f0"
                            d="M23.69 26.78a2.66 2.66 0 0 0-.43 3.74l1.53 1.93a11.28 11.28 0 0 0 6.76 4.08l4.21.78l1-5.27l-3.68-.71a7.9 7.9 0 0 1-4.8-3l-.85-1.12a2.67 2.67 0 0 0-3.77-.47Z"
                        />
                        <path
                            fill="#009fd9"
                            d="m28.31 28.37l-.85-1.12a2.66 2.66 0 1 0-4.2 3.27l1.53 1.93a10.86 10.86 0 0 0 2 2a28.38 28.38 0 0 1 4-3.94a7.89 7.89 0 0 1-2.48-2.14Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M23.69 26.78a2.66 2.66 0 0 0-.43 3.74l1.53 1.93a11.28 11.28 0 0 0 6.76 4.08l4.21.78l1-5.27l-3.68-.71a7.9 7.9 0 0 1-4.8-3l-.85-1.12a2.67 2.67 0 0 0-3.77-.47Z"
                        />
                        <path
                            fill="#656769"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m15.727 38.995l3.69 1.543h0l-.848 2.03a1.13 1.13 0 0 1-1.423.63l-5.785-2.418h0a3.34 3.34 0 0 1 4.366-1.785Z"
                        />
                        <path
                            fill="#00b8f0"
                            d="m24.17 26.07l-3.05 2.2a15.81 15.81 0 0 0-4.95 6.29l-1.69 3.89l5 2.08L21 36.85a10.09 10.09 0 0 1 3.24-4.18l3.2-2.31a2.69 2.69 0 0 0 .52-3.77a2.69 2.69 0 0 0-3.79-.52Z"
                        />
                        <path
                            fill="#009fd9"
                            d="M27.94 26.59a2.69 2.69 0 0 0-3.77-.52l-3.05 2.2a15.32 15.32 0 0 0-2.42 2.27a63.18 63.18 0 0 0 9-.42a2.69 2.69 0 0 0 .24-3.53Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m24.17 26.07l-3.05 2.2a15.81 15.81 0 0 0-4.95 6.29l-1.69 3.89l5 2.08L21 36.85a10.09 10.09 0 0 1 3.24-4.18l3.2-2.31a2.69 2.69 0 0 0 .52-3.77h0a2.69 2.69 0 0 0-3.79-.52Z"
                        />
                        <path
                            fill="#e04122"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m20.376 16.805l.361.317a1.77 1.77 0 0 1 .137 2.527l-2.98 3.399h0l-3.007-2.638h0l2.98-3.398a1.77 1.77 0 0 1 2.498-.164Z"
                        />
                        <path
                            fill="#45413c"
                            d="M10.44 44.74a12.96 1.69 0 1 0 25.92 0a12.96 1.69 0 1 0-25.92 0Z"
                            opacity=".15"
                        />
                        <path
                            fill="#ff6242"
                            d="m27.91 24.69l-5.4 2.8A1.13 1.13 0 0 1 21 27a16.73 16.73 0 0 1-2-4.85c-1.05-3.41-1.28-6.51.44-7.41a2.43 2.43 0 0 1 3.07.56l5.78 7.7a1.14 1.14 0 0 1-.38 1.69Z"
                        />
                        <path
                            fill="#ff866e"
                            d="M21.21 27.3c-.25-.64-.53-1.43-.83-2.39c-1.05-3.4-1.29-6.51.44-7.41a2.43 2.43 0 0 1 3.07.56l4.56 6a1.12 1.12 0 0 0-.16-1.06l-5.83-7.69a2.43 2.43 0 0 0-3.07-.56c-1.73.9-1.49 4-.44 7.41A16.73 16.73 0 0 0 21 27a1.06 1.06 0 0 0 .21.3Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m27.91 24.69l-5.4 2.8A1.13 1.13 0 0 1 21 27a16.73 16.73 0 0 1-2-4.85c-1.05-3.41-1.28-6.51.44-7.41h0a2.43 2.43 0 0 1 3.07.56l5.78 7.7a1.14 1.14 0 0 1-.38 1.69Z"
                        />
                        <path
                            fill="#ffcebf"
                            d="M8.61 19.37a1.74 1.74 0 0 0 .05 2.47L10 23.12a5.31 5.31 0 0 0 7.64-.35l-2.59-2.33a1.89 1.89 0 0 1-2.72.11l-1.27-1.23a1.74 1.74 0 0 0-2.45.05Z"
                        />
                        <path
                            fill="#ffb59e"
                            d="M14.35 24.5a5.25 5.25 0 0 0 3.3-1.73l-2.59-2.33a1.84 1.84 0 0 1-1.39.63Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M8.61 19.37a1.74 1.74 0 0 0 .05 2.47L10 23.12a5.31 5.31 0 0 0 7.64-.35h0l-2.59-2.33h0a1.89 1.89 0 0 1-2.72.11l-1.27-1.23a1.74 1.74 0 0 0-2.45.05Z"
                        />
                        <path
                            fill="#ff6242"
                            d="M20.257 14.871a2.13 2.13 0 0 1 2.953-.595l3.765 2.5l-2.335 3.516l-3.748-2.49a2.13 2.13 0 0 1-.635-2.931Z"
                        />
                        <path
                            fill="#ff866e"
                            d="M22.29 16.24a2.13 2.13 0 0 1 2.95-.6L27 16.78v-.05l-3.75-2.5a2.13 2.13 0 1 0-2.35 3.55l1.62 1.08a2.14 2.14 0 0 1-.23-2.62Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M20.257 14.871h0a2.13 2.13 0 0 1 2.953-.595l3.765 2.5h0l-2.335 3.516h0l-3.748-2.49a2.13 2.13 0 0 1-.635-2.931Z"
                        />
                        <path
                            fill="#ffcebf"
                            d="M27.85 27.25a1.73 1.73 0 0 1-1.49-1.94l.33-2.42a2.25 2.25 0 0 0-.91-2.12l-1-.73l1.94-3l.61.44A6.77 6.77 0 0 1 30.05 24l-.27 1.81a1.72 1.72 0 0 1-1.93 1.44Z"
                        />
                        <path
                            fill="#ffb59e"
                            d="m27.33 17.49l-.61-.44l-1.94 3l1 .73a2.19 2.19 0 0 1 .64.75l1.43-3.59c-.17-.16-.34-.31-.52-.45Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M27.85 27.25a1.73 1.73 0 0 1-1.49-1.94l.33-2.42a2.25 2.25 0 0 0-.91-2.12l-1-.73l1.94-3l.61.44A6.77 6.77 0 0 1 30.05 24l-.27 1.81a1.72 1.72 0 0 1-1.93 1.44Z"
                        />
                        <path
                            fill="#ffcebf"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9.52 8.42a5.66 5.66 0 1 0 11.32 0a5.66 5.66 0 1 0-11.32 0Z"
                        />
                        <path
                            fill="#a86c4d"
                            d="M17.8 2.3a7.14 7.14 0 0 0-5.15-.17a2.75 2.75 0 0 1-3.13-.57s-2.08 3.6.35 4.9c2.55 1 5.63-.19 5.63-.19l-.29 2s1.3-.73 2 .06s.34 3-1.14 2.78a3 3 0 0 0 1.06 2.68a5.65 5.65 0 0 0 3.67-4.5c.44-3.15-.22-5.36-3-6.99Z"
                        />
                        <path
                            fill="#de926a"
                            d="M9.2 4.63a.56.56 0 0 1 .35-.32a.54.54 0 0 1 .46.06a3.06 3.06 0 0 0 2.64.16a7.14 7.14 0 0 1 5.15.17a5.6 5.6 0 0 1 3 4.16c.34-2.9-.37-5-3-6.56a7.14 7.14 0 0 0-5.15-.17a2.75 2.75 0 0 1-3.13-.57s-1.33 2.3-.62 3.89a6.87 6.87 0 0 1 .3-.82Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.8 2.3a7.14 7.14 0 0 0-5.15-.17a2.75 2.75 0 0 1-3.13-.57s-2.08 3.6.35 4.9c2.55 1 5.63-.19 5.63-.19l-.29 2s1.3-.73 2 .06s.34 3-1.14 2.78a3 3 0 0 0 1.06 2.68a5.65 5.65 0 0 0 3.67-4.5c.44-3.15-.22-5.36-3-6.99Z"
                        />
                    </svg>
                </el-icon>
            </div>
            <div class="grid-item" style="background: #79bbff">
                <i class="index">19</i>
                <div>
                    问：小陈在人行道上正常行走，结果被身后驶来的一辆自行车撞伤，对方意图逃走，周围又没有摄像头，小明可否扣留对方的自行车？
                </div>
                <div style="display: none">
                    可以，《民法典》第一千一百七十七条
                    合法权益受到侵害，情况紧迫且不能及时获得国家机关保护，不立即采取措施将使其合法权益受到难以弥补的损害的，受害人可以在保护自己合法权益的必要范围内采取扣留侵权人的财物等合理措施;但是，应当立即请求有关国家机关处理。
                </div>
            </div>
            <div class="grid-item" style="background: #f89898">
                <i class="index">20</i>
                <div><span style="color: red">表情三连拍</span></div>
                <el-icon :size="50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                        <path fill="#ffe500" d="M5.04 24.46a18.96 18.96 0 1 0 37.92 0a18.96 18.96 0 1 0-37.92 0Z" />
                        <path
                            fill="#ebcb00"
                            d="M24 5.5a19 19 0 1 0 19 19a19 19 0 0 0-19-19Zm0 35.07a17.3 17.3 0 1 1 17.3-17.3A17.3 17.3 0 0 1 24 40.57Z"
                        />
                        <path fill="#fff48c" d="M18.31 9.29a5.69 1.42 0 1 0 11.38 0a5.69 1.42 0 1 0-11.38 0Z" />
                        <path
                            fill="#45413c"
                            d="M8.83 45.5a15.17 1.5 0 1 0 30.34 0a15.17 1.5 0 1 0-30.34 0Z"
                            opacity=".15"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M5.04 24.46a18.96 18.96 0 1 0 37.92 0a18.96 18.96 0 1 0-37.92 0Z"
                        />
                        <path
                            fill="#fff"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M18.79 23a3.32 3.32 0 1 1-3.32-3.32A3.32 3.32 0 0 1 18.79 23Z"
                        />
                        <path
                            fill="#ffaa54"
                            d="M37.74 29.2c0 .78-1.06 1.42-2.37 1.42S33 30 33 29.2s1.07-1.42 2.37-1.42s2.37.63 2.37 1.42Zm-27.48 0c0 .78 1.06 1.42 2.37 1.42S15 30 15 29.2s-1.07-1.42-2.37-1.42s-2.37.63-2.37 1.42Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M28.27.5v17.06m4.26-15.38v15.64M36.8 5.03v14.69"
                        />
                        <path
                            fill="#fff"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M35.85 23a3.32 3.32 0 1 1-3.32-3.32A3.32 3.32 0 0 1 35.85 23Z"
                        />
                        <path
                            fill="#ffb0ca"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M24 36.6a14.27 14.27 0 0 1 5.77 1.22c1.94.87 4.18.31 4.66-2.26c.66-3.56-4.27-8.73-10.43-8.73S12.91 32 13.57 35.56c.48 2.57 2.72 3.13 4.66 2.26A14.27 14.27 0 0 1 24 36.6Z"
                        />
                        <path
                            fill="#ff87af"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M24 36.6a14.27 14.27 0 0 1 5.77 1.22a3.37 3.37 0 0 0 3.56-.26a11.81 11.81 0 0 0-18.66 0a3.37 3.37 0 0 0 3.56.26A14.27 14.27 0 0 1 24 36.6Z"
                        />
                    </svg>
                </el-icon>
            </div>
            <div class="grid-item" style="background: #f89898">
                <i class="index">21</i>
                <div>小马路遇一儿童落水，奋勇跳入水中救人，救起儿童的过程中造成其局部挫伤，小马要为此赔偿吗？</div>
                <div style="display: none">
                    不需要， 《民法典》第一百八十四条 因自愿实施紧急救助行为造成受助人损害的，救助人不承担民事责任。
                </div>
            </div>
            <div class="grid-item" style="background: #f89898">
                <i class="index">22</i>
                <div><span style="color: red">前进3步</span></div>
                <el-icon :size="50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                        <path
                            fill="#fff"
                            d="M46.56 19.71a11.69 11.69 0 0 0-7.38-9.41v-.21A5.14 5.14 0 0 0 34.06 5a5.07 5.07 0 0 0-3 1a8.44 8.44 0 1 0-11.57 12.2A17.78 17.78 0 0 1 15 19.83a35.28 35.28 0 0 1-7.57.84a.56.56 0 0 0-.34 1a3.23 3.23 0 0 1 1.44 2.76a2.74 2.74 0 0 1-1.62 2.69a.55.55 0 0 0-.28.77a2.33 2.33 0 0 1 .16 1.56c-.24 1.19-1.92 1.74-1.92 1.74a39 39 0 0 1 10.23.75a19.09 19.09 0 0 1 3.12.9a7.55 7.55 0 1 0 14 5.31a5 5 0 0 0 4.16.7a5 5 0 0 0 3.54-3.6a5.1 5.1 0 0 0-.34-3.41a11.61 11.61 0 0 0 6.98-12.13Z"
                        />
                        <path
                            fill="#e5f8ff"
                            d="M46.4 18.89a11.59 11.59 0 0 1-6.83 8.33a5.1 5.1 0 0 1 .34 3.41a5 5 0 0 1-3.54 3.6a5 5 0 0 1-4.16-.7a7.54 7.54 0 0 1-14.55.72a7.54 7.54 0 1 0 14.55 3.9a5 5 0 0 0 4.16.7a5 5 0 0 0 3.54-3.6a5.1 5.1 0 0 0-.34-3.41a11.61 11.61 0 0 0 7-12.13a7.43 7.43 0 0 0-.17-.82ZM21.86 30a28.44 28.44 0 0 0-6.73-2.66a39.66 39.66 0 0 0-7.32-.81a2.43 2.43 0 0 1-.87.61a.55.55 0 0 0-.28.77a2.33 2.33 0 0 1 .16 1.56c-.24 1.19-1.92 1.74-1.92 1.74a39 39 0 0 1 10.23.75c.82.17 2.46.68 3.12.9A6.69 6.69 0 0 1 21.86 30Z"
                        />
                        <path
                            fill="#45413c"
                            d="M8.8 45.31a15.2 1.69 0 1 0 30.4 0a15.2 1.69 0 1 0-30.4 0Z"
                            opacity=".15"
                        />
                        <path
                            fill="#fff"
                            d="M6.49 16.88s3.61-.5 5.11-2.88s.94-4.83-1.33-5.16A2.18 2.18 0 0 0 7.82 12a3.61 3.61 0 0 1-1.33 4.88Z"
                        />
                        <path
                            fill="#e5f8ff"
                            d="M11.6 11.18a6.45 6.45 0 0 1-3.33 2.42a3.52 3.52 0 0 1-1.78 3.28s3.61-.5 5.11-2.88a4.06 4.06 0 0 0 .54-3.91a5.52 5.52 0 0 1-.54 1.09Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.49 16.88s3.61-.5 5.11-2.88s.94-4.83-1.33-5.16A2.18 2.18 0 0 0 7.82 12a3.61 3.61 0 0 1-1.33 4.88Z"
                        />
                        <path
                            fill="#fff"
                            d="M5.19 34.23s4.93.08 6.84 1.82s2.12 4.43.1 4.9s-2.61-.77-3-2.2s-1.88-3.98-3.94-4.52Z"
                        />
                        <path
                            fill="#e5f8ff"
                            d="M12.9 39.3c-1.89.44-2.61-.78-2.94-2.2a7 7 0 0 0-1.21-2.45a21 21 0 0 0-3.56-.42c2.06.54 3.62 2.94 4 4.52s1.05 2.64 3 2.2A1.8 1.8 0 0 0 13.56 39a2 2 0 0 1-.66.3Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M5.19 34.23s4.93.08 6.84 1.82s2.12 4.43.1 4.9s-2.61-.77-3-2.2s-1.88-3.98-3.94-4.52Z"
                        />
                        <path
                            fill="#e5f8ff"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19.49 18.26c3.07 2 5.32 1.47 5.32 1.47M18.25 32.9c2.06-3.32 4.94-3.1 4.94-3.1m-11.86-5.4a30.49 30.49 0 0 0 8.16-1.5m-6.71 4.32a22.35 22.35 0 0 1 5.25 0"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M46.56 19.71a11.69 11.69 0 0 0-7.38-9.41v-.21A5.14 5.14 0 0 0 34.06 5a5.07 5.07 0 0 0-3 1a8.44 8.44 0 1 0-11.57 12.2A17.78 17.78 0 0 1 15 19.83a35.28 35.28 0 0 1-7.57.84a.56.56 0 0 0-.34 1a3.23 3.23 0 0 1 1.44 2.76a2.74 2.74 0 0 1-1.62 2.69a.55.55 0 0 0-.28.77a2.33 2.33 0 0 1 .16 1.56c-.24 1.19-1.92 1.74-1.92 1.74a39 39 0 0 1 10.23.75a19.09 19.09 0 0 1 3.12.9a7.55 7.55 0 1 0 14 5.31a5 5 0 0 0 4.16.7a5 5 0 0 0 3.54-3.6a5.1 5.1 0 0 0-.34-3.41a11.61 11.61 0 0 0 6.98-12.13Z"
                        />
                    </svg>
                </el-icon>
            </div>
            <div class="grid-item" style="background: #f89898">
                <i class="index">23</i>
                <div>问：李佳琦的声音如“OH MY GOD,买它买它”可以随便拿来用吗？</div>
                <div style="display: none">
                    不可以，《民法典》第一千零二十三条 第二款规定：对自然人声音的保护，参照适用肖像权保护的有关规定。
                </div>
            </div>
            <div class="grid-item" style="background: #f89898">
                <i class="index">24</i>
                <div><span style="color: red">原地转3圈</span></div>
                <el-icon :size="50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                        <path fill="#45413c" d="M12 45.5a12 1.5 0 1 0 24 0a12 1.5 0 1 0-24 0Z" opacity=".15" />
                        <path
                            fill="#f0d5a8"
                            d="M24 28.62C5.62 28.62-2 20 2.24 14.11C5.93 9 13.36 17 24 17s18.07-8 21.76-2.9C50 20 42.38 28.62 24 28.62Z"
                        />
                        <path
                            fill="#debb7e"
                            d="M44.23 12.78C40.2 10.83 33.33 17 24 17S7.8 10.83 3.77 12.78C.62 18.16 7.67 25.58 24 25.58s23.38-7.42 20.23-12.8Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M24 28.62C5.62 28.62-2 20 2.24 14.11C5.93 9 13.36 17 24 17s18.07-8 21.76-2.9C50 20 42.38 28.62 24 28.62Z"
                        />
                        <path fill="#ffe500" d="M9.49 24.99a14.51 14.51 0 1 0 29.02 0a14.51 14.51 0 1 0-29.02 0Z" />
                        <path
                            fill="#ebcb00"
                            d="M11.8 17.14A31.54 31.54 0 0 0 24 20a31.54 31.54 0 0 0 12.2-2.86a14.52 14.52 0 0 0-24.4 0Z"
                        />
                        <path
                            fill="#ebcb00"
                            d="M24 10.49A14.51 14.51 0 1 0 38.51 25A14.51 14.51 0 0 0 24 10.49Zm0 26.83a13.24 13.24 0 1 1 13.24-13.23A13.23 13.23 0 0 1 24 37.32Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M9.49 24.99a14.51 14.51 0 1 0 29.02 0a14.51 14.51 0 1 0-29.02 0Z"
                        />
                        <path
                            fill="#ffaa54"
                            d="M34.52 28.62c0 .6-.81 1.09-1.82 1.09s-1.81-.49-1.81-1.09s.81-1.09 1.81-1.09s1.82.47 1.82 1.09Zm-21.04 0c0 .6.81 1.09 1.82 1.09s1.81-.49 1.81-1.09s-.81-1.09-1.81-1.09s-1.82.47-1.82 1.09Z"
                        />
                        <path
                            fill="#45413c"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.11 24.27a.73.73 0 0 1-.73.72a.72.72 0 0 1-.72-.72a.73.73 0 0 1 .72-.73a.73.73 0 0 1 .73.73Zm13.78 0a.73.73 0 0 0 .73.72a.72.72 0 0 0 .72-.72a.73.73 0 0 0-.72-.73a.73.73 0 0 0-.73.73Z"
                        />
                        <path
                            fill="#ffb0ca"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M24 37.32a7.9 7.9 0 0 0 8-6.64a.7.7 0 0 0-.23-.62a.76.76 0 0 0-.65-.19a45 45 0 0 1-14.18 0a.76.76 0 0 0-.65.19a.7.7 0 0 0-.23.62A7.9 7.9 0 0 0 24 37.32Z"
                        />
                        <path
                            fill="#ff87af"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M24 33.7a12.88 12.88 0 0 0-5.85 1.22a8.33 8.33 0 0 0 11.7 0A12.88 12.88 0 0 0 24 33.7Z"
                        />
                        <path
                            fill="#b89558"
                            d="M24 17a30.63 30.63 0 0 0 11-2.42l-2-6.52A3.89 3.89 0 0 0 31.67 6l-2.56-2.11a1.91 1.91 0 0 0-2.21-.12A5 5 0 0 1 24 4.85a5 5 0 0 1-2.9-1.08a1.91 1.91 0 0 0-2.21.12L16.33 6A3.89 3.89 0 0 0 15 8.06l-2 6.53A30.63 30.63 0 0 0 24 17Z"
                        />
                        <path
                            fill="#debb7e"
                            d="m15.44 8.56l2.86-2.09a2.32 2.32 0 0 1 2.46-.12A6 6 0 0 0 24 7.44a6 6 0 0 0 3.24-1.09a2.32 2.32 0 0 1 2.46.12l2.86 2.09a4.09 4.09 0 0 1 .87.84L33 8.06A3.89 3.89 0 0 0 31.67 6l-2.56-2.11a1.91 1.91 0 0 0-2.21-.12A5 5 0 0 1 24 4.85a5 5 0 0 1-2.9-1.08a1.91 1.91 0 0 0-2.21.12L16.33 6A3.89 3.89 0 0 0 15 8.06l-.43 1.34a4.09 4.09 0 0 1 .87-.84Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M24 17a30.63 30.63 0 0 0 11-2.42l-2-6.52A3.89 3.89 0 0 0 31.67 6l-2.56-2.11a1.91 1.91 0 0 0-2.21-.12A5 5 0 0 1 24 4.85a5 5 0 0 1-2.9-1.08a1.91 1.91 0 0 0-2.21.12L16.33 6A3.89 3.89 0 0 0 15 8.06l-2 6.53A30.63 30.63 0 0 0 24 17Z"
                        />
                    </svg>
                </el-icon>
            </div>
            <div class="grid-item" style="background: #f89898">
                <i class="index">25</i>
                <div>问：小刘在小区中散步时，被从居民坠落下来的一扇窗户砸伤，物业是否有责任</div>
                <div style="display: none">
                    若物业未采取必要安全保障措施，应承担责任。《中华人民共和国民法典》第一千二百五十四条规定，禁止从建筑物中抛掷物品。从建筑物中抛掷物品或者从建筑物上坠落的物品造成他人损害的，由侵权人依法承担侵权责任；经调查难以确定具体侵权人的，除能够证明自己不是侵权人的外，由可能加害的建筑物使用人给予补偿。可能加害的建筑物使用人补偿后，有权向侵权人追偿。物业服务企业等建筑物管理人应当采取必要的安全保障措施防止前款规定情形的发生；未采取必要的安全保障措施的，应当依法承担未履行安全保障义务的侵权责任。发生本条第一款规定的情形的，公安等机关应当依法及时调查，查清责任人。
                </div>
            </div>
            <div class="grid-item" style="background: #f89898">
                <i class="index">26</i>
                <div>问：小张将自己养的宠物狗遗弃，这条狗流浪期间咬伤他人，小张是否承担责任？</div>
                <div style="display: none">
                    是，《民法典》第一千二百四十九条
                    遗弃、逃逸的动物在遗弃、逃逸期间造成他人损害的，由动物原饲养人或者管理人承担侵权责任。
                </div>
            </div>
            <div class="grid-item grid-end" style="background: #b43d63">
                <p class="text">挑战成功</p>
                <el-icon :size="80">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
                        <path fill="#45413c" d="M14 45.5a10 1.5 0 1 0 20 0a10 1.5 0 1 0-20 0Z" opacity=".15" />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M25.79 11.75A14.83 14.83 0 0 1 24 4a14.88 14.88 0 0 1-1.76 7.7"
                        />
                        <path
                            fill="#ebcb00"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7.083 25.309a10.19 2.96-40.05 1 0 15.6-13.114a10.19 2.96-40.05 1 0-15.6 13.114Z"
                        />
                        <path
                            fill="#ffe500"
                            d="M22.69 12.2c-1.06-1.25-5.4.67-9.71 4.29S6 24.06 7.09 25.31a10.19 10.19 0 1 1 15.6-13.11Z"
                        />
                        <path
                            fill="#fff48c"
                            d="M8.35 13a10.19 10.19 0 0 1 11.79-.93c1.22-.39 2.13-.39 2.55.1a10.19 10.19 0 0 0-17.93 7.71A10.15 10.15 0 0 1 8.35 13Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M22.69 12.2c-1.06-1.25-5.4.67-9.71 4.29S6 24.06 7.09 25.31a10.19 10.19 0 1 1 15.6-13.11Z"
                        />
                        <path
                            fill="#ebcb00"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M31.203 21.015a10.19 2.96 40.05 1 0 3.81-4.532a10.19 2.96 40.05 1 0-3.81 4.532Z"
                        />
                        <path
                            fill="#ffe500"
                            d="M25.31 12.2c1.06-1.25 5.4.67 9.71 4.29s6.94 7.57 5.89 8.82a10.19 10.19 0 1 0-15.6-13.11Z"
                        />
                        <path
                            fill="#fff48c"
                            d="M39.65 13a10.19 10.19 0 0 0-11.79-.93c-1.22-.39-2.13-.39-2.55.1a10.19 10.19 0 0 1 17.93 7.68A10.15 10.15 0 0 0 39.65 13Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M25.31 12.2c1.06-1.25 5.4.67 9.71 4.29s6.94 7.57 5.89 8.82a10.19 10.19 0 1 0-15.6-13.11Z"
                        />
                        <path
                            fill="#00f5bc"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4.9 29.37a4 4 0 0 1-3.25 1.84l-1.15-2a4 4 0 0 0 3.25-1.84Z"
                        />
                        <path
                            fill="#ff6242"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M31.36 17.08a4 4 0 0 1-1.65 3.35l-2.09-1a4 4 0 0 0 1.64-3.35Z"
                        />
                        <path
                            fill="#ff6196"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M30.59 40.35a4 4 0 0 1-.78-3.65l2.28-.49a4 4 0 0 0 .78 3.65Z"
                        />
                        <path
                            fill="#bf8df2"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19 16.16a4 4 0 0 0-.73 3.67l2.29.45a4 4 0 0 1 .73-3.66ZM43.49 29a4 4 0 0 0 3.71.49l.3-2.32a3.94 3.94 0 0 1-3.7-.48Z"
                        />
                        <path
                            fill="#ff8a14"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M27.42 31.8a4 4 0 0 1-3.09 2.11L23 32a4 4 0 0 0 3.09-2.11Z"
                        />
                        <path
                            fill="#4aeff7"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21.43 24.42a4 4 0 0 1 3.23 1.89l-1.18 2a4 4 0 0 0-3.23-1.89Z"
                        />
                        <path
                            fill="#fff48c"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.78 38.64a4 4 0 0 1 2.43-2.85L20 37.31a4 4 0 0 0-2.42 2.84Z"
                        />
                        <path
                            fill="#ff6242"
                            d="M14.09 34.71a15.52 15.52 0 0 1-6.91 5.78l-.88-1.8c3.61-1.77 5.13-3.22 7.21-6.84L15.16 33c-.37.62-.7 1.16-1.07 1.71Z"
                        />
                        <path
                            fill="#e04122"
                            d="M12.77 36.46a17 17 0 0 0 1.32-1.75c.37-.55.7-1.09 1.07-1.74l-1.65-1.12a16.38 16.38 0 0 1-3.38 4.43a5.78 5.78 0 0 0 2.64.18Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.09 34.71a15.52 15.52 0 0 1-6.91 5.78l-.88-1.8c3.61-1.77 5.13-3.22 7.21-6.84L15.16 33c-.37.62-.7 1.16-1.07 1.71Z"
                        />
                        <path
                            fill="#ff6242"
                            d="M15.9 22.27a15.6 15.6 0 0 1-.72 6.27a3.82 3.82 0 0 0-1.11-1.12a4 4 0 1 0 1.1 5.58c2.5-3.74 2.84-6.62 2.73-10.75ZM10.73 32.4a2 2 0 1 1 2.78-.55a2 2 0 0 1-2.78.55Z"
                        />
                        <path
                            fill="#e04122"
                            d="m14.07 27.42l-.21-.13a19.47 19.47 0 0 1-.77 1.88a2 2 0 0 1 .42 2.68a13.32 13.32 0 0 0 1.67-3.31a3.82 3.82 0 0 0-1.11-1.12Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.9 22.27a15.6 15.6 0 0 1-.72 6.27a3.82 3.82 0 0 0-1.11-1.12a4 4 0 1 0 1.1 5.58c2.5-3.74 2.84-6.62 2.73-10.75ZM10.73 32.4a2 2 0 1 1 2.78-.55a2 2 0 0 1-2.78.55Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13.51 31.85a13.32 13.32 0 0 0 1.67-3.31"
                        />
                        <path
                            fill="#6dd627"
                            d="M34.81 34.19a15.43 15.43 0 0 0 8 4.07l.45-1.95c-3.92-.91-5.72-2-8.56-5l-1.37 1.46c.56.52 1 .97 1.48 1.42Z"
                        />
                        <path
                            fill="#46b000"
                            d="M36.5 35.6a17.29 17.29 0 0 1-1.69-1.41c-.48-.45-.92-.9-1.44-1.45l1.37-1.46A16.34 16.34 0 0 0 39 34.83a5.83 5.83 0 0 1-2.5.77Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M34.81 34.19a15.43 15.43 0 0 0 8 4.07l.45-1.95c-3.92-.91-5.72-2-8.56-5l-1.37 1.46c.56.52 1 .97 1.48 1.42Z"
                        />
                        <path
                            fill="#6dd627"
                            d="M28.27 22.89c.83 4.05 1.81 6.78 5.1 9.85a4 4 0 1 0-.19-5.65a4.1 4.1 0 0 0-.83 1.34a15.87 15.87 0 0 1-2.12-5.94Zm6.47 8.39a2 2 0 1 1 2.82-.09a2 2 0 0 1-2.82.09Z"
                        />
                        <path
                            fill="#46b000"
                            d="m33.18 27.09l.17-.18a18.53 18.53 0 0 0 1.19 1.67a2 2 0 0 0 .2 2.7a13.07 13.07 0 0 1-2.39-2.85a4.1 4.1 0 0 1 .83-1.34Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M28.27 22.89c.83 4.05 1.81 6.78 5.1 9.85a4 4 0 1 0-.19-5.65a4.1 4.1 0 0 0-.83 1.34a15.87 15.87 0 0 1-2.12-5.94Zm6.47 8.39a2 2 0 1 1 2.82-.09a2 2 0 0 1-2.82.09Z"
                        />
                        <path
                            fill="none"
                            stroke="#45413c"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M34.74 31.28a13.07 13.07 0 0 1-2.39-2.85"
                        />
                    </svg>
                </el-icon>
            </div>
        </div>
        <div class="grid_box">
            <Dice @startEnd="startEnd" />
        </div>

        <el-dialog
            v-model="gridData.dialogVisible"
            title="请听题"
            width="90%"
            align-center
            :modal="false"
            @close="dialogClose"
        >
            <div class="box_card">
                <div v-html="gridData.text"></div>
                <div class="answer" v-if="gridData.showAnswer">
                    <span>
                        <span style="color: #111">答案：</span>
                        <span v-html="gridData.answer"></span>
                    </span>
                    <i></i>
                </div>
                <div v-else style="text-align: center">
                    <el-button type="primary" v-if="gridData.answer" @click="gridData.showAnswer = true">
                        查看答案
                    </el-button>
                </div>
            </div>

            <template #footer>
                <el-button type="primary" @click="gridData.dialogVisible = false">关闭</el-button>
            </template>
        </el-dialog>
    </div>
</template>
<style lang="scss" scoped>
@import './style.scss';
.main {
    position: relative;
    width: 100%;
    height: 100%;
    background: url('@/assets/bg1.jpg') no-repeat;
    background-size: 100% 100%;
    font-family: 'Microsoft Yahei';
    font-weight: 500;
    margin: auto;
    overflow: hidden;
    text-align: center;
}
</style>
