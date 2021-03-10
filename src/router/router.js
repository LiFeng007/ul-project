/*
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 14:50:11
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-10 22:36:29
 */
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'

import courseManagement from './modules/course-management'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    } , 
    courseManagement , 
    {
      path: "*",
      name:'err-page' , 
      component: () => import('@/views/err-page')
  },
  ]
})
