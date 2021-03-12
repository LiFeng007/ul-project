/*
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 14:50:11
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-12 17:51:20
 */
import Vue from 'vue'

import App from './App.vue'

import router from '@/router/router'

import store from '@/store/store'

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

import './registerServiceWorker'

import '@/style/index.scss'

import '@/assets/icon/iconfont.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({

  methods: {
    //提示信息
    $tipsInfo(message, type) {
      this.$message.closeAll()
      this.$message[type]({ message: message })
    }
  },
  
  router,
  store,
  render: h => h(App)
}).$mount('#app')
