/*
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-17 10:08:40
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-18 15:50:48
 */

// 导入封装好的axios实例
import request from './axios'

const http = {
  /**
   * methods: 请求
   * @param url 请求地址 
   * @param params 请求参数
   * @param contentType 请求头格式 默认application/json
   */
  get(url, params) {
    const config = {
      method: 'get',
      url: url
    }
    if (params) config.params = params
    return request(config)
  },
  post(url, params, contentType) {
    const config = {
      method: 'post',
      url: url,
      headers: {
        'Content-type': contentType ? contentType.type : 'application/json',
        cache: false,
        processData: false, //默认为true，默认情况下，发送的数据将被转换为对象，设为false不希望进行转换
      }
    }
    if (params) {config.data = params }
    return request(config)
  },
  put(url, params) {
    const config = {
      method: 'put',
      url: url
    }
    if (params) config.params = params
    return request(config)
  },
  delete(url, params) {
    const config = {
      method: 'delete',
      url: url
    }
    if (params) config.params = params
    return request(config)
  }
}
//导出
export default http
