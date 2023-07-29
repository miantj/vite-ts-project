<script setup lang="ts">
let gridSun = 24

let horizontal = 6 //横
let vertical = 6 //竖

let gridData = {
    '1': '2332',
    '2': '2332',
    '3': '2332',
    '4': '2332',
    '5': '2332',
    '6': '2332',
    '7': '2332',
    '8': '2332',
    '9': '2332',
    '10': '2332',
    '11': '2332',
    '12': '2332',
    '13': '2332',
} as any

onMounted(async () => {
    const container = document.querySelector('.grid') as any

    for (let index = 0; index < gridSun; index++) {
        const box = document.createElement('div')
        box.classList.add('grid-item')
        box.style.position = 'absolute'
        box.style.backgroundColor = '#f2f2f2'
        box.style.padding = '10px'
        box.style.width = '120px'
        box.style.height = '120px'
        box.style.border = '3px solid #111'
        box.textContent = String(index)

        let left = '',
            top = ''
        let type = Math.floor(index / horizontal)

        if (index < horizontal) {
            left = index * 117 + 'px'
            top = 0 + 'px'
        } else {
            const row = index - horizontal + 1
            if (row < vertical) {
                left = (vertical - 1) * 117 + 'px'
                top = row * 117 + 'px'
            } else {
                left = (horizontal - row + horizontal - 1) * 117 + 'px'
                top = (vertical - 1) * 117 + 'px'
                console.warn(index / horizontal)
            }
        }

        box.style.left = left
        box.style.top = top
        container.appendChild(box)
    }
})
</script>
<template>
    <div>
        <el-scrollbar height="720px">
            <div class="grid"></div>
        </el-scrollbar>
    </div>
</template>
<style lang="scss" scoped>
.grid {
    position: relative;
    width: 700px;
    height: 700px;
    margin: 50px auto;
}
</style>
