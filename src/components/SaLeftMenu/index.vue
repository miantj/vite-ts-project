<script setup lang="ts">
import { useGlobalStoreHook } from '@/store/modules/global'

const emit = defineEmits(['handleTabClick'])
const props = defineProps({
    data: {
        type: Array<any>,
        default: () => [],
    },
    // 标题
    title: {
        type: String,
        default: '菜单栏',
    },
    // 指定节点标签为节点对象的某个属性值
    props: {
        type: Object,
        default: {
            label: 'label',
            value: 'value',
        },
    },
    // 默认选中
    activeItem: {
        type: Object,
        default: null,
    },
    // 设置选中key
    activeKey: {
        type: String,
        default: 'value',
    },
})

const activeItem = ref()

const handleTabClick = (item: any) => {
    if (activeItem.value == item[props.activeKey]) return
    activeItem.value = item[props.activeKey]
    useGlobalStoreHook().leftMenuActive = item
    emit('handleTabClick', item)
}

onMounted(() => {
    if (props.data.length > 0) {
        let active = props.activeItem || useGlobalStoreHook().leftMenuActive
        let menuArr: any[] = []
        props.data.forEach(element => {
            menuArr.push(element[props.activeKey])
        })

        if (menuArr.includes(active[props.activeKey])) {
            activeItem.value = active[props.activeKey]
            emit('handleTabClick', active)
        } else {
            activeItem.value = menuArr[0]
            emit('handleTabClick', props.data[0])
        }
    }
})
</script>

<template>
    <div class="main_left">
        <div class="orgSelect">
            {{ props.title }}
        </div>
        <ul class="order">
            <template v-for="item in props.data">
                <li
                    v-if="!item.hide"
                    :key="item[props.props.value]"
                    :class="{ active: activeItem == item[props.activeKey] }"
                    @click="handleTabClick(item)"
                >
                    {{ item[props.props.label] }}
                </li>
            </template>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.main_left {
    flex: 0 0 260px;
    padding: 0;
    background: #ffffff;
    border-radius: 5px;
    overflow: hidden;

    .orgSelect {
        padding-left: 36px;
        height: 52px;
        line-height: 52px;
        color: #666;
        font-size: 16px;
        font-weight: bold;
        border-bottom: 2px solid #dce4eb;
        background: url(../../assets/themes/blue/left-menu-icon.png) no-repeat 12px;
        .el-select {
            width: 110px;

            :deep(.el-input__inner) {
                background-color: transparent;
                border: 0;
            }
        }
    }

    .order {
        list-style: none;
        margin: 10px;

        li {
            text-align: center;
            margin-bottom: 10px;
            border-radius: 5px;
            height: 48px;
            position: relative;
            line-height: 48px;
            background-image: url(../../assets/themes/blue/unselected.png);
            background-repeat: no-repeat;
            background-size: 100% 100%;
            color: #333;
            cursor: pointer;

            &.active {
                background-image: url(../../assets/themes/blue/active-selected.png);
                color: var(--el-color-primary);
            }
        }
    }
}
.login-red {
    .main_left {
        .orgSelect {
            background: url(../../assets/themes/red/left-menu-icon.png) no-repeat 12px;
        }
        .order {
            li {
                background-image: url(../../assets/themes/red/unselected.png);
                &.active {
                    background-image: url(../../assets/themes/red/active-selected.png);
                }
            }
        }
    }
}
</style>
