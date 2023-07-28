/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 *
 */
let baseUrl = ''
let baseImgPath = ''

switch (import.meta.env.MODE) {
    case 'development': //测试环境
        // baseUrl = 'http://sa.gzsa.net:38443/osp-applet/rest/'
        baseUrl = 'http://localhost:8080/osp-applet/rest'
        baseImgPath = 'http://localhost:8080/osp-applet/rest'
        break
    case 'production': //生产环境
        baseUrl = `https://${location.host}/osp-applet/rest`
        // baseUrl = 'http://sa.gzsa.net:38443/osp-applet/rest/'
        baseImgPath = 'https://sa.gzsa.net:38443/osp-applet/rest'
        break
}

export { baseUrl, baseImgPath }
