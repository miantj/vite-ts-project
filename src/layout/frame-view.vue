<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { ref, unref, onMounted, nextTick } from 'vue'
import { emitter } from '@/utils/mitt'
import { useGlobalStoreHook } from '@/store/modules/global'

const props = defineProps({
    // 是否隐藏密码内容
    frameSrc: {
        type: String,
        default: '',
    },
    // 调整frame高度
    resizeHeight: {
        type: Number,
        default: 0,
    },
    // 设置frame高度
    height: {
        type: Number,
        default: 0,
    },
})

const frameData = reactive({
    loading: true,
    parentType: false,
})
const currentRoute = useRoute()
const frameSrc = ref<string>('')
const frameRef = ref<HTMLElement | null>(null) as any

if (unref(currentRoute.meta)?.frameSrc) {
    frameSrc.value = unref(currentRoute.meta)?.frameSrc as string
}

function hideLoading() {
    // 给iframe子页面添加class名称
    frameRef.value.contentWindow.postMessage({ source: 'child' }, '*')
    frameData.loading = false
}

function init() {
    nextTick(() => {
        const iframe = unref(frameRef)
        if (!iframe) return
        const _frame = iframe as any
        if (_frame.attachEvent) {
            _frame.attachEvent('onload', () => {
                setTimeout(() => {
                    frameData.loading = false
                }, 2000)
            })
        } else {
            iframe.onload = () => {
                setTimeout(() => {
                    frameData.loading = false
                }, 2000)
            }
        }
    })
}

const clientHeight = computed(() => {
    return props.height == 0 ? useGlobalStoreHook().clientHeight - props.resizeHeight - 150 : props.height
})

function handleMessage(event: any) {
    // 根据上面制定的结构来解析iframe内部发回来的数据
    const data = event.data

    if (data.source == 'isReady') {
        console.warn(data)

        hideLoading()
    }
}

onMounted(() => {
    emitter.on('mittHandleMessage', async r => {
        handleMessage(r)
    })
    init()
})

onUnmounted(() => {
    emitter.off('mittHandleMessage')
})
</script>

<template>
    <div class="frame" v-loading="frameData.loading" :style="{ height: `${clientHeight}px` }">
        <iframe :src="props.frameSrc || frameSrc" class="frame-iframe" ref="frameRef" />
    </div>
</template>

<style lang="scss" scoped>
.frame {
    z-index: 998;

    .frame-iframe {
        width: 100%;
        height: 100%;
        overflow: hidden;
        border: 0;
        box-sizing: border-box;
    }
}
.main-content {
    margin: 0 !important;
}
</style>
