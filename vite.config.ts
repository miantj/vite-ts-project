import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import svgLoader from 'vite-svg-loader'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
// import compressPlugin from 'vite-plugin-compression';
import { viteMockServe } from 'vite-plugin-mock'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import moment from 'moment'

// 路径查找
const pathResolve = (dir: string): string => {
    return resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default ({ mode }: any) => {
    const __DEV__ = mode === 'development'
    return defineConfig({
        base: './',
        plugins: [
            legacy({
                targets: ['chrome 52'],
            }),
            vue(),
            // jsx、tsx语法支持
            vueJsx(),
            // svg组件化支持
            svgLoader(),
            //mock支持
            viteMockServe({
                supportTs: false,
                logger: false,
                mockPath: './src/mock/', //mock文件夹路径
            }),
            // ElementPlus按需引入
            __DEV__
                ? AutoImport({
                      imports: ['vue', 'vue-router'],
                      dts: 'src/auto-import.d.ts',
                  })
                : AutoImport({
                      imports: ['vue', 'vue-router'],
                      dts: 'src/auto-import.d.ts',
                      resolvers: [ElementPlusResolver()],
                  }),

            __DEV__
                ? Components({
                      resolvers: [IconsResolver()],
                  })
                : Components({
                      resolvers: [ElementPlusResolver(), IconsResolver()],
                  }),

            Icons({ compiler: 'vue3', autoInstall: true }),
            //gzip静态资源压缩
            // compressPlugin({
            //     ext: '.gz', //文件类型
            //     deleteOriginFile: false
            // }),
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

        build: {
            outDir: `osp_${moment().format('YYYY-MM-DD HH.mm.ss')}`,
            // 线上环境删除console
            minify: 'terser',
            chunkSizeWarningLimit: 1500,
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
            },
            rollupOptions: {
                output: {
                    entryFileNames: `assets/[name].${new Date().getTime()}.js`,
                    chunkFileNames: `assets/[name].${new Date().getTime()}.js`,
                    assetFileNames: `assets/[name].${new Date().getTime()}.[ext]`,
                },
            },
        },
    })
}
