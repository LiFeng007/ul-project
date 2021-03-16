<!--
 * @Descripttion: 表格上方的组件 左侧内容使用slot:left插入 , 右侧输入框需定义getData方法执行父组件逻辑
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-11 16:17:29
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-16 10:46:04
-->
<template>
  <div class="ul-nav-com">
    <!--  -->
    <div class="ul-nav-left">
      <slot name="left"></slot>
    </div>
    <!--  -->
    <div class="ul-nav-right">
      <el-input size="medium" placeholder="搜索" prefix-icon="el-icon-search" clearable @keyup.enter.native="handler()" v-model="input">
      </el-input>
    </div>
  </div>
</template>

<script>
import Bus from '@/utils/bus.js'

  export default {
    name: "ul-nav",
    data() {
      return {
        input: "",
      };
    },

    methods: {
      handler: function () {
        this.$emit("getData", this.input, { pageNumber: 1, pageSize: 10 });
        Bus.$emit('setPage' , { pageNumber: 1, pageSize: 10 })
      },
    },
  };
</script>
