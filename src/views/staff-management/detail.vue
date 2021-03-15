<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-11 10:50:47
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-15 15:45:43
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
              <div class="screenshot">
                <span class="content">
                  <img :src="baseData.screenshot" alt="头像">
                </span>
              </div>
            </li>
            <li>
              <span class="header">姓名：</span>
              <span class="content">{{baseData.name}}</span>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>
              <span class="header">OpenID：</span>
              <span class="content">{{baseData.OpenID}}</span>
            </li>
            <li>
              <span class="header">微信昵称：</span>
              <span class="content">{{baseData.wechatNikname}}</span>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>
              <span class="header">微信号：</span>
              <span class="content">{{baseData.wechatNumber}}</span>
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
              <span class="content">{{baseData.department}}</span>
            </li>
            <li>
              <span class="header">称号：</span>
              <span class="content">{{baseData.title}}</span>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>
              <span class="header">战力值：</span>
              <span class="content">{{baseData.combatPower}}</span>
            </li>
            <li>
              <span class="header">当前积分：</span>
              <span class="content">{{baseData.currentPoints}}</span>
            </li>
          </ul>
        </li>
        <li>
          <ul>
            <li>
              <span class="header">完成课程数：</span>
              <span class="content">{{baseData.completeCourseNumber}}</span>
            </li>
            <li>
              <span class="header">完成项目数：</span>
              <span class="content">{{baseData.completeProjectNumber}}</span>
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
  export default {
    name: "staff-detail",
    data() {
      return {
        combatPowerCardIndex: {
          machineLearning: "50",
          dataEngineeringArchitect: "80",
          businessIntelligence: "56",
          productManager: "80",
          scientificComputation: "77",
          applicationDevelopment: "99",
        },
        baseData: {
          screenshot:
            "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=147053525,1014959484&fm=26&gp=0.jpg",
          name: "一休",
          OpenID: "23523534634",
          wechatNikname: "一休的昵称",
          wechatNumber: "yixiu378648",
          email: "yixiu378648@unilever.com",
          department: "销售一部",
          title: "战力大师",
          combatPower: 88,
          currentPoints: 99,
          completeCourseNumber: 5,
          completeProjectNumber: 6,
        },
      };
    },
  };
</script>

<style>
</style>