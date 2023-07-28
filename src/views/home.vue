<script setup lang="ts">
let gridData = [
    { name: 1, value: '2332' },
    { name: 2, value: '2332' },
    { name: 3, value: '2332' },
    { name: 4, value: '2332' },
    { name: 5, value: '2332' },
    { name: 6, value: '2332' },
    { name: 7, value: '2332' },
    { name: 8, value: '2332' },
    { name: 9, value: '2332' },
    { name: 10, value: '2332' },
]
onMounted(async () => {})
</script>
<template>
    <div>
        <div class="grid">
            <div v-for="item of gridData" class="grid-item">
                {{ item.name }}
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 5px;
    font-size: 18px;
    text-align: center;
}

.grid-item {
    background-color: #f2f2f2;
    padding: 10px;
}
</style>
