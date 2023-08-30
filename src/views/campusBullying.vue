<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import item from '@/assets/img/item.png'

import Dice from './dice.vue'

let horizontal = 8 //横
let vertical = 6 //竖
const gridData = reactive({
    pace: 0,
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
                            gridData.pace = 0
                            active.style.top = '0'
                            active.style.left = '0'
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
        left = index == 0 ? -40 : index * gridData.width
        top = index == 0 ? -20 : 0
    } else {
        const row = index - horizontal + 1
        if (row < vertical) {
            left = (horizontal - 1) * gridData.width
            top = row * gridData.width
        } else {
            if (index > horizontal * 2 + vertical - 3) {
                left = 0
                top = (gridData.total + 3 - index) * gridData.width
                if (index == gridData.total) {
                    top = top - 40
                    left = left - 20
                }
            } else {
                left = (vertical + horizontal + (horizontal - 3) - index) * gridData.width
                top = (vertical - 1) * gridData.width
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
    if (gridData.text.includes('前进一格')) startEnd(1)
    if (gridData.text.includes('后退1步')) {
        gridData.pace = gridData.pace - 2
        startEnd(1)
    }
    if (gridData.text.includes('后退2步')) {
        gridData.pace = gridData.pace - 3
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
                <p class="text">起点GO</p>
                <el-icon :size="70">
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
                <div>
                    小明常用污言秽语对其他学生进行攻击，从而产生矛盾
                    <span style="color: red">蹲起3个</span>
                </div>
                <div style="display: none">属于，校园欺凌是指同学间欺负弱小、言语羞辱及敲诈勒索甚至殴打的行为等。</div>
            </div>
            <div class="grid-item" style="background: #337ecc">
                <i class="index">2</i>
                <div>开展校园欺凌治理为主题的专题教育，开展品德。心理健康和安全教育</div>
            </div>
            <div class="grid-item" style="background: #f3d19e">
                <i class="index">3</i>
                <div>
                    给李明取侮辱性绰号侮辱他人人格
                    <span style="color: red">原地转1圈</span>
                </div>
                <div style="display: none">属于，校园欺凌是指同学间欺负弱小、言语羞辱及敲诈勒索甚至殴打的行为等。</div>
            </div>
            <div class="grid-item" style="background: #f89898">
                <i class="index">4</i>
                <div>
                    我国刑法对犯罪年龄的界定是（）
                    <br />
                    A已满16周岁应当负刑事责任
                    <br />
                    B已满14周岁不满16周岁故意伤害不负刑责
                    <br />
                    C已满16周岁不负刑事责任
                </div>
                <div style="display: none">A</div>
            </div>
            <div class="grid-item" style="background: #a0cfff">
                <i class="index">5</i>
                <div>
                    看到同学被欺负了，高年级张明及时制止，并告知老师
                    <span style="color: red">前进一格</span>
                </div>
                <div style="display: none">
                    对，张明及时制止校园欺负行为，避免被欺负的同学受到更大的伤害，通过求助老师，让老师介入解决事情。
                </div>
            </div>
            <div class="grid-item" style="background: #ab9bb8">
                <i class="index">6</i>
                <div style="overflow: hidden; height: 100%">
                    <p>此插画是校园欺凌吗？</p>
                    <el-image style="width: 400px; height: 300px" :src="item" fit="contain" />
                </div>
                <div style="display: none">
                    是，校园内外学生间一方(个体或群体)单次或多次蓄意或恶意通过肢体、语言实施欺负、侮辱，造成另一方(个体或群体)身体和心理伤害、财产损失或精神损害等的行为是校园欺凌
                    。
                </div>
            </div>
            <div class="grid-item" style="background: #fab6b6">
                <i class="index">7</i>
                <div>
                    王明借助身体的优势打骂比较弱小的同学
                    <span style="color: red">原地转1圈</span>
                </div>
                <div style="display: none">是，校园欺凌是指同学间欺负弱小、言语羞辱及敲诈勒索甚至殴打的行为等。</div>
            </div>
            <div class="grid-item" style="background: #529b2e">
                <i class="index">8</i>
                <div><span style="color: red">后退2步</span></div>
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
            <div class="grid-item" style="background: #f3d19e">
                <i class="index">9</i>
                <div>
                    再接再厉
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
            <div class="grid-item" style="background: #f89898">
                <i class="index">10</i>
                <div>同学小张向低年级学生索要钱物，不给就软硬兼施，威逼利诱</div>
                <div style="display: none">是，校园欺凌是指同学间欺负弱小、言语羞辱及敲诈勒索甚至殴打的行为等。</div>
            </div>
            <div class="grid-item" style="background: #a0cfff">
                <i class="index">11</i>
                <div>遭遇校园暴力，应在学校、警方或家长的帮助下，制止暴力，决不能逆来顺受或以暴制暴</div>
                <div style="display: none">
                    是。当我们遭遇校园暴力，首先可以大声警告对方，他们的所作所为是违法违纪的，会受到法律纪律严厉的制裁，会为此付出应有的代价。这样做的目的一是大声告诉周围的老师同学关注欺凌者的行为，二是欺凌者大都知道自己的行为不对，心虚，洪亮的声音可以起一个震摄作用。如果对方还是继续欺凌行为的话，应适当自卫，而不是忍受挨打。自卫的原则不是以暴制暴打回去，而是同样起一个震摄作用，以行动告诉对方我们不是软弱可欺的。一般欺凌者都欺软怕硬，若看到欺负对象奋起反抗，多会心虚停止攻击行为，而如果被欺负者默默忍受，反而会让他更加得意忘形，从而持续攻击行为，直到达到目的为止。如果反抗后对方仍未停止攻击，应该在自卫的同时大声呼救求助，并且寻找机会逃走，保护好自身安全是最重要的。
                </div>
            </div>
            <div class="grid-item" style="background: #faecd8">
                <i class="index">12</i>
                <div>
                    以下哪个关于欺凌的观点是正确的？
                    <br />
                    A.孩子只是在互相开玩笑
                    <br />
                    B.孩子收到欺凌告诉他要反击回去
                    <br />
                    C.孩子告诉家长被同学欺负，家长责怪其胆小、懦弱等
                    <br />
                    D.欺凌者。被欺凌者都是受欺凌行为影响的孩子，家长需要帮助孩子找办法应对和处理
                </div>
                <div style="display: none">D</div>
            </div>
            <div class="grid-item" style="background: #c45656">
                <i class="index">13</i>
                <div>张鹏不断地用语言、行为等给其他同学造成精神或心理上的压力，使其出现不良表现</div>
                <div style="display: none">
                    是，校园内外学生间一方单次或多次蓄意或恶意通过肢体、语言实施欺负、侮辱，造成另一方(个体或群体)身体和心理伤害、财产损失或精神损害等的行为是校园欺凌
                    。
                </div>
            </div>

            <div class="grid-item" style="background: #a0cfff">
                <i class="index">14</i>
                <div>遇到校园欺凌了，你该怎么处理？</div>
                <div style="display: none">
                    【开放性答案】 1、沉着冷静，采取迂回战术，尽可能拖延时间。
                    2、人身安全永远是第一位，不要去激怒对方，必要时，向路人、同学、老师呼救求助。
                    3、顺从对方的话去说，从其言语中找出可插入话题，缓解气氛，分散对方注意力，同时获取信任，为自己争取时间。
                    4、上学和放学尽可能结伴而行。
                    5、穿戴用品尽量低调，不要过于招摇。不主动与同学发生冲突，一旦发生及时找老师解决
                </div>
            </div>
            <div class="grid-item" style="background: #f89898">
                <i class="index">15</i>
                <div><span style="color: red">后退1步</span></div>
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
            <div class="grid-item" style="background: #9381a9">
                <i class="index">16</i>
                <div>
                    发现同学（）可能是校园欺凌的信号
                    <br />
                    A身体表面无故出现瘀伤、抓伤等
                    <br />
                    B不同某同学玩
                    <br />
                    C不愿借东西给某同学
                </div>
                <div style="display: none">A</div>
            </div>
            <div class="grid-item" style="background: #f3d19e">
                <i class="index">17</i>
                <div>说一句反对校园欺凌的标语</div>
                <div style="display: none">
                    1）小事不计较，大事共商讨，友爱互助团结好. （2）言出不必惊人，谈吐一定文明
                    （3）健康生活，文明做人，平安校园，幸福一生 （4）欺凌同学要不得，互助互爱好品德
                </div>
            </div>
            <div class="grid-item" style="background: #79bbff">
                <i class="index">18</i>
                <div>校园欺凌的危害</div>
                <div style="display: none">
                    （1）校园暴力会使学生的身心健康受到伤害。校园暴力不仅直接伤害了学生的身体，还会严重损害学生的心理健康，有些学生由此产生恐惧心理，难以集中精力学习，造成学习成绩下降，有的甚至不能正常完成学业。
                    （2）校园暴力会使家长的工作生活受到影响。由于担心校园暴力发生在自己孩子身上，许多家长亲自接着孩子上下学，从而影响他们的正常工作和生活，有的家长不得不求助于相关法制机构。
                    （3）校园暴力会使校园正常秩序受到破坏。校园暴力的存在和发生，使学生不得不挤出时间和精力采取相应的防范措施，既影响了正常的教学秩序，又给学校管理带来很大困难。
                </div>
            </div>
            <div class="grid-item" style="background: #79bbff">
                <i class="index">19</i>
                <div>
                    校园欺凌下面哪个是（）
                    <br />
                    A不跟同学说话
                    <br />
                    B网上传播谣言，人身攻击 不借物品
                </div>
                <div style="display: none">B</div>
            </div>
            <div class="grid-item" style="background: #f89898">
                <i class="index">20</i>
                <div><span style="color: red">后退2步</span></div>
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
            <div class="grid-item grid-end" style="background: #b43d63">
                <p class="text">终点</p>
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
            width="70%"
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
    background: url('@/assets/bg3.jpg') no-repeat;
    background-size: 100% 100%;
    font-family: 'Microsoft Yahei';
    font-weight: 500;
    margin: auto;
    overflow: hidden;
    text-align: center;

    .active {
        top: -5px;
        left: -10px;
        z-index: 2;
    }

    .grid-start,
    .grid-end {
        width: 180px;
        height: 180px;
        border-radius: 5px;
    }
    .grid-start,
    .grid-end {
        background: #b43d63;
        .text {
            font-family: 'DynaPuff', cursive;
            text-align: center;
            width: 150px;
            font-size: 40px;
            position: absolute;
            top: 80%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-shadow: 0 0px orange, 1px 1px black;
            -webkit-text-fill-color: transparent;
        }
    }
    .grid-end {
        .text {
            text-shadow: 0 0px #ffff33, 1px 1px black;
        }
    }
}
</style>
