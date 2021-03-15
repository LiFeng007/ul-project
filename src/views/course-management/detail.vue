<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 22:57:55
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-15 16:12:59
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
          <span class="content">{{masterData.courseName}}</span>
        </li>
        <li>
          <span class="header">课程描述 :</span>
          <span class="content">{{masterData.courseDescribe}}</span>
        </li>
        <li>
          <span class="header">课程积分 :</span>
          <span class="content">{{masterData.courseIntegral}}</span>
        </li>
        <li>
          <span class="header">上传人 :</span>
          <span class="content">{{masterData.uploader}}</span>
        </li>
        <li>
          <span class="header">上传时间 :</span>
          <span class="content">{{masterData.uploadeTime}}</span>
        </li>
        <li>
          <span class="header">图片ftp链接 :</span>
          <span class="content cursor-porinter" :style="{color:'#2ABFFF'}" @click="href(masterData.imageUrl)">{{masterData.imageUrl}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:'course-detail' , 

  data() {
    return {
      masterData:{
        courseName:'課程名稱' ,
        courseDescribe:'則是一段課程描述，最多50字h則是一段課程描述，最多50字則是一段課程描述，最多50字大戶哈哈哈' , 
        courseIntegral:'100積分' ,
        uploader:'Admin' , 
        uploadeTime:'2021.03.14 14:15:00',
        imageUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1021798210,2859690464&fm=26&gp=0.jpg'
      }
    }
  },

  methods: {
    href:function(url){
      window.location.href = url
    }
  },
}
</script>

