<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-11 23:30:35
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-11 23:49:40
-->
<template>
  <div class="ul-page">
    <div class="ul-page-left">2</div>
    <div class="ul-page-right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "pageing",

    data() {
      return {
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
      };
    },

    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
    },
  };
</script>

<style lang="scss">
.ul-page{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 0.48rem;
  background: #ffffff;
  padding: 0 0.16rem;
}
</style>