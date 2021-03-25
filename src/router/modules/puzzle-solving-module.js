/*
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-11 10:53:10
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-24 09:47:46
 */
import layout from '@/layout'

const puzzleSolvingModule = {
  path: '/puzzle-solving',
  redirect: '/puzzle-solving/module',
  name: 'puzzle-solving',
  component: layout,
  children: [
    {
      path: 'module',
      name: 'puzzle-solving-module',
      component: () => import('@/views/puzzle-solving-module'),
      meta: {
        crmuns: [{ item: '解惑模块' }],
      },
    }, {
      path: 'detail',
      name: 'puzzle-solving-detail',
      component: () => import('@/views/puzzle-solving-module/detail'),
      meta: {
        crmuns: [{ item: '解惑模块', to: 'puzzle-solving-module' }],
      },
    }
  ]
}

export default puzzleSolvingModule