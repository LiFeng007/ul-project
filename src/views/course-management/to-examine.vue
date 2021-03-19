<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 22:59:14
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-19 12:55:26
-->
<template>
  <div class="ul-course-to-examine">
    <!-- ** -->

    <!-- ** -->
    <div class="ul-main-com">
      <!-- ** -->
      <Ul-nav @getData="getData">
        <template v-slot:left>
          课程名称：{{$route.query.courseName}} 课程积分：{{$route.query.rewardPoint}}
        </template>
      </Ul-nav>
      <!-- ** -->
      <el-table ref="filterTable" :data="masterData" @sort-change="onSortChange" v-loading="tableIsLoading" @filter-change="filterStatus" height="500" style="width: 100%">

        <el-table-column prop="wechatNo" label="微信号" min-width="200" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="wechatName" label="微信昵称" min-width="180">
        </el-table-column>

        <el-table-column prop="name" label="姓名" min-width="100">
        </el-table-column>

        <el-table-column prop="emailAddress" label="邮箱" min-width="180" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="screenshot" label="审核截图" show-overflow-tooltip min-width="80">
          <template slot-scope="scope">
            <el-image :src="scope.row.imageUrl" :preview-src-list="[scope.row.imageUrl]">
              <div v-if="scope.row.imageUrl == null" :style="{width:'37px !important' , lineHeight:'63px'}" slot="error" class="image-slot">
                无截图
              </div>
            </el-image>
          </template>
        </el-table-column>

        <el-table-column prop="uploadTime" label="上传时间" min-width="180" show-overflow-tooltip sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column prop="reviewerName" label="审核人" min-width="120" show-overflow-tooltip>
        </el-table-column>

        <el-table-column min-width="100" label="状态" :filters="[
        { text: '待审核', value: 1 }, 
        { text: '待上传', value: 2 },
        { text: '已完成', value: 4 },
        { text: '已驳回', value: 3 }
        ]">
          <template slot-scope="scope">

            <span :class="[
            scope.row.status === 1 && 'completed' , 
            scope.row.status === 2 && 'toBeUploaded' , 
            scope.row.status === 4 && 'success' , 
            scope.row.status === 3 && 'rejected' , 
            ]">
              {{scope.row.status | courseStatus}}
            </span>

          </template>
        </el-table-column>

        <el-table-column align="center" fixed="right" label="操作" min-width="130">
          <template slot-scope="scope">

            <span @click="scope.row.status === '待审核' && handlerCourse(true , scope.row)" :style="{ marginRight: '8px' }" :class="[scope.row.status === '待审核' ? 'cursor-porinter':'no-handle' ]">
              通过
            </span>

            <span @click="scope.row.status === '待审核' && handlerCourse(false , scope.row)" :style="{ marginRight: '8px' }" :class="[scope.row.status === '待审核' ? 'cursor-porinter':'no-handle' ]">
              不通过
            </span>

          </template>
        </el-table-column>
      </el-table>
      <!-- ** -->
      <Ul-Page :total="total" @getData="getData" />
      <!-- ** -->
      <Ul-Confirm :confrimVisible="adoptVisible" :message="confirmMssage" @submit="adoptMeth" />
      <Ul-Confirm :confrimVisible="noVisible" :message="confirmMssage" @submit="noMeth" />
    </div>

  </div>
</template>

<script>
  import { publicMixin } from "@/mixin/publicMixin";

  import { courseRecordQueryByCourseId } from "@/api/courseManagement";
  export default {
    name: "course-to-examine",

    mixins: [publicMixin],

    data() {
      return {
        adoptVisible: { state: false }, //通过确认框显示
        noVisible: { state: false }, //不通过确认框显示
        confirmMssage: [],
        StatusScreening: "", //状态筛选
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
        const res = await courseRecordQueryByCourseId({
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
       * 通过审核
       * **/
      adoptMeth: function () {
        console.log("通过", this.delDate);
        this.adoptVisible.state = false;
      },
      /**
       * 不通过审核
       * */
      noMeth: function () {
        console.log("不通过", this.delDate);
        this.noVisible.state = false;
      },
      /**
       * 通过 or 不通过方法调取
       * */
      handlerCourse: function (status, row) {
        this.confirmMssage = [
          `确认${status ? "要通过" : "不通过"}当前截图吗？`,
          `${
            status ? "通过后该员工将获取相应的积分" : "不通过该员工将无法获取积分"
          }，请仔细核对后操作。`,
        ];
        this.delDate = row;
        status ? (this.adoptVisible.state = true) : (this.noVisible.state = true);
      },
    },
  };
</script>
