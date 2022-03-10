<template>
    <div class="container" :title="props.isActive ? '点击折叠' : '点击展开'" @click="toggleClick"></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
export interface Props {
    isActive: boolean
}

const props = withDefaults(defineProps<Props>(), {
    isActive: false,
})

const emit = defineEmits<{
    (e: 'toggleClick'): void
}>()

const toggleClick = () => {
    emit('toggleClick')
}
</script>

<style scoped>
.hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
}
.container {
    padding: 0 15px;
}

.is-active {
    transform: rotate(180deg);
}
</style>
