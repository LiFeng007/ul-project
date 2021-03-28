<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-11 10:40:04
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-28 11:28:28
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
          <template slot-scope="scope">
            <span class="cursor-porinter" @click="$router.push({ name: 'staff-detail', query: { staffId: scope.row.wechatNumber } })">
              {{scope.row.staffName}}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="ImportShij" label="获得积分" show-overflow-tooltip min-width="180" sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column prop="importTime" label="最后一次更新时间" min-width="100" sortable="custom" :sort-orders="['ascending','descending']">
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
  import { publicMixin } from "@/mixin/publicMixin";

  export default {
    name: "puzzle-solving-detail",

    mixins: [publicMixin],

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
        e && (this.payload.searchKey = e);
        if (page) {
          this.payload.pageNumber = page.pageNumber;
          this.payload.pageSize = page.pageSize;
        }
        console.log({ ...this.payload.pageObj, ...this.payload });
      },
      /**
       * 询问对话框提交
       * **/
      confrimSubmit: function () {
        this.confrimVisible.state = false;
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
