<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 20:29:27
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-31 12:50:55
-->
<template>
  <div class="ul-staff-management">
    <!-- ** -->
    <div class="ul-main-com">
      <!-- ** -->
      <Ul-nav @getData="getData">
        <template v-slot:left>
          <button class="routine-btn" @click="() => uploadVisible.state = true">白名单导入</button>
          <span class="cursor-porinter" @click="templateDown">下载模板</span>
        </template>
      </Ul-nav>
      <!-- ** -->
      <el-table ref="filterTable" :data="masterData" @sort-change="onSortChange" @filter-change="filterStatus" v-loading="tableIsLoading" height="500" style="width: 100%">

        <el-table-column prop="screenshot" align="center" min-width="80">
          <template slot-scope="scope">
            <!-- <el-image @click="() => {}" :src="scope.row.screenshot">
            </el-image> -->
            <img v-if="scope.row.imageUrl" :src="scope.row.imageUrl" alt="微信头像" class="heade-prot">
          </template>
        </el-table-column>

        <el-table-column prop="nickName" label="微信昵称" show-overflow-tooltip min-width="180">
        </el-table-column>

        <el-table-column prop="name" label="姓名" show-overflow-tooltip min-width="140">
          <template slot-scope="scope">
            <span @click="$router.push({ name: 'staff-detail', query: { staffId: scope.row.userId } })" :style="{ marginRight: '8px' }" class="cursor-porinter">
              {{scope.row.name}}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="position" label="部门" show-overflow-tooltip min-width="180">
        </el-table-column>

        <el-table-column prop="email" label="邮箱" show-overflow-tooltip min-width="220">
        </el-table-column>

        <el-table-column prop="highestValue" label="战力值" min-width="100" sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column prop="highestFieldName" label="称号" min-width="100">

          <template slot-scope="scope">
            <span>
              {{scope.row.highestFieldName | employeeTitle(scope.row.highestFieldName , scope.row.highestValue)}}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="point" label="当前积分" min-width="100" sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column prop="courseNum" label="完成课程数" min-width="120" sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column prop="projectNum" label="完成项目数" min-width="120" sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column align="center" fixed="right" label="状态" min-width="100" >
          <template slot-scope="scope">
            <span :class="[scope.row.status ? 'success': 'rejected' ]">
              {{scope.row.status | staffStatus('已启用' , '已禁用')}}
            </span>
          </template>
        </el-table-column>

        <el-table-column align="center" fixed="right" label="操作" min-width="170">
          <template slot-scope="scope">

            <span @click=" scope.row.userId && $router.push({ name: 'staff-detail', query: { staffId: scope.row.userId } })" :style="{ marginRight: '8px' }" :class="[ 'cursor-porinter' , scope.row.userId ? 'cursor-porinter':'no-handle'  ]">
              查看
            </span>

            <span @click="handlerCourse(scope.row.status ? true : false , scope.row)" :style="{ marginRight: '8px' }" class="cursor-porinter">
              {{scope.row.status | staffStatus('禁用' , '启用')}}
            </span>

            <span :style="{ marginRight: '8px' }" class="cursor-porinter" @click="del(scope.row)">
              删除
            </span>

            <!-- <span @click="$router.push({ name: 'staff-edit', query: { permissionId: scope.row.id } })" class="cursor-porinter">
              编辑
            </span> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- ** -->
      <Ul-Page :total="total" @getData="getData" />
    </div>
    <!-- ** -->
    <Ul-Confirm :confrimVisible="confrimVisible" :message="delconfirmMssage" @submit="delConfrimSubmit" />
    <!-- ** -->
    <Ul-Confirm :confrimVisible="setStatusConfrimVisible" :message="setStatusConfirmMssage" @submit="setStatusConfrimSubmit" />
    <!-- ** -->
    <Ul-Upload :uploadLoading="uploadLoading" title="白名单导入" :uploadVisible="uploadVisible" :uploadTips="uploadTips" @upload="upload" />
  </div>
</template>

<script>
  import { publicMixin } from "@/mixin/publicMixin";

  import {
    templateDown,
    templateUpload,
    userQuery,
    userModfiyStatus,
    userDelete,
  } from "@/api/staffManagement";
  import { publicMethod } from "@/utils/common";
  export default {
    name: "staff-management",

    mixins: [publicMixin],

    data() {
      return {
        confrimVisible: { state: false }, //删除确认框显示
        setStatusConfrimVisible: { state: false }, //修改状态确认框显示
        uploadVisible: { state: false }, //上传框显示
        setStatusConfirmMssage: [],
        delconfirmMssage: [
          "确定要删除当前员工吗 ?",
          "将清除该员工所有信息 , 请仔细核对后操作 !",
        ],
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
        const res = await userQuery({
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
       * 白名單模板下载
       * */
      templateDown: async function () {
        const res = await templateDown();
        res.data.code == "E0" &&
          publicMethod.exportMethod(res.data.data.url, "白名单模板");
      },

      /**
       * 删除员工
       * */
      del: function (row) {
        this.delDate = row;
        this.confrimVisible.state = true;
      },
      /**
       * 询问对话框提交
       * **/
      delConfrimSubmit: async function () {
        const res = await userDelete({
          permissionId: this.delDate.id,
        });
        if (res.data.code == "E0") {
          this.$root.$tipsInfo(`操作成功`, "success");
        } else {
          this.$root.$tipsInfo(
            `操作失败 , 失败原因:${res.data.message}`,
            "error"
          );
        }
        this.confrimVisible.state = false;
        this.getData();
      },
      /**
       * 确定上传
       * **/
      upload: async function (file) {
        this.uploadLoading = true;
        var fromData = new FormData();
        fromData.append("file", file.raw);
        const res = await templateUpload(fromData, {
          type: "multipart/form-data",
        });
        this.uploadLoading = false;
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
                ? `上传成功 , 成功上传${total}个员工信息`
                : `成功上传${successNum}个员工信息，${failureNum}个员工信息不予上传，具体信息如下：`,
            tableHeader: failureCourseList.length
              ? [
                  { col: "邮箱", prop: "email", minWidth: 180, isTips: true },
                  {
                    col: "失败原因",
                    prop: "failureReason",
                    minWidth: 180,
                    isTips: true,
                  },
                ]
              : [],
            tableData: failureCourseList.length ? failureCourseList : [],
          };
          this.getData();
        }
      },

      /**
       * 禁用或者启用
       * */
      handlerCourse: function (status, row) {
        this.setStatusConfirmMssage = [
          `${status ? "禁用后该员工将不能" : "启用后该员工将可以"}登陆小程序，`,
          "请仔细核对后操作。",
        ];
        this.delDate = row;
        this.setStatusConfrimVisible.state = true;
      },
      setStatusConfrimSubmit: async function () {
        const res = await userModfiyStatus({
          permissionId: this.delDate.id,
          status: this.delDate.status ? 0 : 1,
        });
        if (res.data.code == "E0") {
          this.delDate.status
            ? (this.delDate.status = 0)
            : (this.delDate.status = 1);
          this.$root.$tipsInfo(`操作成功`, "success");
        } else {
          this.$root.$tipsInfo(
            `操作失败 , 失败原因:${res.data.message}`,
            "error"
          );
        }
        this.setStatusConfrimVisible.state = false;
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