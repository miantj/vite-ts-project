import { isArray } from '@/utils/is'
import { ElMessage } from 'element-plus'

/**
 * 统一消息提示
 */
export const SaMessage = (msg: string, type: 'success' | 'warning' | 'info' | 'error' = 'success') => {
    ElMessage({
        message: msg,
        type: type,
        showClose: true,
        offset: 90,
    })
}

/**
 * 获取url参数
 */
export const handleUrlArgs = (url: string, params: string) => {
    var res = new RegExp('(?:&|/?)' + params + '=([^&$]+)').exec(url)
    return res ? res[1] : ''
}

/**
 * 深度合并
 */
export const deepClone = (obj: any) => {
    // 对常见的“非”值，直接返回原来值
    if ([null, undefined, NaN, false].includes(obj)) return obj
    if (typeof obj !== 'object' && typeof obj !== 'function') {
        //原始类型直接返回
        return obj
    }
    var o = (isArray(obj) ? [] : {}) as any
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            o[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
        }
    }
    return o
}

/**
 * JS对象深度合并
 */
export const deepMerge = (target: any = {}, source: any = {}) => {
    target = deepClone(target)
    if (typeof target !== 'object' || typeof source !== 'object') return false
    for (var prop in source) {
        if (!source.hasOwnProperty(prop)) continue
        if (prop in target) {
            if (typeof target[prop] !== 'object') {
                target[prop] = source[prop]
            } else {
                if (typeof source[prop] !== 'object') {
                    target[prop] = source[prop]
                } else {
                    if (target[prop].concat && source[prop].concat) {
                        target[prop] = target[prop].concat(source[prop])
                    } else {
                        target[prop] = deepMerge(target[prop], source[prop])
                    }
                }
            }
        } else {
            target[prop] = source[prop]
        }
    }
    return target
}

/**
 * 是否短信验证码
 */
export const code = (value: number, len: number = 6) => {
    return new RegExp(`^\\d{${len}}$`).test(String(value))
}

/**
 * 验证电子邮箱格式
 */
export const email = (value: string) => {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value)
}

/**
 * 验证手机格式
 */
export const mobile = (value: string) => {
    return /^1[3-9]\d{9}$/.test(value)
}

/**
 * 验证URL格式
 */
export const url = (value: string) => {
    return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value)
}

/**
 * 验证IP格式
 */
export const ip = (value: string) => {
    return /^((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))$/.test(value)
}

/**
 * 验证日期格式
 */
export const date = (value: string) => {
    return !/Invalid|NaN/.test(new Date(value).toString())
}

/**
 * 验证ISO类型的日期格式
 */
export const dateISO = (value: string) => {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
}

/**
 * 验证十进制数字
 */
export const number = (value: number) => {
    return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(String(value))
}

/**
 * 验证整数
 */
export const digits = (value: number) => {
    return /^\d+$/.test(String(value))
}

/**
 * 验证身份证号码
 */
export const idCard = (value: string) => {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)
}

/**
 * 是否车牌号
 */
export const carNo = (value: string) => {
    // 新能源车牌
    const xreg =
        /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/
    // 旧车牌
    const creg =
        /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/
    if (value.length === 7) {
        return creg.test(value)
    } else if (value.length === 8) {
        return xreg.test(value)
    } else {
        return false
    }
}

/**
 * 金额,只允许2位小数
 */
export const amount = (value: string) => {
    //金额，只允许保留两位小数
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value)
}

/**
 * 中文
 */
export const chinese = (value: string) => {
    let reg = /^[\u4e00-\u9fa5]+$/gi
    return reg.test(value)
}

/**
 * 只能输入字母
 */
export const letter = (value: string) => {
    return /^[a-zA-Z]*$/.test(value)
}

/**
 * 只能是字母或者数字
 */
export const enOrNum = (value: string) => {
    //英文或者数字
    let reg = /^[0-9a-zA-Z]*$/g
    return reg.test(value)
}

/**
 * 验证一个值范围[min, max]
 */
export const range = (value: string, param: any) => {
    return value >= param[0] && value <= param[1]
}

/**
 * 验证一个长度范围[min, max]
 */
export const rangeLength = (value: string, param: any) => {
    return value.length >= param[0] && value.length <= param[1]
}

/**
 * 是否固定电话
 */
export const landline = (value: string) => {
    let reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/
    return reg.test(value)
}

/**
 * 是否json字符串
 */
export const jsonString = (value: string) => {
    if (typeof value == 'string') {
        try {
            var obj = JSON.parse(value)
            if (typeof obj == 'object' && obj) {
                return true
            } else {
                return false
            }
        } catch (e) {
            return false
        }
    }
    return false
}

/**
 * 去除空格
 */
export const trim = (str: string, pos = 'both') => {
    if (pos == 'both') {
        return str?.replace(/^\s+|\s+$/g, '')
    } else if (pos == 'left') {
        return str?.replace(/^\s*/, '')
    } else if (pos == 'right') {
        return str?.replace(/(\s*$)/g, '')
    } else if (pos == 'all') {
        return str?.replace(/\s+/g, '')
    } else {
        return str
    }
}

/**
 * 过滤输入表情
 */
export const filterEmoji = (value: any) => {
    const regStr =
        /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi
    return value.replace(regStr, '')
}

/**
 * 防抖函数
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
let timeout: NodeJS.Timeout | null | undefined = null
export const debounce = (func: () => any, wait = 500, immediate = false) => {
    // 清除定时器
    if (timeout !== null) clearTimeout(timeout)
    // 立即执行，此类情况一般用不到
    if (immediate) {
        var callNow = !timeout
        timeout = setTimeout(function () {
            timeout = null
        }, wait)
        if (callNow) typeof func === 'function' && func()
    } else {
        // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
        timeout = setTimeout(function () {
            typeof func === 'function' && func()
        }, wait)
    }
}

/**
 * 节流函数
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
let timer, flag: boolean
export const throttle = (func: () => any, wait = 500, immediate = true) => {
    if (immediate) {
        if (!flag) {
            flag = true
            // 如果是立即执行，则在wait毫秒内开始时执行
            typeof func === 'function' && func()
            timer = setTimeout(() => {
                flag = false
            }, wait)
        }
    } else {
        if (!flag) {
            flag = true
            // 如果是非立即执行，则在wait毫秒内的结束处执行
            timer = setTimeout(() => {
                flag = false
                typeof func === 'function' && func()
            }, wait)
        }
    }
}
