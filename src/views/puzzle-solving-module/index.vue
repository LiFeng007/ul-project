<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 20:28:38
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-19 20:31:40
-->
<template>
  <div class="ul-puzzle-solving">
    <!-- ** -->
    <div class="ul-main-com">
      <!-- ** -->
      <Ul-nav @getData="getData">
        <template v-slot:left>
          <button class="routine-btn" @click="() => uploadVisible.state = true">积分导入</button>
          <span class="cursor-porinter" @click="templateDown">下载模板</span>
        </template>
      </Ul-nav>
      <!-- ** -->
      <el-table ref="filterTable" :data="masterData" @sort-change="onSortChange" height="500" style="width: 100%">

        <el-table-column prop="wechatNo" label="微信号" min-width="180" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="wechatName" label="微信昵称" min-width="180">
        </el-table-column>

        <el-table-column prop="name" label="员工姓名" min-width="100">
        </el-table-column>

        <el-table-column prop="rewardPoint" label="获得积分" min-width="120" sortable>
        </el-table-column>

        <el-table-column prop="email" label="邮箱" show-overflow-tooltip min-width="180">
        </el-table-column>

        <el-table-column prop="uploaderName" label="导入者" show-overflow-tooltip min-width="120">
        </el-table-column>

        <el-table-column prop="createdAt" label="最后一次更新时间" show-overflow-tooltip min-width="180" sortable>
          <template slot-scope="scope">
            <span>
              {{scope.row.createdAt | data('YMDHMS')}}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <!-- ** -->
      <Ul-Page :total="total" @getData="getData" />
    </div>
    <!-- ** -->
    <Ul-Confirm :confrimVisible="confrimVisible" :message="confirmMssage" @submit="confrimSubmit" />
    <!-- ** -->
    <Ul-Upload title="积分上传" :uploadVisible="uploadVisible" :uploadTips="uploadTips" @upload="upload" />
  </div>
</template>

<script>
  import { publicMixin } from "@/mixin/publicMixin";

  import {
    queryPuzzleSolvingList,
    templateDown,
    templateUpload,
  } from "@/api/puzzleSolvingModule";

  import { publicMethod } from "@/utils/common";

  export default {
    name: "puzzle-solving-module",

    mixins: [publicMixin],

    data() {
      return {
        confrimVisible: { state: false }, //确认框显示
        uploadVisible: { state: false }, //上传框显示
        confirmMssage: [
          "确认要删除当前文件吗？",
          "文件删除后将不可操作，请仔细核对后删除。",
        ],
        delDate: {}, //将被删除的数据
        uploadTips: {}, //上传文件的提示信息
        masterData: [],
      };
    },

    mounted() {
      this.getData();
    },

    methods: {
      /**
       * 获取列表数据
       * */
      getData: async function (e, page) {
        e !== null && (this.payload.searchKey = e);
        if (page) {
          this.payload.pageNumber = page.pageNumber;
          this.payload.pageSize = page.pageSize;
        }
        this.tableIsLoading = true;
        const res = await queryPuzzleSolvingList({
          ...this.payload,
        });
        this.tableIsLoading = false;
        if (res.data.code == "E0") {
          this.masterData = res.data.data.records;
          this.total = res.data.data.total;
        } else {
          this.masterData = [];
          this.total = 0;
          this.$root.$tipsInfo(res.data.message, "error");
        }
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
       * 模板下载
       * */
      async templateDown() {
        const res = await templateDown();
        res.data.code == "E0" &&
          publicMethod.exportMethod(res.data.data.url, "课程管理模板");
      },
      /**
       * 确定上传
       * **/
      upload: async function (file) {
        var fromData = new FormData();
        fromData.append("file", file.raw);
        const res = await templateUpload(fromData, {
          type: "multipart/form-data",
        });
        if (res.data.code == "E0") {
          const {
            total,
            successNum,
            failureNum,
            failurePointList,
          } = res.data.data;
          this.uploadTips = {
            /**
             * error 文件上传失败
             * partialSuccess 没有全部成功
             * success 全部上传成功
             * */
            type: successNum == total && total ? "success" : "partialSuccess",
            message:
              successNum == total && total
                ? `上传成功 , 成功上传${total}个员工信息`
                : `成功上传${successNum}个员工信息，${failureNum}个员工信息不予上传，具体信息如下：`,
            tableHeader: failurePointList.length
              ? [
                  { col: "邮箱", prop: "email", minWidth: 200, isTips: true },
                  { col: "获得积分", prop: "point" },
                  { col: "失败原型", prop: "failureReason", minWidth: 300, isTips: true }
                ]
              : [],
            tableData: failurePointList.length ? failurePointList : [],
          };
          this.getData();
        }
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