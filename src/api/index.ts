import { request, requestFormData } from '@/utils/http'
import { baseImgPath } from '@/config/env'

// 动态路由
export const getMenu = (params?: object) => {
    return request({ url: '/api/getMenu' })
}

// 权限校验
export const getPermissions = (params?: object) => {
    return request({ url: '/api/permissions' })
}
