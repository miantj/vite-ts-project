<template>
    <div class="navbar">
        <Hamburger class="hamburger-container" />


    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
// import { useNav } from '../hooks/nav'
import { useRoute } from 'vue-router'
import Notice from './notice/index.vue'
import mixNav from './sidebar/mixNav.vue'
import avatars from '/@/assets/avatars.jpg'
import Hamburger from './hamBurger.vue'
import { watch, getCurrentInstance } from 'vue'
import Breadcrumb from './sidebar/breadCrumb.vue'
// import { deviceDetection } from '/@/utils/deviceDetection'
import screenfull from '../components/screenfull/index.vue'
// import globalization from '/@/assets/svg/globalization.svg?component'

const route = useRoute()
const { locale } = useI18n()
// const instance = getCurrentInstance().appContext.config.globalProperties.$storage
// const { logout, onPanel, changeTitle, toggleSideBar, pureApp, usename, getDropdownItemStyle } = useNav()

watch(
    () => locale.value,
    () => {
        // changeTitle(route.meta)
    }
)

function translationCh() {
    // instance.locale = { locale: 'zh' }
    locale.value = 'zh'
}

function translationEn() {
    // instance.locale = { locale: 'en' }
    locale.value = 'en'
}
</script>

<style lang="scss" scoped>
.navbar {
    width: 100%;
    height: 48px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
        line-height: 48px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;
    }

    .vertical-header-right {
        display: flex;
        min-width: 280px;
        height: 48px;
        align-items: center;
        color: #000000d9;
        justify-content: flex-end;

        :deep(.dropdown-badge) {
            &:hover {
                background: #f6f6f6;
            }
        }

        .screen-full {
            cursor: pointer;

            &:hover {
                background: #f6f6f6;
            }
        }

        .globalization {
            height: 48px;
            width: 40px;
            padding: 11px;
            cursor: pointer;

            &:hover {
                background: #f6f6f6;
            }
        }

        .el-dropdown-link {
            width: 100px;
            height: 48px;
            padding: 10px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            cursor: pointer;
            color: #000000d9;

            &:hover {
                background: #f6f6f6;
            }

            p {
                font-size: 14px;
            }

            img {
                width: 22px;
                height: 22px;
                border-radius: 50%;
            }
        }

        .el-icon-setting {
            height: 48px;
            width: 38px;
            padding: 12px;
            display: flex;
            cursor: pointer;
            align-items: center;

            &:hover {
                background: #f6f6f6;
            }
        }
    }

    .breadcrumb-container {
        float: left;
    }
}

.translation {
    ::v-deep(.el-dropdown-menu__item) {
        padding: 5px 40px;
    }

    .check-zh {
        position: absolute;
        left: 20px;
    }

    .check-en {
        position: absolute;
        left: 20px;
    }
}

.logout {
    max-width: 120px;

    ::v-deep(.el-dropdown-menu__item) {
        min-width: 100%;
        display: inline-flex;
        flex-wrap: wrap;
    }
}
</style>
