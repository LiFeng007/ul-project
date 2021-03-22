<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-11 10:46:41
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-22 10:50:27
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
          <span class="content">{{masterData.name}}</span>
        </li>
        <li>
          <span class="header">项目描述 :</span>
          <span class="content">{{masterData.desc}}</span>
        </li>
        <li>
          <span class="header">项目积分 :</span>
          <span class="content">{{masterData.rewardPoint}}</span>
        </li>
        <li>
          <span class="header">上传人 :</span>
          <span class="content">{{masterData.uploaderUserName}}</span>
        </li>
        <li>
          <span class="header">上传时间 :</span>
          <span class="content">{{masterData.createdAt}}</span>
        </li>
        <li>
          <span class="header">跳转链接 :</span>
          <span class="content cursor-porinter" :style="{color:'#2ABFFF'}" @click="href(masterData.linkUrl)">{{masterData.linkUrl}}</span>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
  import { projectDetailByProjectId } from "@/api/projectManagement";

  export default {
    name: "project-detail",
    data() {
      return {
        masterData: {},
      };
    },

    mounted() {
      this.getDetail();
    },

    methods: {
      getDetail: async function () {
        const res = await projectDetailByProjectId({ projectId: this.$route.query.projectId, });
        if (res.data.code == "E0") {
          this.masterData = res.data.data;
        }
      },
      href: function (url) {
        //  window.open(url);
      },
    },
  };
</script>

<style>
</style>