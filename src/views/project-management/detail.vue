<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-11 10:46:41
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-15 11:20:34
-->
<template>
  <div class="ul-peoject-detail-com">
    <div class="detail">

      <!-- ** -->
      <div class="detail-nav">
        基础信息
      </div>
      <!-- ** -->
      <ul class="detail-main">
        <li>
          <span class="header">项目名称 :</span>
          <span class="content">{{masterData.projectName}}</span>
        </li>
        <li>
          <span class="header">项目描述 :</span>
          <span class="content">{{masterData.projectDescribe}}</span>
        </li>
        <li>
          <span class="header">项目积分 :</span>
          <span class="content">{{masterData.projectIntegral}}</span>
        </li>
        <li>
          <span class="header">上传人 :</span>
          <span class="content">{{masterData.uploader}}</span>
        </li>
        <li>
          <span class="header">上传时间 :</span>
          <span class="content">{{masterData.uploadeTime}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "project-detail",
    data() {
      return {
        masterData: {
          projectName: "課程名稱",
          projectDescribe:
            "則是一段課程描述，最多50字h則是一段課程描述，最多50字則是一段課程描述，最多50字大戶哈哈哈",
          projectIntegral: "100積分",
          uploader: "Admin",
          uploadeTime: "2021.03.14 14:15:00",
        },
      };
    },
  };
</script>

<style>
</style>