/*
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 22:10:54
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-29 15:44:15
 */

import layout from '@/layout'

const courseManagement = {
  path: '/course',
  redirect: '/course/course-management',
  name: 'course',
  component: layout,
  children: [
    {
      path: 'course-management',
      name: 'course-management',
      component: () => import('@/views/course-management'),
      meta: {
        crmuns: [{ item: '课程管理' }],
      },
    }, {
      path: 'detail',
      name: 'course-detail',
      component: () => import('@/views/course-management/detail'),
      meta: {
        crmuns: [{ item: '课程管理', to: 'course-management' }, { item: '课程详情' }],
      },
    }, {
      path: 'to-examine',
      name: 'course-to-examine',
      component: () => import('@/views/course-management/to-examine'),
      meta: {
        crmuns: [{ item: '课程管理', to: 'course-management' }, { item: '课程审核' }],
      },
    }, {
      path: 'edit',
      name: 'course-edit',
      component: () => import('@/views/course-management/edit'),
      meta: {
        crmuns: [{ item: '课程管理', to: 'course-management' }, { item: '课程编辑' }],
      },
    }
  ]
}
export default courseManagement