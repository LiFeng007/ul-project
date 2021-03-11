<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 20:29:27
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-11 11:42:19
-->
<template>
  <div>
    员工管理
     <button class="custom-button" @click="$router.push({name:'staff-detail' , query:{staffId:1}})">员工查看</button>
  </div>
</template>

<script>
export default {
  name:'staff-management'
}
</script>

<style>

</style>