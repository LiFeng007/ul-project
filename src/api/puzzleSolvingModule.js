/*
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-16 15:41:09
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-19 20:22:00
 */
import http from '@/utils/http.js'

// 解惑列表查询
export const queryPuzzleSolvingList = (params) => http.post('/management/point', params)

// 模板下载
export const templateDown = () => http.get('/management/point/template')

// 导入积分
export const templateUpload = (params, contentType) => http.post('/management/point/upload', params, contentType)