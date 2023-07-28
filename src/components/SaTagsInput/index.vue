<script setup lang="ts">
import { ref, computed, reactive, nextTick } from 'vue'
import { trim, SaMessage } from '@/utils'
const emit = defineEmits(['close', 'inputConfirm', 'showInput'])

const props = defineProps({
    data: {
        type: Array,
        default: [],
    },
    // 输入框类型   fixed始终显示 ，inline行类展示
    type: {
        type: String,
        default: 'fixed',
    },
    placeholder: {
        type: String,
        default: '请输入,按enter键确认',
    },
    // 设置最大高度
    height: {
        type: Number,
        default: 100,
    },
    // 设置输入上限
    max: {
        type: Number,
        default: 999,
    },
    // 输入字段长度
    maxlength: {
        type: Number,
        default: 30,
    },
})

const saTagsInputData = reactive({
    inputValue: '',
    inputVisible: false,
})

const maxHeight = computed(() => {
    return `${props.height - 32}px`
})

const saveTagInput = ref()

const showInput = () => {
    saTagsInputData.inputVisible = true
    nextTick(() => {
        saveTagInput.value.input.focus()
        emit('showInput')
    })
}

const inputConfirm = (e: any) => {
    let inputValue = trim(saTagsInputData.inputValue)
    if (inputValue) {
        if (props.data.includes(inputValue)) {
            SaMessage('请勿输入重复内容', 'error')
        } else {
            emit('inputConfirm', inputValue, (data: any) => {
                saTagsInputData.inputVisible = false
                saTagsInputData.inputValue = data
            })
        }
    }
}
</script>

<template>
    <div class="tagsInput">
        <el-scrollbar :max-height="maxHeight">
            <el-tag
                v-for="(item, index) in data"
                :key="index"
                closable
                style="margin: 0 6px 6px 0"
                @close="emit('close', item, index)"
            >
                {{ item }}
            </el-tag>

            <el-tooltip
                class="box-item"
                effect="dark"
                :content="props.placeholder"
                placement="top-start"
                v-if="data.length < props.max && props.type == 'inline' && saTagsInputData.inputVisible"
            >
                <el-input
                    v-model="saTagsInputData.inputValue"
                    ref="saveTagInput"
                    class="inline-input"
                    size="small"
                    :maxlength="props.maxlength"
                    :title="props.placeholder"
                    :placeholder="props.placeholder"
                    clearable
                    @keyup.enter="inputConfirm"
                ></el-input>
            </el-tooltip>

            <el-button
                v-if="data.length < props.max && props.type == 'inline' && !saTagsInputData.inputVisible"
                class="button-new-tag"
                size="small"
                @click="showInput"
            >
                点击添加
            </el-button>
        </el-scrollbar>
        <el-tooltip
            class="box-item"
            effect="dark"
            :content="props.placeholder"
            placement="top-start"
            v-if="data.length < props.max && props.type == 'fixed'"
        >
            <el-input
                v-model="saTagsInputData.inputValue"
                :maxlength="props.maxlength"
                :placeholder="props.placeholder"
                clearable
                @keyup.enter="(e: any) =>{emit('inputConfirm',saTagsInputData.inputValue, (data: any)=>saTagsInputData.inputValue = data)}"
            ></el-input>
        </el-tooltip>
    </div>
</template>

<style scoped lang="scss">
.tagsInput {
    width: 100%;
    border: 1px solid #eaeaea;
    border-radius: 5px;
    padding: 6px;
    overflow: auto;
}
.inline-input {
    width: 50%;
}
</style>
