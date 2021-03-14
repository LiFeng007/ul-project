<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-11 10:40:04
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-14 21:08:28
-->
<template>
  <div class="puzzle-solving-detail">
    <!-- ** -->
    <div class="ul-main-com">
      <!-- ** -->
      <Ul-nav @getData="getData">
        <template v-slot:left>
          文件名称：{{$route.query.fileName}} &nbsp;&nbsp;&nbsp; 员工数量：{{$route.query.staffNumber}}
        </template>
      </Ul-nav>
      <!-- ** -->
      <el-table ref="filterTable" :data="masterData" @sort-change="onSortChange" height="500" style="width: 100%">

        <el-table-column prop="wechatNumber" label="微信号" min-width="120">
        </el-table-column>

        <el-table-column prop="wechatNikname" label="微信昵称" min-width="180">
        </el-table-column>

        <el-table-column prop="staffName" label="员工姓名" min-width="100">
        </el-table-column>

        <el-table-column prop="ImportShij" label="获得积分" show-overflow-tooltip min-width="180" sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column prop="importTime" label="导入时间" min-width="100" sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column align="center" fixed="right" label="操作" min-width="130">
          <template slot-scope="scope">
            <span :style="{ marginRight: '8px' }" class="cursor-porinter" @click="del(scope.row)">
              删除
            </span>
          </template>
        </el-table-column>
      </el-table>
      <!-- ** -->
      <Ul-Page :total="201" @getData="getData" />
    </div>
    <!-- ** -->
    <Ul-Confirm :confrimVisible="confrimVisible" :message="confirmMssage" @submit="confrimSubmit" />
  </div>
</template>

<script>
  import UlNav from "@/components/nav";

  import UlPage from "@/components/paging";

  import UlConfirm from "@/components/confirm";

  export default {
    name: "puzzle-solving-detail",

    components: { UlNav, UlPage, UlConfirm },

    mounted() {
      this.$route.meta.crmuns = [
        { item: "解惑模块", to: "puzzle-solving-module" },
        { item: this.$route.query.fileName },
      ];
    },

    data() {
      return {
        confrimVisible: { state: false }, //确认框显示
        uploadVisible: { state: false }, //上传框显示
        confirmMssage: [
          "确认要删除当前员工吗？",
          "员工删除后将不可操作，请仔细核对后删除。",
        ],
        retrievalInfo: "", //检索信息
        delDate: {}, //将被删除的数据
        masterData: [
          {
            wechatNumber: "2634837rue",
            wechatNikname: "微信昵称",
            staffName: "阿锋",
            ImportShij: "200",
            importTime: "2021-03-14 21:07:00",
          },
          {
            wechatNumber: "2634837rue",
            wechatNikname: "微信昵称",
            staffName: "阿锋",
            ImportShij: "200",
            importTime: "2021-03-14 21:07:00",
          },
          {
            wechatNumber: "2634837rue",
            wechatNikname: "微信昵称",
            staffName: "阿锋",
            ImportShij: "200",
            importTime: "2021-03-14 21:07:00",
          },
          {
            wechatNumber: "2634837rue",
            wechatNikname: "微信昵称",
            staffName: "阿锋",
            ImportShij: "200",
            importTime: "2021-03-14 21:07:00",
          },
          {
            wechatNumber: "2634837rue",
            wechatNikname: "微信昵称",
            staffName: "阿锋",
            ImportShij: "200",
            importTime: "2021-03-14 21:07:00",
          },
          {
            wechatNumber: "2634837rue",
            wechatNikname: "微信昵称",
            staffName: "阿锋",
            ImportShij: "200",
            importTime: "2021-03-14 21:07:00",
          },
        ],
      };
    },

    methods: {
      /**
       * 获取列表数据
       * */
      getData: function (e, page) {
        e !== null && (this.retrievalInfo = e);
        const pageObj = page ? page : { currentPage: 1, limit: 10 };
        console.log(this.retrievalInfo, pageObj);
      },
      /**
       * 询问对话框提交
       * **/
      confrimSubmit: function () {
        console.log("确认删除", this.delDate);
        this.confrimVisible.state = false;
      },
      /**
       * 删除课程
       * */
      del: function (row) {
        this.delDate = row;
        this.confrimVisible.state = true;
      },
      /**
       * 表格排序事件处理函数
       * @param {object} {column,prop,order} 列数据|排序字段|排序方式
       */
      onSortChange({ prop, order }) {
        // this.tableData(this.compare(prop,order));
        console.log(prop, order);
      },
      /**
       * 排序比较
       * @param {string} propertyName 排序的属性名
       * @param {string} sort ascending(升序)/descending(降序)
       * @return {function}
       */
      compare(propertyName, sort) {
        // console.log(prop,order)
      },
    },

    watch: {
      confrimVisible: {
        handler(newVal) {
          !newVal.state && (this.delDate = {});
        },
        deep: true,
      },
    },
  };
</script>

<style>
</style>