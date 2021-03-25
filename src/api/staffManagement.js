/*
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-16 15:42:37
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-24 10:26:08
 */

import http from '@/utils/http.js'

// 模板下载
export const templateDown = () => http.get('/management/user/template')

//用户上传
export const templateUpload = (params, contentType) => http.post('/management/user/upload', params, contentType)

// 用户查询
export const userQuery = (params) => http.post('/management/user', params)

// 用户详情
export const userDetailByuserId = (params) => http.post('/management/user/detail', params)

// 用户禁用与否
export const userModfiyStatus = (params) => http.post('/management/user/review', params)

// 用户删除
export const userDelete = (params) => http.post('/management/user/delete', params)