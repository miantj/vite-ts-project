<script setup lang="ts">
import { useLayoutStoreHook } from '@/layout/store'
import { storageSession } from '@/utils/storage'
import { childMenuPermissions } from '@/config'

const router = useRouter()
const route = useRoute()

const props = defineProps({
    item: {
        type: Object,
        required: true,
    },

    // 是否校验菜单权限
    permissions: {
        type: Boolean,
        define: false,
    },
})

const childMenu = storageSession.getItem('childMenu')

// 校验是否显示子菜单
function isShowChildren(data?: any): Boolean {
    if (useLayoutStoreHook().settings.layout == 'mix') {
        return true
    } else {
        if (data) {
            return !data.meta?.hiddenChildren && data.children ? true : false
        }
        return !props.item.meta?.hiddenChildren && props.item.children ? false : true
    }
}

function pathRouter(meta: any) {
    const { fullPath, query } = unref(route)

    if (fullPath == meta.path) {
        // 重新加载
        router.replace({
            path: '/redirect' + fullPath,
            query: query,
        })
    } else {
        router.push({
            path: meta.path,
            query: meta?.meta?.query,
        })
    }
}

const menuList = computed(() => {
    return props.item
})

const showChildMenu = (item: any, parPath: any) => {
    return (childMenuPermissions && !childMenu?.includes(`${parPath}/${item.name}`)) || item.meta.hidden
}
</script>

<template>
    <template v-if="isShowChildren()">
        <el-menu-item
            v-show="menuList.meta && !menuList.meta?.hidden"
            :index="menuList.redirect || menuList.path"
            @click="pathRouter(menuList)"
        >
            <sa-icon v-if="menuList.meta?.icon" :icon="menuList.meta.icon" />
            <template #title>{{ menuList.meta?.title }}</template>
        </el-menu-item>
    </template>

    <template v-else>
        <el-sub-menu
            v-show="menuList.meta && !menuList.meta?.hidden"
            :index="menuList.path"
            popper-class="sa-popper-menu"
            :popper-offset="20"
        >
            <template #title>
                <sa-icon v-show="menuList.meta?.icon" :icon="menuList.meta.icon" />
                <span>{{ menuList.meta?.title }}</span>
            </template>

            <el-menu-item-group v-for="child in menuList.children" :key="child.path" @click="pathRouter(child)">
                <el-sub-menu v-show="isShowChildren(child)" :index="child.path">
                    <template #title>
                        <sa-icon v-if="child.meta?.icon" :icon="child.meta.icon" />
                        <span>{{ child.meta?.title }}</span>
                    </template>
                    <el-menu-item-group
                        v-for="child2 in child.children"
                        :key="child2.path"
                        @click.stop="pathRouter(child2)"
                    >
                        <el-menu-item v-show="child2.meta && !child2.meta?.hidden" :index="child2.path">
                            <sa-icon v-show="child2.meta?.icon" :icon="child2.meta.icon" />
                            <template #title>{{ child2.meta?.title }}</template>
                        </el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>

                <el-menu-item v-show="child.meta && !showChildMenu(child, menuList.path)" :index="child.path">
                    <sa-icon v-if="child.meta?.icon" :icon="child.meta.icon" />
                    <template #title>{{ child.meta?.title }}</template>
                </el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
    </template>
</template>
<style lang="scss" scoped>
.el-icon {
    font-size: 20px;
}
</style>
