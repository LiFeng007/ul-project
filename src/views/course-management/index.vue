<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 20:26:46
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-11 23:37:25
-->
<template>
  <div class="ul-course-management">
    <button
      class="green-btn"
      @click="$router.push({ name: 'course-detail', query: { courseId: 1 } })"
    >
      查看详情
    </button>
    <button
      class="tiffany-btn"
      @click="
        $router.push({ name: 'course-to-examine', query: { courseId: 1 } })
      "
    >
      审核课程
    </button>
    <!-- ** -->
    <div class="ul-main-com">
      <!-- ** -->
      <Ul-nav @getData="getData">
        <template v-slot:left>
          <button class="routine-btn">课程上传</button>
        </template>
      </Ul-nav>
      <!-- ** -->
      <el-table ref="filterTable" :data="masterData" height="500" style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          sortable
          width="180"
          column-key="date"
          :filters="[
            { text: '2016-05-01', value: '2016-05-01' },
            { text: '2016-05-02', value: '2016-05-02' },
            { text: '2016-05-03', value: '2016-05-03' },
            { text: '2016-05-04', value: '2016-05-04' },
          ]"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址" :formatter="formatter">
        </el-table-column>
        <el-table-column
          prop="tag"
          label="标签"
          width="100"
          :filters="[
            { text: '家', value: '家' },
            { text: '公司', value: '公司' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '家' ? 'primary' : 'success'"
              disable-transitions
              >{{ scope.row.tag }}</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- ** -->
      <Ul-Page />
    </div>
  </div>
</template>

<script>
  import UlNav from "@/components/nav"

  import UlPage from "@/components/paging"

  export default {
    name: "course-management",

    components: { UlNav , UlPage },

    data() {
      return {
        masterData: [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
            tag: "家",
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1517 弄",
            tag: "公司",
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄",
            tag: "家",
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1516 弄",
            tag: "公司",
          },
        ],
      };
    },

    methods: {
      getData: function (e) {
        console.log(e);
      },
      resetDateFilter() {
        this.$refs.filterTable.clearFilter("date");
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column["property"];
        return row[property] === value;
      },
    },
  };
</script>

<style>
</style>