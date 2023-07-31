<script setup lang="ts">
// import logo from '@/assets/logo/logo.png'

const title = '广州世安'
</script>

<template>
    <div class="sidebar-logo-container">
        <router-link :title="title" class="sidebar-logo-link" to="/">
            <!-- <el-image :src="logo" /> -->
        </router-link>
    </div>
</template>

<style lang="scss" scoped></style>
