import { storageLocal, storageSession } from '@/utils/storage'
import { isArray } from '@/utils/is'
import { piniaStorageLocal, piniaStorageSession } from '@/config'
import { createPinia } from 'pinia'

export const piniaKey = 'tcs-pinia'

/**
 * @name: mtj
 * @date: 2022-03-14
 * @desc: 数据持久化
 */

const piniaPersistedstate = (pinia: any) => {
    const { store } = pinia
    const newPiniaStorageLocal = Object.assign(
        {},
        {
            'pure-app': ['navTags', 'settings'],
        },
        piniaStorageLocal
    )

    const pathListLocal = newPiniaStorageLocal[store.$id] as string[]
    if (pathListLocal && pathListLocal.length > 0) {
        const localStoreVal: any = storageLocal.getItem(`${piniaKey}_Local_${store.$id}`)

        store.$subscribe(
            () => {
                storageLocal.setItem(
                    `${piniaKey}_Local_${store.$id}`,
                    pathListLocal.reduce((val: Record<string, any>, key: string) => {
                        val[key] = store.$state[key] as any
                        return val
                    }, {})
                )
            },
            { detached: true }
        )

        for (const key in localStoreVal) {
            const value = localStoreVal[key]

            // map类型赋值
            if (key == 'navTags' || (isArray(value) && isArray(value[0]))) {
                for (const i in value) {
                    pinia.store[key].set(value[i][0], value[i][1])
                }
            } else {
                pinia.store[key] = value
            }
        }

        return pinia
    }

    const pathListSession = piniaStorageSession[store.$id] as string[]
    if (pathListSession && pathListSession.length > 0) {
        const sessionStoreVal: any = storageSession.getItem(`${piniaKey}_Session_${store.$id}`)

        store.$subscribe(
            () => {
                storageSession.setItem(
                    `${piniaKey}_Session_${store.$id}`,
                    pathListSession.reduce((val: Record<string, any>, key: string) => {
                        val[key] = store.$state[key] as any
                        return val
                    }, {})
                )
            },
            { detached: true }
        )

        for (const key in sessionStoreVal) {
            const value = sessionStoreVal[key]

            // map类型赋值
            if (key == 'navTags' || (isArray(value) && isArray(value[0]))) {
                for (const i in value) {
                    pinia.store[key].set(value[i][0], value[i][1])
                }
            } else {
                pinia.store[key] = value
            }
        }

        return pinia
    }

    return pinia
}

const store = createPinia()
store.use(piniaPersistedstate)

export default store
