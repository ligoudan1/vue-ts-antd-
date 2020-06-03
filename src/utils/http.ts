// import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import merge from 'lodash/merge'

const http: any = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

// 正在请求的请求url数组
let pending: string[] = [];

// 是否正在请求
let isPending = (url: string) => pending.includes(url);

// 移除完成的请求
let removePending = (url: string) => {
  let index = pending.findIndex(item => item === url);
  pending.splice(index, 1);
};

/**
 * 请求拦截
 */
http.interceptors.request.use((config: any) => {
  if (!config.headers.noIntercept && isPending(config.url)) {
    //终止请求
    console.log(config.url)
    return Promise.reject(new Error('重复请求已被拦截!'));
  }

  pending.push(config.url);
  config.headers['token'] = 'token' // 请求头带上token
  return config
}, (error: any) => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use((response: any) => {
  removePending(response.config.url);
  if (response.data && response.data.code === 401) { // 401, token失效
    // 这里做清除登录的操作

    router.push({ name: 'login' })
  }
  return response
}, (error: any) => {
  pending = [];
  return Promise.reject(error)
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName: string) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi]前缀做代理拦截!
  return process.env.VUE_APP_BASE_API + actionName
}

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefultParams = true) => {
  var defaults = {
    't': new Date().getTime()
  }
  return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
  var defaults = {
    't': new Date().getTime()
  }
  data = openDefultdata ? merge(defaults, data) : data
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

export default http;