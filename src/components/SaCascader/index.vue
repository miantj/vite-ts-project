<script setup lang="ts">
import { deepClone } from '@/utils'
const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
    modelValue: {
        type: Array as unknown as any[],
        default: [],
    },
    options: {
        type: Array as unknown as any[],
        default: [],
    },
    props: {
        type: Object,
        default: {
            children: 'son',
            label: 'name',
            value: 'code',
        },
    },
})

const cascaderData = reactive({
    modelValue: props.modelValue, //用来全选递归
    oldModelValue: [],
    selectoptionsBeifen: [] as any,
    bussListDigui: [] as any, //用来全选递归
    bussListBeifen: 0, //用来全选递归后往前面加上对应父级
})

let saCascaderRef = ref()
const cascaderChange = async (value: any) => {
    let toRawValue: any = toRaw(value)
    let thsAreaCode = saCascaderRef.value.getCheckedNodes()
    if (cascaderData.bussListBeifen < toRawValue.length) {
        //说明当前是增加操作，需对数据的子级也进行选中
        if (thsAreaCode.length) {
            cascaderData.bussListDigui = []
            for (let i = 0; i < thsAreaCode.length; i++) {
                if (
                    thsAreaCode[i].value ==
                    toRawValue[toRawValue.length - 1][toRawValue[toRawValue.length - 1].length - 1]
                ) {
                    //是新增加的数据，将其增加上子级做选中
                    if (thsAreaCode[i].data?.son) {
                        for (let j = 0; j < thsAreaCode[i].data.son.length; j++) {
                            await digui(thsAreaCode[i].data.son[j], thsAreaCode[i].data)
                        }
                    }
                    break
                }
            }
        }

        if (cascaderData.bussListDigui.length) {
            for (let i = 0; i < cascaderData.modelValue.length; i++) {
                cascaderData.bussListDigui.push(cascaderData.modelValue[i])
            }
            setTimeout(() => {
                cascaderData.modelValue = cascaderData.bussListDigui
            }, 30)
        } else {
            cascaderData.modelValue = cascaderData.oldModelValue
            setTimeout(() => {
                cascaderData.modelValue = value
            }, 30)
        }
    }

    setTimeout(() => {
        cascaderData.bussListBeifen = deepClone(cascaderData.modelValue.length)
        emit('change', value, thsAreaCode)
    }, 100)
}

const digui = async (items: any, pid: any) => {
    if (items.pid == pid.id) {
        const list = items.codeList && items.codeList.length ? [...items.codeList, items.code] : [pid.code, items.code]
        cascaderData.bussListDigui.push(list)

        if (items.son) {
            for (let i = 0; i < items.son.length; i++) {
                items.son[i].codeList = list
                await digui(items.son[i], items)
            }
        }
    }
}

watch(
    () => props.modelValue,
    (news, old) => {
        cascaderData.modelValue = news
    }
)

watch(
    () => cascaderData.modelValue,
    (news, old) => {
        cascaderData.oldModelValue = old
        emit('update:modelValue', news)
    }
)
</script>

<template>
    <el-cascader
        ref="saCascaderRef"
        expand-trigger="hover"
        :options="props.options"
        :props="props.props"
        v-model="cascaderData.modelValue"
        @change="cascaderChange"
        style="width: 100%"
    ></el-cascader>
</template>
