import type { App } from 'vue'
import { createPinia } from 'pinia'
const store = createPinia()

export function setupStore(app: App<Element>) {
  console.warn(11);
  
    app.use(store)
}

export { store }
