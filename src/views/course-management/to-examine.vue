<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 22:59:14
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-13 22:48:18
-->
<template>
  <div class="ul-course-to-examine">
    <!-- ** -->

    <!-- ** -->
    <div class="ul-main-com">
      <!-- ** -->
      <Ul-nav @getData="getData">
        <template v-slot:left>
          课程名称：{{$route.query.courseName}} 课程积分：{{$route.query.coursePoints}}
        </template>
      </Ul-nav>
      <!-- ** -->
      <el-table ref="filterTable" :data="masterData" height="500" style="width: 100%">

        <el-table-column prop="wechatNumber" label="微信号" min-width="120">
        </el-table-column>

        <el-table-column prop="wechatNickname" label="微信昵称" min-width="180">
        </el-table-column>

        <el-table-column prop="name" label="姓名" min-width="100">
        </el-table-column>

        <el-table-column prop="screenshot" label="审核截图" show-overflow-tooltip min-width="80">
          <template slot-scope="scope">
            <el-image style="width: 100px; height: 100px" :src="scope.row.screenshot" :preview-src-list="[scope.row.screenshot]">
            </el-image>
          </template>
        </el-table-column>

        <el-table-column prop="uploadTime" label="上传时间" min-width="120">
        </el-table-column>

        <el-table-column prop="reviewer" label="审核人" min-width="180" show-overflow-tooltip sortable>
        </el-table-column>

        <el-table-column prop="status" label="状态" min-width="100" sortable :filters="[
        { text: '待审核', value: '0' }, 
        { text: '待上传', value: '1' },
        { text: '已完成', value: '2' },
        { text: '已驳回', value: '3' }
        ]" :filter-method="filterStatus">
        </el-table-column>

        <el-table-column align="center" fixed="right" label="操作" min-width="130">
          <template >

            <span @click="confrimVisible.state = true" :style="{ marginRight: '8px' }" class="cursor-porinter">
              通过
            </span>

            <span @click="confrimVisible.state = true" :style="{ marginRight: '8px' }" class="cursor-porinter">
              不通过
            </span>

          </template>
        </el-table-column>
      </el-table>
      <!-- ** -->
      <Ul-Page :total="201" @getData="getData" />
      <!-- ** -->
      <Ul-Confirm :confrimVisible="confrimVisible" :message="confirmMssage" @submit="confrimSubmit" />
    </div>

  </div>
</template>

<script>
  import UlNav from "@/components/nav";

  import UlPage from "@/components/paging";

  import UlConfirm from "@/components/confirm";

  export default {
    name: "course-to-examine",

    components: { UlNav, UlPage, UlConfirm },

    data() {
      return {
        confrimVisible: { state: false }, //确认框显示
        confirmMssage: [
          "确认要删除当前课程吗？",
          "课程删除后将不可操作，请仔细核对后删除。",
        ],
        retrievalInfo: "", //检索信息
        StatusScreening:"" , //状态筛选
        delDate: {}, //将被删除的数据
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
        e !== null && (this.retrievalInfo = e);
        const pageObj = page ? page : { currentPage: 1, limit: 10 };
        console.log(this.retrievalInfo, pageObj , this.StatusScreening);
      },
      /**
       * 询问对话框提交
       * **/
      confrimSubmit: function () {
        console.log("确认删除", this.delDate);
        this.confrimVisible.state = false;
      },
      /**
       * 状态检索
       * */
      filterStatus: function (status) {
        this.StatusScreening = status
        console.log(status);
      },
      /**
       * 通过 or 不通过方法调取
       * */ 
      handlerCourse:function(status){
        
      }
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