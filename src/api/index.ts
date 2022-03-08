import { get, post } from '@/utils/http'

export const getAsyncRoutes = (params?: object) => {
    return get({ url: '/api' })
}
