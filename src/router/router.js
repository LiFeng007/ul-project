/*
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 14:50:11
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-19 14:44:48
 */
import vm from '../main'

import Vue from 'vue'

import Router from 'vue-router'

import NProgress from 'nprogress'

import { getToken } from "@/utils/auth"

import 'nprogress/nprogress.css'

import courseManagement from './modules/course-management'

import projectManagement from './modules/project-management'

import puzzleSolvingModule from './modules/puzzle-solving-module'

import staffManagement from './modules/staff-management'

Vue.use(Router)

export const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/course',
    },
    courseManagement,
    projectManagement,
    puzzleSolvingModule,
    staffManagement,
    {
      path: '/login',
      name: 'login',
      meta: {
        crmuns: [{ item: '登录' }],
      },
      component: () => import('@/views/login')
    },
    {
      path: "*",
      name: 'err-page',
      meta: {
        crmuns: [{ item: '错误页面' }],
      },
      component: () => import('@/views/err-page')
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.crmuns[0].item
  NProgress.start();
  if (/login/.test(to.path)) {
    next()
  } else {
    if (!window.localStorage.getItem('x-token')) {
      vm.$loginAgain('您已被登出,请重新登录~' , '提示' , () => next({name:'login'}));
    } else {
      next()
    }
  }

})

router.afterEach(() => {
  NProgress.done();
});
