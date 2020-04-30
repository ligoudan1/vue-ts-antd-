import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { Common } from './modules/common'
import { Setting } from './modules/setting'
Vue.use(Vuex)

const store: StoreOptions<any> = {
  modules: {
    Common,
    Setting
  }
}
export default new Vuex.Store<any>(store)
