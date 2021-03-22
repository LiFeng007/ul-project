/*
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-16 15:40:23
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-22 13:58:29
 */
import http from '@/utils/http.js'

// 登录 
export const login = (params) => http.post('/management/login', params)

// 模板下载
export const templateDown = () => http.get('/management/course/template')

//课程上传
export const templateUpload = (params, contentType) => http.post('/management/course/upload', params, contentType)

// 课程查询
export const courseQuery = (params) => http.post('/management/course', params)

// 课程详情
export const courseDetailByCourseId = (params) => http.post('/management/course/detail' , params)

// 课程课程上下线
export const courseModfiyStatus = (params) => http.post('/management/course/modify' , params)

// 课程记录查询
export const courseRecordQueryByCourseId = (params) => http.post('/management/course/record' , params)

// 课程记录审核
export const courseToExamine = (params) => http.post('/management/course/record/review' , params)