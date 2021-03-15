/*
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-15 10:09:56
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-15 10:11:25
 */

import axios from 'axios';
import NProgress from 'nprogress'; // progress bar

// 开发环境需要带一个请求头到服务器
axios.interceptors.request.use(
  config => {
      NProgress.start()
    return config;
  },
  err => {
    return Promise.reject(err);
  });


//添加一个响应拦截
axios.interceptors.response.use(function(response) {

  
  NProgress.done() // 设置加载进度条(结束..)
  return response;

}, function(error) {

  return Promise.reject(error);
});


export default axios;