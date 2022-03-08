<template>
    <section>
        <Navbar />

        <!-- <router-view /> -->
    </section>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'

import Navbar from './navbar/index.vue'
import { warn } from 'console'

const input = ref('')
const value1 = ref(null)
const value2 = ref()
</script>

<style scoped>
.app-main {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow-x: hidden;
}

.app-main-nofixed-header {
    width: 100%;
    min-height: 100vh;
    position: relative;
}

.main-content {
    margin: 24px;
}
</style>
