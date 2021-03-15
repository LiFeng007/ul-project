/*
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 14:50:11
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-15 10:40:45
 */
import Vue from 'vue'

import Router from 'vue-router'

import NProgress from 'nprogress'

import 'nprogress/nprogress.css'

import courseManagement from './modules/course-management'

import projectManagement from './modules/project-management'

import puzzleSolvingModule from './modules/puzzle-solving-module'

import staffManagement from './modules/staff-management'

Vue.use(Router)

export const router =  new Router({
  routes: [
    {
      path:'/' , 
      redirect:'/course' , 
    } , 
    courseManagement , 
    projectManagement , 
    puzzleSolvingModule , 
    staffManagement , 
    {
      path:'/login' , 
      name:'login' , 
      component: () => import('@/views/login')
    } , 
    {
      path: "*",
      name:'err-page' , 
      component: () => import('@/views/err-page')
  },
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})

router.afterEach(() => {
  NProgress.done();
});
