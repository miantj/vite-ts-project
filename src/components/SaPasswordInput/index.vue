<script setup lang="ts">
import { ref, computed, reactive, nextTick } from 'vue'

const props = defineProps({
    // 是否隐藏密码内容
    mask: {
        type: Boolean,
        default: true,
    },
    // 尺寸
    size: {
        type: Number || String,
        default: 26,
    },
    // 最大长度
    length: {
        type: Number || String,
        default: 6,
    },
    // 输入框格子之间的间距，单位为px
    gutter: {
        type: Number || String,
        default: 10,
    },
})

const emit = defineEmits(['reverse'])

const refInput = ref()
const saPasswordData = reactive({
    digits: [] as any,
    inputFocus: 0,
})

for (let index = 0; index < props.length; index++) {
    saPasswordData.digits.push('')
}

const inputFocus = async (index: any) => {
    saPasswordData.inputFocus = index
}

const inputChange = async (value: any) => {
    if (value.length == 2) saPasswordData.digits[saPasswordData.inputFocus] = value[1]
    const inputValue = saPasswordData.digits.join('')

    if (inputValue.length == props.length) {
        refInput.value[saPasswordData.inputFocus - 1].blur()
        emit('reverse', inputValue)
        return
    }
    if (saPasswordData.inputFocus < props.length && value) refInput.value[saPasswordData.inputFocus].focus()
}

const onDelete = async (index: any) => {
    if (index >= 2) refInput.value[index - 2].focus()
}
</script>

<template>
    <div class="sa_password_input">
        <div
            v-for="item in props.length"
            :key="item"
            class="sa_password_input_number"
            :style="{ 'margin-left': `${item == 1 ? 0 : props.gutter}px` }"
        >
            <el-input
                v-model="saPasswordData.digits[item]"
                maxlength="2"
                ref="refInput"
                :type="props.mask ? 'password' : 'text'"
                :style="{ 'font-size': `${props.size}px` }"
                @focus="inputFocus(item)"
                @input="inputChange"
                @keyup.delete="onDelete(item)"
                class="sa_input"
            />
        </div>
    </div>
</template>
<style lang="scss" scoped>
.sa_password_input {
    position: relative;
    display: flex;
    width: 100%;
    height: 50px;
    .sa_input {
        width: 100%;
        height: 100%;
        margin: 0 auto;

        :deep(.el-input__inner) {
            text-align: center !important;
        }
    }
    .sa_password_input_number {
        position: relative;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: center;
    }
}
</style>
