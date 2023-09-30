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
    gridData.start = false
    const all = document.querySelectorAll('.active') as any
    const active = all[gridData.user - 1] as any

    let stop = 1
    const time = setInterval(() => {
        if (stop >= data) {
            const topic = gridData.container[gridData.pace[gridData.user - 1] + 1].getElementsByTagName('div')
            const text = topic[topic.length > 1 ? topic.length - 2 : topic.length - 1]
            const answer = topic.length > 1 ? topic[topic.length - 1] : ''

            console.warn(topic)
            console.warn(text)
            console.warn(answer)

            gridData.answer = ''
            if (text) gridData.text = text.innerHTML
            if (answer) gridData.answer = answer.innerHTML

            setTimeout(() => {
                if (gridData.pace[gridData.user - 1] != gridData.total) gridData.dialogVisible = true
                gridData.start = true
            }, 1000)

            clearInterval(time)
        }
        stop++

        if (gridData.pace[gridData.user - 1] <= gridData.total - 1) {
            if (gridData.type == 'campusBullying') {
                ;[active.style.left, active.style.top] = direction(gridData, ++gridData.pace[gridData.user - 1])
            }
            if (gridData.type == 'civilCode') {
                ;[active.style.left, active.style.top] = direction2(gridData, ++gridData.pace[gridData.user - 1])
            }
            if (gridData.type == 'constitution') {
                ;[active.style.left, active.style.top] = direction3(gridData, ++gridData.pace[gridData.user - 1])
            }
            if (gridData.pace[gridData.user - 1] > gridData.total - 1) {
                setTimeout(() => {
                    let list = document.querySelectorAll('.yanhua')
                    for (let index = 0; index < list.length; index++) {
                        const element = list[index] as any
                        element.style.display = 'block'
                    }
                    ElMessageBox.alert(`恭喜玩家${gridData.user}到达终点了！`, '提示', {
                        confirmButtonText: '重新开始',
                        appendTo: document.querySelectorAll('.main')[0] as any,
                        callback: (action: any) => {
                            for (let index = 0; index < list.length; index++) {
                                const element = list[index] as any
                                element.style.display = 'none'
                            }
                            if (gridData.type == 'campusBullying') {
                                for (let index = 0; index < all.length; index++) {
                                    const element = all[index]
                                    gridData.pace[index] = 0
                                    element.style.top = '0'
                                    element.style.left = index * 50 + 0
                                }
                            } else {
                                for (let index = 0; index < all.length; index++) {
                                    const element = all[index]
                                    gridData.pace[index] = 0
                                    element.style.top = '685px'
                                    element.style.left = 150 - index * 50 + 'px'
                                }
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
