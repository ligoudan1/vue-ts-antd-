import Vue from 'vue'
import App from './App.vue'

import router from './router' // 路由
import store from './store' // vuex

import '@/element-ui' // 引入element-ui框架
import 'element-ui/lib/theme-chalk/index.css' // 引入element-ui的css文件

import filters from '@/filters' // 引入项目中的过滤器

import '@/style/index.scss' // 引入全局scss样式

import '@/components' // 全局自动注册组件

import i18n from '@/lang' // 国际化

import '@/icons' // 引入项目图标

Vue.config.productionTip = false

// 加载项目中的过滤器
for (const key in filters) {
  Vue.filter(key, filters[key])
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
