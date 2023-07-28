export interface AxiosTransformer {
    (data: any, headers?: any): any
}

export interface AxiosBasicCredentials {
    username: string
    password: string
}

export interface AxiosProxyConfig {
    host: string
    port: number
    auth?: {
        username: string
        password: string
    }
    protocol?: string
}

export type Method =
    | 'get'
    | 'GET'
    | 'delete'
    | 'DELETE'
    | 'head'
    | 'HEAD'
    | 'options'
    | 'OPTIONS'
    | 'post'
    | 'POST'
    | 'put'
    | 'PUT'
    | 'patch'
    | 'PATCH'
    | 'link'
    | 'LINK'
    | 'unlink'
    | 'UNLINK'

export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

export interface AxiosRequestDataConfig {
    url?: string
    method?: Method
    baseURL?: string
    transformRequest?: AxiosTransformer | AxiosTransformer[]
    transformResponse?: AxiosTransformer | AxiosTransformer[]
    headers?: any
    params?: any
    paramsSerializer?: (params: any) => string
    data?: any
    timeout?: number
    timeoutErrorMessage?: string
    withCredentials?: boolean
    adapter?: any
    auth?: AxiosBasicCredentials
    responseType?: ResponseType
    xsrfCookieName?: string
    xsrfHeaderName?: string
    onUploadProgress?: (progressEvent: any) => void
    onDownloadProgress?: (progressEvent: any) => void
    maxContentLength?: number
    validateStatus?: (status: number) => boolean
    maxRedirects?: number
    socketPath?: string | null
    httpAgent?: any
    httpsAgent?: any
    proxy?: AxiosProxyConfig | false
    noShake?: boolean //接口防抖
    raw?: boolean //返回原数据
}
