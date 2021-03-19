/*
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 14:50:11
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-19 14:40:42
 */
import Vue from 'vue'

import App from './App.vue'

import {router} from '@/router/router'

import store from '@/store/store'

import ElementUI from 'element-ui'

import {filters} from './filters' // global filters

import 'element-ui/lib/theme-chalk/index.css'

import './registerServiceWorker'

import '@/style/index.scss'

import '@/assets/icon/iconfont.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

const vm = new Vue({
  methods: {
    /**
     * 开启一个提示框 并关闭之前所有提示框
     * @param {message} 提示信息
     * @param {type} 提示类型 依element定义类型
     */
    $tipsInfo(message, type) {
      this.$message.closeAll()
      this.$message[type]({ message: message })
    } , 
    /**
     * 提示用户需要登录 token被手动删除或者过期的情况 跳转至登录页
     * @param {message} 提示信息
     */
    $loginAgain(message){
      this.$message.closeAll()
      window.localStorage.removeItem('x-token')
      this.$alert(message, '提示', {
        type: 'warning' , 
        confirmButtonText: '确定' , 
        callback: action => {
         this.$router.push({name:'login'})
        }
      });
    }
  },
  
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vm
