import SaTablePage from './SaTablePage/table-page.vue'
import SaTreeSelect from './SaTreeSelect/index.vue'
import SaCascader from './SaCascader/index.vue'


export default {
    install(app: any) {
        app.component('SaTablePage', SaTablePage)
        app.component('SaTreeSelect', SaTreeSelect)
        app.component('SaCascader', SaCascader)
    }
}