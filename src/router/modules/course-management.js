/*
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 22:10:54
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-10 23:08:59
 */

import layout from '@/layout'

const courseManagement = {
  path: '/course',
  redirect:'/course/course-management' , 
  component: layout,
  children: [
    {
      path: 'course-management',
      name: 'course-management',
      component: () => import(/* webpackChunkName: "course-management" */ '@/views/course-management'),
      meta: {
        crmuns: [{ item: '课程管理'}],
      },
    } , {
      path: 'detail',
      name: 'course-detail',
      component: () => import(/* webpackChunkName: "course-detail" */ '@/views/course-management/detail'),
      meta: {
        crmuns: [{ item: '课程管理' , to:'course-management'} , { item: '课程详情'}],
      },
    } , {
      path: 'to-examine',
      name: 'course-to-examine',
      component: () => import(/* webpackChunkName: "course-management" */ '@/views/course-management/to-examine'),
      meta: {
        crmuns: [{ item: '课程管理' , to:'course-management'} , { item: '课程审核'}],
      },
    }
  ]
}
export default courseManagement