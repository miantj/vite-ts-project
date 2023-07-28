<template>
    <el-config-provider :locale="currentLocale">
        <router-view />
    </el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { storageSession } from '@/utils/storage'
import { useNav } from '@/layout/hook/nav'
import { version, name } from '../package.json'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const themesAll = import.meta.glob('./style/themes.ts', { eager: true }) as any

export default defineComponent({
    name: 'app',
    components: {
        [ElConfigProvider.name]: ElConfigProvider,
    },
    computed: {
        currentLocale() {
            return zhCn
        },
    },
    mounted() {
        storageSession.setItem('version', { name: name, version: version })
        const { settings, switchTheme } = useNav()
        let theme = ''
        for (const key in themesAll) {
            if (themesAll[key].default && JSON.stringify(themesAll[key].default) !== '{}') {
                for (const type in themesAll[key].default) {
                    theme = type
                    if (type == settings.theme) break
                }
            }
        }

        switchTheme(theme)

        // window.parent.postMessage({ source: 'isReady' }, '*')
    },
})
</script>

<style></style>
