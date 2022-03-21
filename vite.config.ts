import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import ViteComponents, { ElementPlusResolver } from 'vite-plugin-components'
import { visualizer } from 'rollup-plugin-visualizer'
import removeConsole from 'vite-plugin-remove-console'

// 路径查找
const pathResolve = (dir: string): string => {
    return resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default ({ mode }) => {
    console.warn(mode)
    const __DEV__ = mode === 'development'
    return defineConfig({
        base: '/',
        plugins: [
            vue(),
            // svg组件化支持
            svgLoader(),
            // 线上环境删除console
            removeConsole(),
            // ElementPlus按需引入
            __DEV__
                ? null
                : ViteComponents({
                      customComponentResolvers: [ElementPlusResolver()],
                  }),
            // 打包分析
            visualizer(),
        ],
        resolve: {
            // 设置别名
            alias: [{ find: '@', replacement: pathResolve('./src') }],
        },
        server: {
            open: true,
            // 跨越请求
            // proxy: {
            //     '/api': {
            //         target: 'https://192.168.0.39:8443/osp-base/', // 后台接口
            //         changeOrigin: true,
            //         secure: false, // 如果是https接口，需要配置这个参数
            //         rewrite: path => path.replace(/^\/api/, ''),
            //     },
            // },
        },
        css: {
            // 修复elment plus 打包提示@charset "UTF-8"报黄
            postcss: {
                plugins: [
                    {
                        postcssPlugin: 'internal:charset-removal',
                        AtRule: {
                            charset: atRule => {
                                if (atRule.name === 'charset') {
                                    atRule.remove()
                                }
                            },
                        },
                    },
                ],
            },
        },
    })
}
