import { h, defineComponent } from 'vue'
import { Icon as IconifyIcon, addIcon } from '@iconify/vue/dist/offline'

import help from '@iconify-icons/ep/help'
import refreshRight from '@iconify-icons/ep/refresh-right'
import close from '@iconify-icons/ep/close'
import minus from '@iconify-icons/ep/minus'
import remove from '@iconify-icons/ep/remove'
import setting from '@iconify-icons/ep/setting'
import homeFilled from '@iconify-icons/ep/home-filled'

addIcon("help", help);
addIcon("refresh-right", refreshRight);
addIcon("close", close);
addIcon("minus", minus);
addIcon("remove", remove);
addIcon("setting", setting);
addIcon("home-filled", homeFilled);

// Iconify Icon在Vue里在线使用（用于外网环境） https://docs.iconify.design/icon-components/vue/offline.html
export default defineComponent({
    name: 'saIcon',
    components: { IconifyIcon },
    props: {
        icon: {
            type: String,
            default: '',
        },
        // default element plus icon
        type: {
            type: String,
        },
    },
    render() {
        const attrs = this.$attrs

        return h(
            'i',
            {
                ...attrs,
                class: 'el-icon',
            },
            {
                default: () => [
                    h(IconifyIcon, {
                        icon: this.icon,
                    }),
                ],
            }
        )
    },
})
