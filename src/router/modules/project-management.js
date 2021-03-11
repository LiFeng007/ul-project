/*
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-11 10:52:39
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-11 14:27:23
 */
import layout from '@/layout'

const projectManagement = {
  path: '/project',
  redirect: '/project/project-management',
  component: layout,
  name:'project' , 
  children: [
    {
      path: 'project-management',
      name: 'project-management',
      component: () => import(/* webpackChunkName: "project-management" */ '@/views/project-management'),
      meta: {
        crmuns: [{ item: '项目管理' }],
      },
    }, {
      path: 'detail',
      name: 'project-detail',
      component: () => import(/* webpackChunkName: "project-detail" */ '@/views/project-management/detail'),
      meta: {
        crmuns: [{ item: '项目管理' , to:'project-management' } , {item:'项目查看'}],
      },
    }, {
      path: 'to-examine',
      name: 'project-to-examine',
      component: () => import(/* webpackChunkName: "project-to-examine" */ '@/views/project-management/to-examine'),
      meta: {
        crmuns: [{ item: '项目管理' , to:'project-management' } , {item:'项目审核'} ],
      },
    }
  ]
}

export default projectManagement