<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 20:28:38
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-11 17:41:16
-->
<template>
  <div>
    <button class="green-btn" @click="goDetail">解惑查看</button>
    <!-- ** -->
    <Ul-nav @getData="getData"> 
        <template v-slot:left>
          <button class="blue-btn">积分导入</button>
        </template>
    </Ul-nav>
  </div>
</template>

<script>

import UlNav from '@/components/nav'

export default {
  name:"puzzle-solving-module" , 

  components:{UlNav} , 

  methods: {

    goDetail:function(){
      this.$router.push({name:'puzzle-solving-detail' , query:{puzzleSolvingId:1}})
    } , 

    getData:function(e){
      console.log(e)
    }

  },
}
</script>

<style>

</style>