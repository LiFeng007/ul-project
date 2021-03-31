<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-11 10:47:32
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-31 10:18:34
-->
<template>
  <div class="ul-project-to-examine">
    <!-- ** -->
    <div class="ul-main-com">
      <!-- ** -->
      <Ul-nav @getData="getData">
        <template v-slot:left>
          项目名称：{{$route.query.projectName}} 项目积分：{{$route.query.projectIntegral}}
        </template>
      </Ul-nav>
      <!-- ** -->
      <el-table ref="filterTable" :data="masterData" @sort-change="onSortChange" @filter-change="filterStatus" v-loading="tableIsLoading" height="500" style="width: 100%">

        <el-table-column prop="emailAddress" label="邮箱" show-overflow-tooltip min-width="180">
        </el-table-column>

        <el-table-column prop="wechatName" label="微信昵称" min-width="120" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="name" label="姓名" min-width="100">
          <template slot-scope="scope">
            <span @click="$router.push({ name: 'staff-detail', query: { staffId: scope.row.userId } })" class="cursor-porinter">
              {{scope.row.name}}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="imageUrl" label="上传截图" min-width="80">
          <template slot-scope="scope">
            <el-image :src="scope.row.imageUrl" :preview-src-list="[scope.row.imageUrl]">
              <div v-if="scope.row.imageUrl == null" :style="{width:'37px !important' , lineHeight:'63px'}" slot="error" class="image-slot">
                无截图
              </div>
            </el-image>
          </template>
        </el-table-column>

        <el-table-column prop="createdAt" label="上传时间" min-width="180" show-overflow-tooltip sortable="custom" :sort-orders="['ascending','descending']">
          <template slot-scope="scope">
            <span>
              {{scope.row.createdAt | data('YMDHMS')}}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="reviewerName" label="审核人" min-width="120">
        </el-table-column>

        <el-table-column min-width="100" label="状态" :filters="[
        { text: '待审核', value: 1 }, 
        { text: '待上传', value: 2 },
        { text: '已完成', value: 4 },
        { text: '已驳回', value: 3 }
        ]">
          <template slot-scope="scope">

            <span :class="[
            scope.row.status === 1 ? 'completed': '' , 
            scope.row.status === 2 ? 'toBeUploaded': '' , 
            scope.row.status === 4 ? 'success': '' , 
            scope.row.status === 3 ? 'rejected': '' , 
            ]">
              {{scope.row.status | courseStatus}}
            </span>

          </template>
        </el-table-column>

        <el-table-column align="center" fixed="right" label="操作" min-width="130">
          <template slot-scope="scope">

            <span @click="scope.row.status === 1 && handlerCourse(true , scope.row , scope.$index)" :style="{ marginRight: '8px' }" :class="[scope.row.status === 1 ? 'cursor-porinter':'no-handle' ]">
              通过
            </span>

            <span @click="scope.row.status === 1 && handlerCourse(false , scope.row , scope.$index)" :style="{ marginRight: '8px' }" :class="[scope.row.status === 1 ? 'cursor-porinter':'no-handle' ]">
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

  import { projectRecordQuery, projectToExamine } from "@/api/projectManagement";

  export default {
    name: "project-to-examine",

    mixins: [publicMixin],

    data() {
      return {
        adoptVisible: { state: false }, //通过确认框显示
        noVisible: { state: false }, //不通过确认框显示
        confirmMssage: [],
        retrievalInfo: "", //检索信息
        StatusScreening: "", //状态筛选
        delDate: {}, //被处理的数据 通过或者不通过
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
        const res = await projectRecordQuery({
          ...this.payload,
          projectId: this.$route.query.projectId - 0,
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
      adoptMeth: async function () {
        const res = await projectToExamine({
          status: 4,
          projectRecordId: this.delDate.list.id,
        });
        if (res.data.code == "E0" && res.data.data !== null) {
          this.masterData[this.delDate.index].status = 4;
          this.$root.$tipsInfo("操作成功", "success");
        } else this.$root.$tipsInfo("操作失败", "error");
        this.adoptVisible.state = false;
      },
      /**
       * 不通过审核
       * */
      noMeth: async function () {
        const res = await projectToExamine({
          status: 3,
          projectRecordId: this.delDate.list.id,
        });
        if (res.data.code == "E0" && res.data.data !== null) {
          this.masterData[this.delDate.index].status = 3;
          this.$root.$tipsInfo("操作成功", "success");
        } else this.$root.$tipsInfo("操作失败", "error");
        this.noVisible.state = false;
      },
      /**
       * 通过 or 不通过方法调取
       * */
      handlerCourse: function (status, row, index) {
        this.confirmMssage = [
          `确认${status ? "要通过" : "不通过"}当前截图吗？`,
          `${
            status ? "通过后该员工将获取相应的积分" : "不通过该员工将无法获取积分"
          }，请仔细核对后操作。`,
        ];
        this.delDate = { list: row, index };
        status ? (this.adoptVisible.state = true) : (this.noVisible.state = true);
      },
    },
  };
</script>

<style>
</style>