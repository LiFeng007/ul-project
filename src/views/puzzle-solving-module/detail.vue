<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-11 10:40:04
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-11 17:44:41
-->
<template>
  <div>
    <!-- ** -->
    <Ul-nav @getData="getData"> 
        <template v-slot:left>
         文件名称：积分导入文件1      员工数量：5
        </template>
    </Ul-nav>
  </div>
</template>

<script>

import UlNav from '@/components/nav'

export default {
  name:'puzzle-solving-detail' , 

  components:{UlNav} , 

  mounted() {
      this.$route.meta.crmuns = [{ item: '解惑模块' , to:'puzzle-solving-module' } ,  {item:this.$route.query.puzzleSolvingId}]
  },

  methods: {
    getData:function(e){
      console.log(e)
    }
  },
}
</script>

<style>

</style>