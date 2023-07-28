import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { AxiosRequestDataConfig } from './type'
import { baseUrl } from '@/config/env'
import { mock } from '@/config'
import { isArray, isString } from '@/utils/is'
import router from '@/config/router'
import Qs from 'qs'
import { ElMessage } from 'element-plus'

const env = import.meta.env.MODE == 'development'

const defaultConfig: AxiosRequestConfig = {
    baseURL: env && mock ? import.meta.env.VITE_APP_BASE_API : `${baseUrl}`,
    timeout: 30 * 60 * 1000,
    headers: {
        token: sessionStorage.getItem('api_token') as string,
        'Content-Type': 'application/json;charset=UTF-8',
    },
    // 数组格式参数序列化
    paramsSerializer: params => Qs.stringify(params, { indices: false }),
}

const axiosInstance: AxiosInstance = Axios.create(defaultConfig)

// 请求拦截器
axiosInstance.interceptors.request.use(
    request => {
        return request
    },
    err => {
        return err
    }
)

//添加响应拦截器
axiosInstance.interceptors.response.use(
    response => {
        // console.warn('响应拦截器-----------', response)
        return response
    },
    err => {
        return err
    }
)

let duration = 1000, //接口防抖1秒
    apiArr: any[] = [],
    timer: any = {}

export const request = async (data: AxiosRequestDataConfig, message?: 'all' | 'err' | 'suc') => {
    const apiData = JSON.stringify(data)

    if (!apiArr.includes(apiData) || data?.noShake) {
        apiArr.push(apiData)

        return requestData(data, message)
    } else {
        return new Promise<void>((resolve, reject) => {
            if (timer[apiData]) clearTimeout(timer[apiData])
            timer[apiData] = setTimeout(async () => {
                apiArr = []
                const res = await requestData(data, message)
                resolve(res)
            }, duration)
        })
    }
}

/****************************************   request参数扩展   ***************************************
 *
 *  @data   {AxiosRequestDataConfig}
 *  @message {string}      是否ElMessage提示:
 *                           suc {string} 成功不提示;
 *                           err {string} 失败不提示;
 *                           all {string} 成功失败都不展示
 *
 ***********************************************************************************************/
export const requestData = async (data: AxiosRequestDataConfig, message?: 'all' | 'err' | 'suc') => {
    if (message) message.toLowerCase()

    let responseJson = await axiosInstance(data)

    if (data.raw) return responseJson

    if (responseJson.status == 200) {
        if (responseJson.data == 'nologin') {
            setTimeout(() => {
                router.push('/login')
            }, 300)
        }

        if (responseJson.data.status == 'SUCCESS') {
            if (
                message !== 'all' &&
                message !== 'suc' &&
                responseJson.data?.msg &&
                responseJson.data?.msg != 'SUCCESS'
            ) {
                ElMessage({
                    message: `${responseJson.data.msg}`,
                    type: 'success',
                    showClose: true,
                    offset: 74,
                })
            }
            return responseJson.data.data || true
        }

        if (responseJson.data.status == 'FAIL') {
            if (message !== 'all' && message !== 'err' && responseJson.data?.msg) {
                ElMessage({
                    message: `${responseJson.data.msg}`,
                    type: 'error',
                    showClose: true,
                    offset: 74,
                })
            }
            return false
        }

        if (data.responseType == 'blob') {
            responseJson.data.headers = responseJson.headers
        }

        return responseJson.data
    }
    if (message !== 'all') {
        ElMessage({
            message: `${responseJson}`,
            type: 'error',
            showClose: true,
            offset: 74,
        })
    }
}

export const requestFormData = async (data: AxiosRequestDataConfig, message?: 'all' | 'err' | 'suc') => {
    let formData = new FormData()

    Object.keys(data.data).forEach(key => {
        if (data.data[key]) {
            if (data.data[key].constructor === File) {
                formData.append(key, data.data[key])
            } else {
                if (key.includes('File') && isArray(data.data[key])) {
                    for (const iterator of data.data[key]) {
                        formData.append(key, iterator.file)
                    }
                } else {
                    if (isString(data.data[key])) {
                        formData.append(key, data.data[key])
                    } else {
                        formData.append(key, JSON.stringify(data.data[key]))
                    }
                }
            }
        }
    })

    data.data = formData
    data.headers = { 'content-type': 'multipart/form-data' }
    return await request(data, message)
}

export const http = axiosInstance
export default { http, request, requestFormData }
