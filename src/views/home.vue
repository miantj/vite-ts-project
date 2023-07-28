<script setup lang="ts">
let gridSun = 8

let horizontal = 6
let column = 6

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
} as any

onMounted(async () => {
    const container = document.querySelector('.grid') as any

    for (let index = 0; index < gridSun; index++) {
        const element = gridData[index]
        const box = document.createElement('div')
        box.classList.add('grid-item')
        box.style.position = 'absolute'
        box.style.backgroundColor = '#f2f2f2'
        box.style.padding = '10px'
        box.style.width = '120px'
        box.style.height = '120px'
        box.style.border = '3px solid #111'
        let left = '',
            top = ''
        if (index < horizontal) {
            left = index * 117 + 'px'
            top = 0 + 'px'
        } else {
            const row = index - horizontal + 1
            console.warn(row)

            left = (column - 1) * 117 + 'px'
            top = row * 117 + 'px'
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
