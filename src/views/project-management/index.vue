<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 20:27:53
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-24 11:52:50
-->
<template>
  <div class="ul-project-management">
    <!-- ** -->
    <div class="ul-main-com">
      <!-- ** -->
      <Ul-nav @getData="getData">
        <template v-slot:left>
          <button class="routine-btn" @click="() => uploadVisible.state = true">项目上传</button>
          <span class="cursor-porinter" @click="templateDown">下载模板</span>
        </template>
      </Ul-nav>
      <!-- ** -->
      <el-table ref="filterTable" :data="masterData" @sort-change="onSortChange" @filter-change="filterStatus" v-loading="tableIsLoading" height="500" style="width: 100%">

        <el-table-column prop="projectId" label="项目ID" min-width="120">
        </el-table-column>

        <el-table-column prop="name" label="项目名称" min-width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            <span @click="$router.push({ name: 'project-detail', query: { projectId: scope.row.projectId } })" class="cursor-porinter">
              {{scope.row.name}}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="rewardPoint" label="项目积分" min-width="120" sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column prop="uploaderUserName" label="上传人" min-width="100">
        </el-table-column>

        <el-table-column prop="createdAt" label="上传时间" show-overflow-tooltip min-width="180" sortable="custom" :sort-orders="['ascending','descending']">
          <template slot-scope="scope">
            <span>
              {{scope.row.createdAt | data('YMDHMS')}}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="unfinishedNum" label="待完成" min-width="120" sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column prop="unreviewedNum" label="审核中" min-width="120" sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column prop="passedNum" label="已完成" min-width="120" sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column align="center" fixed="right" label="状态" min-width="100" :filters="[
        { text: '已下线', value: 0 }, 
        { text: '已上线', value: 1 },
        ]">
          <template slot-scope="scope">
            <span :class="[scope.row.status ? 'success': 'rejected' ]">
              {{scope.row.status | status('已上线' , '已下线')}}
            </span>
          </template>
        </el-table-column>

        <el-table-column align="center" fixed="right" label="操作" min-width="130">
          <template slot-scope="scope">

            <span @click="$router.push({ name: 'project-detail', query: { projectId: scope.row.projectId } })" :style="{ marginRight: '8px' }" class="cursor-porinter">
              查看
            </span>

            <span @click="$router.push({ name: 'project-to-examine', query: { projectName: scope.row.name , projectIntegral:scope.row.rewardPoint , projectId: scope.row.projectId  } })" :style="{ marginRight: '8px' }" class="cursor-porinter">
              审核
            </span>

            <span :style="{ marginRight: '8px' }" class="cursor-porinter" @click="del(scope.row.status ? false : true, scope.row)">

              {{scope.row.status | status('下线' , '上线')}}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <!-- ** -->
      <Ul-Page :total="total" @getData="getData" />
    </div>
    <!-- ** -->
    <Ul-Confirm :confrimVisible="confrimVisible" :message="confirmMssage" @submit="setStatusConfrimSubmit" />
    <!-- ** -->
    <Ul-Upload title="项目上传" :uploadVisible="uploadVisible" :uploadTips="uploadTips" @upload="upload" />
  </div>
</template>

<script>
  import { publicMixin } from "@/mixin/publicMixin";

  import {
    templateDown,
    templateUpload,
    projectQuery,
    projectModfiyStatus,
  } from "@/api/projectManagement";

  import { publicMethod } from "@/utils/common";

  export default {
    name: "project-management",

    mixins: [publicMixin],

    data() {
      return {
        confrimVisible: { state: false }, //确认框显示
        uploadVisible: { state: false }, //上传框显示
        confirmMssage: [],
        uploadTips: {}, //上传文件的提示信息
        masterData: [],
      };
    },

    mounted() {
      this.payload.status = [1, 2];
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
        const res = await projectQuery({
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
       * 模板下载
       * */
      templateDown: async function () {
        const res = await templateDown();
        res.data.code == "E0" &&
          publicMethod.exportMethod(res.data.data.url, "项目管理模板");
      },
      /**
       * 项目上下线
       * */
      setStatusConfrimSubmit: async function () {
        const res = await projectModfiyStatus({
          projectId: this.delDate.projectId,
          status: this.delDate.status ? 2 : 1,
        });
        if (res.data.code == "E0") {
          this.delDate.status
            ? (this.delDate.status = 0)
            : (this.delDate.status = 1);
        } else {
          this.$root.$tipsInfo(
            `操作失败 , 失败原因:${res.data.message}`,
            "error"
          );
        }
        this.confrimVisible.state = false;
      },
      del: function (status, row) {
        this.confirmMssage = [
          `确认要${status ? "上线" : "下线"}当前项目吗？`,
          `项目${
            status ? "上线后将可以" : "下线后将不可以"
          }操作，请仔细核对后操作。`,
        ];
        this.delDate = row;
        this.confrimVisible.state = true;
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
            failureCourseList,
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
                ? `上传成功 , 成功上传${total}个项目`
                : `成功上传${successNum}个项目，${failureNum}个项目不予上传，具体信息如下：`,
            tableHeader: failureCourseList.length
              ? [
                  { col: "项目ID", prop: "projectId" },
                  { col: "项目名称", prop: "name" },
                  { col: "项目owner", prop: "owner" },
                  {
                    col: "项目简介",
                    prop: "introduction",
                    minWidth: "200",
                    isTips: true,
                  },
                  {
                    col: "项目详细介绍",
                    prop: "desc",
                    minWidth: "200",
                    isTips: true,
                  },
                  { col: "项目积分", prop: "rewardPoint" },
                  {
                    col: "跳转链接",
                    prop: "linkUrl",
                    minWidth: "200",
                    isTips: true,
                  },
                  {
                    col: "失败原因",
                    prop: "failureReason",
                    minWidth: "200",
                    isTips: true,
                  },
                ]
              : [],
            tableData: failureCourseList.length ? failureCourseList : [],
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
