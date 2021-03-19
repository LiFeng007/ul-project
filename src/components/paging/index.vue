<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-11 23:30:35
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-19 16:22:46
-->
<template>
  <div class="ul-page">
    <div class="ul-page-left">
      共{{ total }}条记录<span v-if="total"> , 当前为{{ currentStart }}-{{ currentEnd }}条</span>
    </div>
    <div class="ul-page-right">
      <el-pagination small @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNumber" :page-sizes="[10, 20, 30, 50, 100]" :page-size="pageSize" layout="sizes, prev, pager, next, jumper" :total="total - 0">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import Bus from "@/utils/bus.js";

  export default {
    name: "pageing",

    props: {
      total: {
        type: Number,
        require: true,
      },
    },

    mounted() {
      Bus.$on("setPage", (pageObj) => {
        this.pageNumber = pageObj.pageNumber;
        this.pageSize = pageObj.pageSize;
      });
    },

    data() {
      return {
        pageNumber: 1,
        pageSize: 10,
        currentStart: "",
        currentEnd: "",
      };
    },

    methods: {
      handleSizeChange(val) {
        this.pageSize = val;
        this.pageNumber !== 1 && (this.pageNumber = 1);
        this.$emit("getData", null, this.baseInfo);
      },
      handleCurrentChange(val) {
        this.pageNumber = val;
        this.$emit("getData", null, this.baseInfo);
      },
    },

    computed: {
      baseInfo() {
        const { pageSize, pageNumber, total } = this;
        return { pageSize, pageNumber, total };
      },
    },

    watch: {
      baseInfo: {
        handler(newVal, oldVal) {
          // 当前页开始条
          this.currentStart = (newVal.pageNumber - 1) * newVal.pageSize + 1;
          //  当前页结束条
          this.currentEnd = newVal.pageNumber * newVal.pageSize;
          //  是否最后一页
          if (
            Math.ceil(this.total / newVal.pageSize) === newVal.pageNumber &&
            this.total % newVal.pageSize != 0
          ) {
            let endPage = this.total % newVal.pageSize;
            this.currentEnd = (newVal.pageNumber - 1) * newVal.pageSize + endPage;
          }
        },
        deep: true,
        immediate: true,
      },
    },
  };
</script>
