<!--
 * @Descripttion: 表格上方的组件 左侧内容使用slot:left插入 , 右侧输入框需定义getData方法执行父组件逻辑
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-11 16:17:29
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-12 14:18:27
-->
<template>
  <div class="ul-nav-com">
      <!--  -->
    <div class="ul-nav-left">
      <slot name="left"></slot>
    </div>
    <!--  -->
    <div class="ul-nav-right">
        <el-input
          size="medium"
          placeholder="搜索"
          prefix-icon="el-icon-search"
          clearable
          @keyup.enter.native="$emit('getData' , input)"
          v-model="input">
        </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name:'ul-nav' , 
  data() {
    return {
      input:''
    }
  },
}
</script>

<style lang='scss' >
  .ul-nav-com{
    height:72px;
    padding: 0 0.016rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    background: #ffffff;
    border-radius:2px 2px 0 0 ;
    padding: 0 0.24rem;
    .ul-nav-left{
font-size: 0.14rem;
color: #35393f;
line-height: 0.2rem;
    }
  }
</style>