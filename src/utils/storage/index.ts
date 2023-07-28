import { toRaw } from 'vue'
import { piniaKey } from '@/store'
import { isMap, isString } from '@/utils/is'
interface ProxyStorage {
    getItem(key: string): any
    setItem(Key: string, value: string): void
    removeItem(key: string): void
    clear(): void
}

//sessionStorage operate
class sessionStorageProxy implements ProxyStorage {
    protected storage: ProxyStorage

    constructor(storageModel: ProxyStorage) {
        this.storage = storageModel
    }

    // 存
    public setItem(key: string, value: any): void {
        if (key.includes(piniaKey)) {
            let obj = {} as any
            for (var k in value) {
                let data = toRaw(value[k])
                if (isMap(data)) {
                    obj[k] = Array.from(toRaw(value[k]))
                } else {
                    obj[k] = data
                }
            }
            this.storage.setItem(key, JSON.stringify(obj))
        } else {
            this.storage.setItem(key, isString(value) ? value : JSON.stringify(value))
        }
    }

    // 取
    public getItem(key: string): any {
        try {
            return JSON.parse(this.storage.getItem(key))
        } catch (error) {
            return this.storage.getItem(key)
        }
    }

    // 删
    public removeItem(key: string): void {
        this.storage.removeItem(key)
    }

    // 清空
    public clear(): void {
        this.storage.clear()
    }
}

//localStorage operate
class localStorageProxy extends sessionStorageProxy implements ProxyStorage {
    constructor(localStorage: ProxyStorage) {
        super(localStorage)
    }
}

export const storageSession = new sessionStorageProxy(sessionStorage)

export const storageLocal = new localStorageProxy(localStorage)
