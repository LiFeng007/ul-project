<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-11 10:47:32
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-16 14:07:08
-->
<template>
  <div>
    <!-- ** -->
    <div class="ul-main-com">
      <!-- ** -->
      <Ul-nav @getData="getData">
        <template v-slot:left>
          项目名称：{{$route.query.projectName}} 项目积分：{{$route.query.projectIntegral}}
        </template>
      </Ul-nav>
      <!-- ** -->
      <el-table ref="filterTable" :data="masterData" @sort-change="onSortChange" @filter-change="filterStatus" height="500" style="width: 100%">

        <el-table-column prop="wechatNumber" label="微信号" min-width="120">
        </el-table-column>

        <el-table-column prop="wechatNickname" label="微信昵称" min-width="120" show-overflow-tooltip>
        </el-table-column>

        <el-table-column prop="name" label="姓名" min-width="100">
        </el-table-column>

        <el-table-column prop="screenshot" label="上传截图" min-width="80">
          <template slot-scope="scope">
            <el-image :src="scope.row.screenshot" :preview-src-list="[scope.row.screenshot]">
            </el-image>
          </template>
        </el-table-column>

        <el-table-column prop="uploadTime" label="上传时间" min-width="180" show-overflow-tooltip sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column prop="reviewer" label="审核人" min-width="120">
        </el-table-column>

        <el-table-column min-width="100" label="状态" :filters="[
        { text: '待审核', value: '0' }, 
        { text: '待上传', value: '1' },
        { text: '已完成', value: '2' },
        { text: '已驳回', value: '3' }
        ]">
          <template slot-scope="scope">

            <span :class="[
            scope.row.status === '待审核' ? 'completed': '' , 
            scope.row.status === '待上传' ? 'toBeUploaded': '' , 
            scope.row.status === '已完成' ? 'success': '' , 
            scope.row.status === '已驳回' ? 'rejected': '' , 
            ]">
              {{scope.row.status}}
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
      <Ul-Page :total="201" @getData="getData" />
      <!-- ** -->
      <Ul-Confirm :confrimVisible="adoptVisible" :message="confirmMssage" @submit="adoptMeth" />
      <Ul-Confirm :confrimVisible="noVisible" :message="confirmMssage" @submit="noMeth" />
    </div>
  </div>
</template>

<script>
  import { publicMixin } from "@/mixin/publicMixin";

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
        masterData: [
          {
            wechatNumber: "dhsjkhdlksdjsk",
            wechatNickname: "小爱",
            name: "万飞",
            screenshot:
              "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=147053525,1014959484&fm=26&gp=0.jpg",
            reviewer: "钢铁侠",
            status: "待审核",
            uploadTime: "2020/03/13 11:50:00",
          },
          {
            wechatNumber: 2021031202,
            wechatNickname: "课程名称1",
            name: "60",
            screenshot:
              "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1021798210,2859690464&fm=26&gp=0.jpg",
            reviewer: "蝙蝠侠",
            status: "待上传",
            uploadTime: "2020/03/13 11:50:01",
          },
          {
            wechatNumber: 2021031203,
            wechatNickname: "课程名称2",
            name: "501",
            screenshot:
              "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3850099191,250318210&fm=26&gp=0.jpg",
            reviewer: "蜘蛛侠",
            status: "已完成",
            uploadTime: "2020/03/13 11:50:00",
          },
          {
            wechatNumber: 2021031203,
            wechatNickname: "课程名称3",
            name: "502",
            screenshot:
              "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1633520149,1682204961&fm=26&gp=0.jpg",
            reviewer: "钢铁侠",
            status: "已驳回",
            uploadTime: "2020/03/13 11:50:00",
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
       * 状态检索
       * */
      filterStatus: function (status) {
        this.StatusScreening = status;
        console.log(status);
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

<style>
</style>