import { h, defineComponent, Component } from 'vue'

export const IconFont = defineComponent({
    name: 'iconFont',
    props: {
        icon: {
            type: String,
            default: '',
        },
    },
    render() {
        const attrs = this.$attrs
        if (Object.keys(attrs).includes('uni') || attrs?.iconType === 'uni') {
            return h(
                'i',
                {
                    class: 'iconfont',
                    ...attrs,
                },
                this.icon
            )
        } else if (Object.keys(attrs).includes('svg') || attrs?.iconType === 'svg') {
            return h(
                'svg',
                {
                    class: 'icon-svg',
                    'aria-hidden': true,
                },
                {
                    default: () => [
                        h('use', {
                            'xlink:href': `#${this.icon}`,
                        }),
                    ],
                }
            )
        } else {
            return h('i', {
                class: `iconfont ${this.icon}`,
                ...attrs,
            })
        }
    },
})

export function useRenderIcon(icon: Component | string): Component | string {
    // console.warn(typeof icon == 'string')

    //  判断是否属于iconfont
    if (typeof icon == 'string' && icon.includes('icon-')) {
        return defineComponent({
            name: 'IconFont',
            render() {
                return h(IconFont, {
                    icon: icon,
                })
            },
        })
    } else {
        return icon
    }
}

export default {
    IconFont,
    useRenderIcon,
}
