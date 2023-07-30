<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'

import Dice from './dice.vue'

let horizontal = 7 //横
let vertical = 6 //竖
const gridData = reactive({
    pace: 0,
    total: 0,
    width: 137,
} as any)

const startEnd = (data: number) => {
    console.warn('结果', data)
    const active = document.querySelector('.active') as any
    let stop = 1
    const time = setInterval(() => {
        if (stop >= data) clearInterval(time)
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
                left = (vertical + horizontal + 4 - index) * gridData.width
                top = (vertical - 1) * gridData.width
            }
        }
    }
    return [left + 'px', top + 'px']
}

// 初始化地图
const init = () => {
    const container = document.querySelectorAll('.grid-item') as any

    gridData.total = container.length - 1
    container.forEach((box: any, index: number) => {
        // box.textContent = String(index)
        ;[box.style.left, box.style.top] = direction(index)
    })
}

onMounted(async () => {
    init()
})
</script>
<template>
    <div class="main">
        <el-scrollbar height="920px">
            <el-row>
                <el-col :span="20">
                    <div class="grid">
                        <div class="active"></div>
                        <div class="grid-item grid-start" style="background: #ffff33">起点</div>
                        <div class="grid-item" style="background: #529b2e">
                            1 小明常用污言秽语对其他学生进行攻击，从而产生矛盾 蹲起3个
                        </div>
                        <div class="grid-item" style="background: #337ecc">
                            2 开展校园欺凌治理为主题的专题教育，开展品德。心理健康和安全教育
                        </div>
                        <div class="grid-item" style="background: #f3d19e">
                            3 给李明取侮辱性绰号侮辱他人人格 原地转1圈
                        </div>
                        <div class="grid-item" style="background: #f89898">
                            4 我国刑法对犯罪年龄的界定是（） A已满16周岁应当负刑事责任
                            B已满14周岁不满16周岁故意伤害不负刑责 C已满16周岁不负刑事责任
                        </div>
                        <div class="grid-item" style="background: #a0cfff">
                            5 看到同学被欺负了，高年级张明及时制止，并告知老师 前进一格
                        </div>
                        <div class="grid-item" style="background: #ab9bb8">6此插画是校园欺凌吗？</div>
                        <div class="grid-item" style="background: #fab6b6">
                            7 王明借助身体的优势打骂比较弱小的同学 原地转1圈
                        </div>
                        <div class="grid-item" style="background: #f89898">8 后退2步</div>
                        <div class="grid-item" style="background: #f3d19e">9 再接再厉 在投一次</div>
                        <div class="grid-item" style="background: #f89898">
                            10 同学小张向低年级学生索要钱物，不给就软硬兼施，威逼利诱
                        </div>
                        <div class="grid-item" style="background: #a0cfff">
                            11 遭遇校园暴力，应在学校、警方或家长的帮助下，制止暴力，决不能逆来顺受或以暴制暴
                        </div>
                        <div class="grid-item" style="background: #faecd8">
                            12 以下哪个关于欺凌的观点是正确的？ A.孩子只是在互相开玩笑 B.孩子收到欺凌告诉他要反击回去
                            C.孩子告诉家长被同学欺负，家长责怪其胆小、懦弱等
                            D.欺凌者。被欺凌者都是受欺凌行为影响的孩子，家长需要帮助孩子找办法应对和处理
                        </div>
                        <div class="grid-item" style="background: #c45656">
                            13 张鹏不断地用语言、行为等给其他同学造成精神或心理上的压力，使其出现不良表现
                        </div>
                        <div class="grid-item" style="background: #a0cfff">14 遇到校园欺凌了，你该怎么处理？</div>
                        <div class="grid-item" style="background: #9381a9">
                            15 发现同学（）可能是校园欺凌的信号 A身体表面无故出现瘀伤、抓伤等 B不同某同学玩
                            C不愿借东西给某同学
                        </div>
                        <div class="grid-item" style="background: #f3d19e">16 说一句反对校园欺凌的标语</div>
                        <div class="grid-item" style="background: #79bbff">17校园欺凌的危害</div>
                        <div class="grid-item" style="background: #79bbff">
                            18 校园欺凌下面哪个是（） A不跟同学说话 B网上传播谣言，人身攻击 不借物品
                        </div>
                        <div class="grid-item grid-end" style="background: #b43d63">终端</div>
                    </div>
                </el-col>
                <el-col :span="4">
                    <Dice @startEnd="startEnd" />
                </el-col>
            </el-row>
        </el-scrollbar>
    </div>
</template>
<style lang="scss" scoped>
.main {
    width: 1024;
    background: url('@/assets/img/bg1.jpg') no-repeat;
    background-size: 100% 100%;
}
:deep(.grid) {
    position: relative;
    width: 100%;
    height: 700px;
    margin: 50px 150px;
    display: inline-block;

    .active {
        position: absolute;
        top: 0;
        left: 0;
        background: url(/src/assets/img/ren.png) no-repeat;
        background-size: 100% 100%;
        width: 90px;
        height: 100px;
        margin: 10px 15px 0 15px;
        z-index: 1;
        transform: rotateY(185deg);
        transition: all 1s;
    }

    .grid-item {
        position: absolute;
        padding: 10px;
        width: 140px;
        height: 140px;
        border: 3px solid #111;
        color: #fff;
    }
    .grid-start,
    .grid-end {
        width: 180px;
        height: 180px;
        border-radius: 5px;
    }
    .grid-start {
        background: #b43d63;
    }
}
</style>
