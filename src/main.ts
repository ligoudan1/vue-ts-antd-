import Vue from 'vue'
import App from './App.vue'

import router from './router' // 路由
import store from './store' // vuex

import '@/element-ui' // api: https://github.com/ElemeFE/element
import 'element-ui/lib/theme-chalk/index.css'

import '@/assets/scss/index.scss' // 引入全局scss样式

import '@/views/components' // 全局自动注册组件

import i18n from '@/lang' // 国际化

import '@/icons' // 引入项目图标

import api from '@/utils/api' // 引入项目api

Vue.config.productionTip = false

Vue.prototype.$api = api // 项目整理的api



new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
