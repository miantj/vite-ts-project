/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * baseImgPath: 图片存放地址
 *
 */
let baseUrl = ''
let baseImgPath

switch (import.meta.env.MODE) {
    case 'development': //测试环境
        // baseUrl = 'https://192.168.0.39:8443/osp-base'
        break
    case 'production': //生产环境
        baseUrl = ''
        break
}

export { baseUrl }
