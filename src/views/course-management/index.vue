<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 20:26:46
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-31 15:21:56
-->
<template>
  <div class="ul-course-management">
    <!-- ** -->
    <div class="ul-main-com">
      <!-- ** -->
      <Ul-nav @getData="getData">
        <template v-slot:left>
          <button class="routine-btn" @click="() => uploadVisible.state = true">课程上传</button>
          <span class="cursor-porinter" @click="templateDown">下载模板</span>
        </template>
      </Ul-nav>
      <!-- ** -->
      <el-table ref="filterTable" :data="masterData" @sort-change="onSortChange" @filter-change="filterStatus" v-loading="tableIsLoading" height="500" style="width: 100%">

        <el-table-column prop="courseId" label="课程ID" min-width="120">
        </el-table-column>

        <el-table-column label="课程名称" prop="name" min-width="180" show-overflow-tooltip>
          <template slot-scope="scope">
            <span @click="$router.push({ name: 'course-detail', query: { courseId: scope.row.courseId } })" :style="{ marginRight: '8px' }" class="cursor-porinter">
              {{scope.row.name}}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="rewardPoint" label="课程积分" min-width="100" sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column prop="linkUrl" label="跳转链接" min-width="100">
          <template slot-scope="scope">
            <el-image :src="scope.row.linkUrl" style="width:49px !important;height:48px !important;" :preview-src-list="[scope.row.linkUrl]">
              <div v-if="!scope.row.linkUrl" slot="error" style="line-height:55px" class="image-slot">
                无链接
              </div>
            </el-image>
          </template>
        </el-table-column>

        <el-table-column prop="uploaderUserName" label="上传人" min-width="120">
        </el-table-column>

        <el-table-column prop="createdAt" label="上传时间" min-width="180" show-overflow-tooltip sortable="custom" :sort-orders="['ascending','descending']">
          <template slot-scope="scope">
            <span>
              {{scope.row.createdAt | data('YMDHMS')}}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="unfinishedNum" label="待上传" min-width="100" sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column prop="unreviewedNum" label="待审核" min-width="100" sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column prop="unpassedNum" label="已驳回" min-width="100" sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column prop="passedNum" label="已完成" min-width="100" sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column align="center" fixed="right" label="状态" min-width="100" :filters="[
        { text: '已下线', value: 2 }, 
        { text: '已上线', value: 1 },
        ]">
          <template slot-scope="scope">
            <span :class="[scope.row.status == 1 ? 'success': 'rejected' ]">
              {{scope.row.status | status('已上线' , '已下线')}}
            </span>
          </template>
        </el-table-column>

        <el-table-column align="center" fixed="right" label="操作" min-width="150">
          <template slot-scope="scope">

            <span @click="$router.push({ name: 'course-detail', query: { courseId: scope.row.courseId } })" :style="{ marginRight: '8px' }" class="cursor-porinter">
              查看
            </span>

            <span @click="$router.push({ name: 'course-to-examine', query: { courseName: scope.row.name ,  courseId: scope.row.courseId , rewardPoint:scope.row.rewardPoint  } })" :style="{ marginRight: '8px' }" class="cursor-porinter">
              审核
            </span>

            <span :style="{ marginRight: '8px' }" class="cursor-porinter" @click="del(scope.row.status == 2 ? true : false, scope.row)">
              {{scope.row.status | status('下线' , '上线')}}
            </span>

            <span @click="$router.push({ name: 'course-edit', query: { courseId: scope.row.courseId } })" class="cursor-porinter">
              编辑
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
    <Ul-Upload title="课程上传" :uploadLoading="uploadLoading" :uploadVisible="uploadVisible" :uploadTips="uploadTips" @upload="upload" />
  </div>
</template>

<script>
  import { publicMixin } from "@/mixin/publicMixin";

  import {
    templateDown,
    templateUpload,
    courseQuery,
    courseModfiyStatus,
  } from "@/api/courseManagement";

  import { publicMethod } from "@/utils/common";

  export default {
    name: "course-management",

    mixins: [publicMixin],

    data() {
      return {
        confrimVisible: { state: false }, //确认框显示
        uploadVisible: { state: false }, //上传框显示
        confirmMssage: [
          "确认要删除当前课程吗？",
          "课程删除后将不可操作，请仔细核对后删除。",
        ],
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
        const res = await courseQuery({
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
       * 模板下载
       * */
      async templateDown() {
        const res = await templateDown();
        res.data.code == "E0" &&
          publicMethod.exportMethod(res.data.data.url, "课程管理模板");
      },
      /**
       * 课程上下线
       * */
      del: function (status, row) {
        this.confirmMssage = [
          `确认要${status ? "上线" : "下线"}当前课程吗？`,
          `课程${
            status ? "上线后将可以" : "下线后将不可以"
          }操作，请仔细核对后操作。`,
        ];
        this.delDate = row;
        this.confrimVisible.state = true;
      },
      setStatusConfrimSubmit: async function () {
        const res = await courseModfiyStatus({
          courseId: this.delDate.courseId,
          status: this.delDate.status == 2 ? 1 : 2,
        });
        if (res.data.code == "E0") {
          this.delDate.status = res.data.data.status;
          // res.data.data.status == 2
          //   ? (this.delDate.status = 2)
          //   : (this.delDate.status = 1);
          this.$root.$tipsInfo(`操作成功`, "success");
        } else {
          this.$root.$tipsInfo(
            `操作失败 , 失败原因:${res.data.message}`,
            "error"
          );
        }
        this.confrimVisible.state = false;
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
                ? `上传成功 , 成功上传${total}个课程`
                : `成功上传${successNum}个课程，${failureNum}个课程不予上传，具体信息如下：`,
            tableHeader: failureCourseList.length
              ? [
                  { col: "课程ID", prop: "courseId" },
                  { col: "课程名称", prop: "name", minWidth: 180, isTips: true },
                  { col: "课程类别", prop: "type" },
                  {
                    col: "课程简介",
                    prop: "introduction",
                    minWidth: 200,
                    isTips: true,
                  },
                  {
                    col: "课程详细介绍",
                    prop: "desc",
                    minWidth: 250,
                    isTips: true,
                  },
                  { col: "课程积分", prop: "rewardPoint" },
                  {
                    col: "二维码链接",
                    prop: "linkUrl",
                    minWidth: 180,
                    isTips: true,
                  },
                  {
                    col: "失败原因",
                    prop: "failureReason",
                    minWidth: 200,
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
