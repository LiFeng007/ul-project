/*
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-11 10:54:00
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-29 15:45:31
 */
import layout from '@/layout'

const staffManagement = {
  path: '/staff',
  redirect: '/staff/staff-management',
  component: layout,
  name: 'staff',
  children: [
    {
      path: 'staff-management',
      name: 'staff-management',
      component: () => import('@/views/staff-management'),
      meta: {
        crmuns: [{ item: '员工管理' }],
      },
    }, {
      path: 'detail',
      name: 'staff-detail',
      component: () => import('@/views/staff-management/detail'),
      meta: {
        crmuns: [{ item: '员工管理', to: 'staff-management' }, { item: '员工查看' }],
      },
    } , {
      path: 'edit',
      name: 'staff-edit',
      component: () => import('@/views/staff-management/edit'),
      meta: {
        crmuns: [{ item: '员工管理', to: 'staff-management' }, { item: '员工编辑' }],
      },
    }
  ]
}

export default staffManagement