import Vue from 'vue'
import Antd from 'ant-design-vue' // 导入所有组件
import 'ant-design-vue/dist/antd.css' // 导入所有组件样式
import App from './App.vue'
import router from './router' // 路由
import store from './store' // vuex
import api from '@/utils/api' // 引入项目api
import ajax from '@/utils/http'
Vue.config.productionTip = false

// cesium
// var Cesium = require('cesium/Cesium');
// var widgets = require('cesium/Widgets/widgets.css');
// Vue.prototype.Cesium = Cesium
// Vue.prototype.widgets = widgets

Vue.prototype.$ajax = ajax // ajax请求方法
Vue.prototype.$api = api // ajax请求方法
Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
