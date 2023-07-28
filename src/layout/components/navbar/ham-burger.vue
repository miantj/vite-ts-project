<script setup lang="ts">
export interface Props {
    isActive: boolean
}

const props = withDefaults(defineProps<Props>(), {
    isActive: false,
})
</script>

<template>
    <div class="container" :title="props.isActive ? '点击折叠' : '点击展开'"></div>
</template>

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
