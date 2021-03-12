<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-11 23:30:35
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-12 16:06:30
-->
<template>
  <div class="ul-page">
    <div class="ul-page-left">
      共{{ total }}记录 , 当前为{{ currentStart }}-{{ currentEnd }}条
    </div>
    <div class="ul-page-right">
      <el-pagination
        small
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="10"
        layout="sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "pageing",

    props: {
      total: {
        type: Number,
        require: true,
      },
    },

    data() {
      return {
        currentPage: 1,
        limit: 10,
        currentStart: "",
        currentEnd: "",
      };
    },

    methods: {
      handleSizeChange(val) {
        this.limit = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.$emit("getData", null, this.baseInfo);
      },
    },

    computed: {
      baseInfo() {
        const { limit, currentPage, total } = this;
        return { limit, currentPage, total };
      },
    },

    watch: {
      baseInfo: {
        handler(newVal, oldVal) {
          if (oldVal) {
            if (newVal.limit !== oldVal.limit && oldVal.currentPage === 1)
              this.$emit("getData", null, newVal);
          }
          // 当前页开始条
          this.currentStart = (newVal.currentPage - 1) * newVal.limit + 1;
          //  当前页结束条
          this.currentEnd = newVal.currentPage * newVal.limit;
          //  是否最后一页
          if (
            Math.ceil(this.total / newVal.limit) === newVal.currentPage &&
            this.total % newVal.limit != 0
          ) {
            let endPage = this.total % newVal.limit;
            this.currentEnd = (newVal.currentPage - 1) * newVal.limit + endPage;
          }
        },
        deep: true,
        immediate: true,
      },
    },
  };
</script>

<style lang="scss">
  .ul-page {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    background: #ffffff;
    padding: 0 0.16rem;
    color: #67717a;
    .el-input--mini .el-input__inner {
      height: 24px;
      // line-height: 24px;
    }
    .el-input__icon {
      height: auto;
    }
  }
</style>