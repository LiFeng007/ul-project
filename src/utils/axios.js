/*
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-15 10:09:56
 * @LastEditors: Fred
 * @LastEditTime: 2021-04-01 20:01:41
 */
import axios from 'axios'

import { Message } from 'element-ui'

import vm from '../main'

import NProgress from 'nprogress'; // progress bar

const DEV_BASE_URL = '/api'
const PROD_BASE_URL = 'https://dt-community.ulcampaign.com/api/'
const NEW_BASR_URL = 'http://161.189.10.112:8333/'
const BASE_URL = DEV_BASE_URL
// 创建新的axios实例
const service = axios.create({
  baseURL: BASE_URL,
  // timeout: 3 * 1000
})

// 请求拦截器
service.interceptors.request.use(config => {
  NProgress.start() // 设置加载进度条(开始..)
  const token = window.localStorage.getItem('x-token') ? window.localStorage.getItem('x-token') : 'initialization'
  if (token) {
    config.headers['x-token'] = token
  }
  return config
}, error => {
  Promise.reject(error)
})

// 3.响应拦截器
service.interceptors.response.use(response => {
  NProgress.done() // 设置加载进度条(结束..)

  const code = response.data.code

  switch (code) {
    case 'E401':
      vm && vm.$loginAgain('您已被登出,请重新登录~');
      break;
    case 'E4006':
      vm && vm.$loginAgain('当前登录凭证已过期,请重新登录~');
      break;
    case 'E500':
      Message.error('内部错误')
    default:
      break;
  }
  return response
}, error => {

  console.log(error);
  /***** 接收到异常响应的处理开始 *****/
  if (error && error.response) {
    // 1.公共错误处理
    // 2.根据响应码具体处理
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break;
      case 401:
        error.message = '未授权，请重新登录'
        break;
      case 403:
        error.message = '拒绝访问'
        break;
      case 404:
        error.message = '请求错误,未找到该资源'
        // window.location.href = "/NotFound"
        break;
      case 405:
        error.message = '请求方法未允许'
        break;
      case 408:
        error.message = '请求超时'
        break;
      case 500:
        error.message = '服务器端出错'
        break;
      case 501:
        error.message = '网络未实现'
        break;
      case 502:
        error.message = '网络错误'
        break;
      case 503:
        error.message = '服务不可用'
        break;
      case 504:
        error.message = '网络超时'
        break;
      case 505:
        error.message = 'http版本不支持该请求'
        break;
      default:
        error.message = `请求错误`
    }
  } else {
    // 超时处理
    // if (JSON.stringify(error).includes('timeout')) {
    //   Message.error('服务器响应超时，请刷新当前页')
    // }
    // error.message('连接服务器失败')
  }

  // Message.error(error.message)
  /***** 处理结束 *****/
  return Promise.resolve(error.response)
})


export default service;