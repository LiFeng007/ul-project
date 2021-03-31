<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 22:57:55
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-31 15:57:05
-->
<template>
  <div class="ul-course-detail-com">
    <div class="detail">
      
      <!-- ** -->
      <div class="detail-nav">
        基础信息
      </div>
      <!-- ** -->
      <ul class="detail-main">
        <li>
          <span class="header">课程名称 :</span>
          <span class="content">{{masterData.name}}</span>
        </li>
        <li>
          <span class="header">课程类别 :</span>
          <span class="content">{{masterData.type}}</span>
        </li>
        <li>
          <span class="header">课程简介 :</span>
          <span class="content" style="white-space: pre-line;">{{masterData.introduction}}</span>
        </li>
        <li>
          <span class="header">课程详细介绍 :</span>
          <span v-html="masterData.desc" class="content" style="white-space: pre-line;">{{masterData.desc}}</span>
        </li>
        <li>
          <span class="header">课程积分 :</span>
          <span class="content">{{masterData.rewardPoint}}</span>
        </li>
        <li>
          <span class="header">上传人 :</span>
          <span class="content">{{masterData.uploaderUserName}}</span>
        </li>
        <li>
          <span class="header">上传时间 :</span>
          <span class="content">{{masterData.createdAt | data('YMDHMS')}}</span>
        </li>
        <li>
          <span class="header">二维码链接 :</span>
          <span class="content cursor-porinter" :style="{color:'#2ABFFF'}" @click="href(masterData.linkUrl)">{{masterData.linkUrl}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import {courseDetailByCourseId } from '@/api/courseManagement'

export default {
  name:'course-detail' , 

  data() {
    return {
      masterData:{}
    }
  },

  mounted() {
    this.getCourseDetail()
  },

  methods: {
    href:function(url){
      window.location.href = url
    } ,
    getCourseDetail:async function(){
      const res = await courseDetailByCourseId({courseId:this.$route.query.courseId})
      if(res.data.code == "E0"){
          let linkStr = res.data.data.desc
          linkStr = linkStr.replace(/<link>/ig, '')
          linkStr = linkStr.replace(/<\/link>/ig, '')
          linkStr = linkStr.replace(/<\/br>/ig, '')
          res.data.data.desc = linkStr
          this.masterData = res.data.data
        }
    }
  },
}
</script>

