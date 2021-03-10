<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 20:26:46
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-10 23:07:38
-->
<template>
  <div>
    课程管理
    <button class="green-btn" @click="$router.push({name:'course-detail' , query:{courseId:1}})">查看详情</button>
    <button class="tiffany-btn" @click="$router.push({name:'course-to-examine' , query:{courseId:1}})">审核课程</button>
    <router-view/>
  </div>
</template>

<script>
export default {
  name:'course-management'
}
</script>

<style>

</style>