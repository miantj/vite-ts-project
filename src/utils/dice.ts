import { ElMessage, ElMessageBox } from 'element-plus'

const direction = (gridData: any, index: number) => {
    let left = 0,
        top = 0
    if (index < gridData.horizontal) {
        left = index == 0 ? -40 : index * gridData.width
        top = index == 0 ? -20 : 0
    } else {
        const row = index - gridData.horizontal + 1
        if (row < gridData.vertical) {
            left = (gridData.horizontal - 1) * gridData.width
            top = row * gridData.width
        } else {
            if (index > gridData.horizontal * 2 + gridData.vertical - 3) {
                left = 0
                top = (gridData.total + 3 - index) * gridData.width
                if (index == gridData.total) {
                    top = top - 40
                    left = left - 20
                }
            } else {
                left = (gridData.vertical + gridData.horizontal + (gridData.horizontal - 3) - index) * gridData.width
                top = (gridData.vertical - 1) * gridData.width
            }
        }
    }
    return [left + 'px', top + 'px']
}

const direction2 = (gridData: any, index: number) => {
    let left = 0,
        top = 0
    if (index < gridData.horizontal) {
        left = index == 0 ? 0 : index * gridData.width
        top = 685
    } else {
        const row = gridData.vertical - index

        if (0 <= gridData.vertical + row) {
            left = (gridData.horizontal - 1) * gridData.width
            top = (gridData.vertical + row) * gridData.width
        } else {
            const row2 = gridData.horizontal * 2 + gridData.vertical - 3
            if (index > row2) {
                const row3 = gridData.horizontal * 2 + gridData.vertical
                if (index > row3) {
                    left = (index - row3) * gridData.width
                    top = (gridData.vertical - 3) * gridData.width
                    if (index == gridData.total) {
                        top = top - 177
                        left = left - 137
                    }
                } else {
                    left = 0
                    top = (index - row2) * gridData.width
                }
            } else {
                left = (gridData.vertical + gridData.horizontal + (gridData.horizontal - 3) - index) * gridData.width
                top = 0
            }
        }
    }
    return [left + 'px', top + 'px']
}

const direction3 = (gridData: any, index: number) => {
    let left = 0,
        top = 0
    if (index < gridData.horizontal) {
        left = index == 0 ? 0 : index * gridData.width
        top = 685
    } else {
        const row = gridData.vertical - index

        if (0 <= gridData.vertical + row) {
            left = (gridData.horizontal - 1) * gridData.width
            top = (gridData.vertical + row) * gridData.width
        } else {
            const row2 = gridData.horizontal * 2 + gridData.vertical - 3
            if (index > row2) {
                const row3 = gridData.horizontal * 2 + gridData.vertical
                if (index > row3) {
                    left = (index - row3) * gridData.width
                    top = (gridData.vertical - 3) * gridData.width
                    if (index == gridData.total) {
                        top = top - 18
                        left = left
                    }
                } else {
                    left = 0
                    top = (index - row2) * gridData.width
                }
            } else {
                left = (gridData.vertical + gridData.horizontal + (gridData.horizontal - 3) - index) * gridData.width
                top = 0
            }
        }
    }
    return [left + 'px', top + 'px']
}

export const startEnd = (gridData: any, data: number) => {
    console.warn('结果', data)
    gridData.start = false
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
                if (gridData.pace != gridData.total) gridData.dialogVisible = true
                gridData.start = true
            }, 1000)

            clearInterval(time)
        }
        stop++

        if (gridData.pace <= gridData.total - 1) {
            if (gridData.type == 'campusBullying') {
                ;[active.style.left, active.style.top] = direction(gridData, ++gridData.pace)
            }
            if (gridData.type == 'civilCode') {
                ;[active.style.left, active.style.top] = direction2(gridData, ++gridData.pace)
            }
            if (gridData.type == 'constitution') {
                ;[active.style.left, active.style.top] = direction3(gridData, ++gridData.pace)
            }
            if (gridData.pace > gridData.total - 1) {
                setTimeout(() => {
                    let list = document.querySelectorAll('.yanhua')
                    for (let index = 0; index < list.length; index++) {
                        const element = list[index] as any
                        element.style.display = 'block'
                    }
                    ElMessageBox.alert('恭喜你到达终点了！', '提示', {
                        confirmButtonText: '重新开始',
                        appendTo: document.querySelectorAll('.main')[0] as any,
                        callback: (action: any) => {
                            for (let index = 0; index < list.length; index++) {
                                const element = list[index] as any
                                element.style.display = 'none'
                            }
                            if (gridData.type == 'campusBullying') {
                                gridData.pace = 0
                                active.style.top = '0'
                                active.style.left = '0'
                            } else {
                                gridData.pace = 1
                                active.style.top = '685px'
                                active.style.left = '150px'
                            }
                            gridData.start = true
                        },
                    })
                }, 600)
                clearInterval(time)
            }
        }
    }, 1000)
}

// 初始化地图
export const init = (gridData: any) => {
    gridData.container = document.querySelectorAll('.grid-item') as any

    gridData.total = gridData.container.length - 1
    gridData.container.forEach((box: any, index: number) => {
        if (gridData.type == 'campusBullying') {
            ;[box.style.left, box.style.top] = direction(gridData, index)
        }
        if (gridData.type == 'civilCode') {
            ;[box.style.left, box.style.top] = direction2(gridData, index)
        }
        if (gridData.type == 'constitution') {
            ;[box.style.left, box.style.top] = direction3(gridData, index)
        }
    })
}
