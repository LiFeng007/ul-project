/*
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-16 15:40:42
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-22 14:24:11
 */
import http from '@/utils/http.js'

// 模板下载
export const templateDown = () => http.get('/management/project/template')

//项目上传
export const templateUpload = (params, contentType) => http.post('/management/project/upload', params, contentType)

// 项目查询
export const projectQuery = (params) => http.post('/management/project', params)

// 项目详情
export const projectDetailByProjectId = (params) => http.post('/management/project/detail' , params)

// 项目上下线
export const projectModfiyStatus = (params) => http.post('/management/project/modify' , params)

// 项目记录查询
export const projectRecordQuery = (params) => http.post('/management/project/record' , params)

// 项目审核 通过或者不通过
export const projectToExamine = (params) => http.post('/management/project/record/review' , params) 