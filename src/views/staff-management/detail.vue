<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-11 10:50:47
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-29 23:01:20
-->
<template>
  <div class="ul-staff-detail-com">
    <div class="detail">
      <!-- ** -->
      <div class="detail-nav">
        基础信息
      </div>
      <!-- ** -->
      <ul class="detail-main">
        <li>
          <ul>
            <li>
              <span class="header">头像：</span>
              <span class="content">
                <img v-if="baseData.imageUrl" :src="baseData.imageUrl" alt="头像">
              </span>
            </li>
            <li>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>
              <span class="header">姓名：</span>
              <span class="content">{{baseData.name}}</span>
            </li>
            <li>
              <span class="header">OpenID：</span>
              <span class="content">{{baseData.openId}}</span>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>
              <span class="header">微信昵称：</span>
              <span class="content">{{baseData.nickName}}</span>
            </li>
            <li>
              <span class="header">邮箱：</span>
              <span class="content">{{baseData.email}}</span>
            </li>
          </ul>
        </li>
        <li>
          <ul>

            <li>
              <span class="header">部门：</span>
              <span class="content">{{baseData.position}}</span>
            </li>
            <li>
              <span class="header">称号：</span>
              <span class="content">{{baseData.highestFieldName | employeeTitle(baseData.highestFieldName , baseData.highestValue)}}</span>
            </li>
          </ul>
        </li>
        <li>
          <ul>

            <li>
              <span class="header">战力值：</span>
              <span class="content">{{baseData.highestValue}}</span>
            </li>
            <li>
              <span class="header">当前积分：</span>
              <span class="content">{{baseData.point}}</span>
            </li>
          </ul>
        </li>
        <li>
          <ul>

            <li>
              <span class="header">完成课程数：</span>
              <span class="content">{{baseData.courseNum}}</span>
            </li>
            <li>
              <span class="header">完成项目数：</span>
              <span class="content">{{baseData.projectNum}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <!-- ** -->
      <div class="detail-nav">
        战力指标卡
      </div>
      <!-- ** -->
      <ul class="detail-main">
        <li>
          <ul>
            <li> <span class="header">Machine learning：</span>
              <span class="content">{{combatPowerCardIndex.machineLearning}}</span>
            </li>
            <li> <span class="header">Data Engineering Architect：</span>
              <span class="content">{{combatPowerCardIndex.dataEngineeringArchitect}}</span>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li> <span class="header">Business Intelligence：</span>
              <span class="content">{{combatPowerCardIndex.businessIntelligence}}</span>
            </li>
            <li> <span class="header">Product Manager：</span>
              <span class="content">{{combatPowerCardIndex.productManager}}</span>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li> <span class="header">Scientific Computation：</span>
              <span class="content">{{combatPowerCardIndex.scientificComputation}}</span>
            </li>
            <li> <span class="header">Application Development：</span>
              <span class="content">{{combatPowerCardIndex.applicationDevelopment}}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { userDetailByuserId } from "@/api/staffManagement";

  export default {
    name: "staff-detail",

    data() {
      return {
        combatPowerCardIndex: {},
        baseData: {},
      };
    },

    mounted() {
      this.getUserInfo();
    },

    methods: {
      getUserInfo: function () {
        userDetailByuserId({ userId: this.$route.query.staffId }).then((res) => {
          if (res.data.code == "E0") {
            this.combatPowerCardIndex = { ...res.data.data };
            this.baseData = { ...res.data.data };
          } else {
            this.$root.$tipsInfo("数据获取失败" + res.data.data.message, "error");
          }
        });
      },
    },
  };
</script>

<style>
</style>