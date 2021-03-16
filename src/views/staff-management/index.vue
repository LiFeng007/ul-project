<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 20:29:27
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-16 13:55:16
-->
<template>
  <div class="ul-staff-management">
    <!-- ** -->
    <div class="ul-main-com">
      <!-- ** -->
      <Ul-nav @getData="getData">
        <template v-slot:left>
          <button class="routine-btn" @click="() => uploadVisible.state = true">白名单导入</button>
        </template>
      </Ul-nav>
      <!-- ** -->
      <el-table ref="filterTable" :data="masterData" @sort-change="onSortChange"  @filter-change="filterStatus" height="500" style="width: 100%">

        <el-table-column prop="screenshot" align="center"  min-width="80">
          <template slot-scope="scope">
            <!-- <el-image @click="() => {}" :src="scope.row.screenshot">
            </el-image> -->
            <img :src="scope.row.screenshot" alt="微信头像" class="heade-prot">
          </template>
        </el-table-column>

        <el-table-column prop="wechatNumber" label="微信号" min-width="120">
        </el-table-column>

        <el-table-column prop="wechatNikname" label="微信昵称" min-width="180">
        </el-table-column>

        <el-table-column prop="name" label="姓名" min-width="100">
          <template slot-scope="scope">
            <span @click="$router.push({ name: 'staff-detail', query: { staffId: 'testId' } })" :style="{ marginRight: '8px' }" class="cursor-porinter">
              {{scope.row.name}}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="department" label="部门" show-overflow-tooltip min-width="180">
        </el-table-column>

        <el-table-column prop="email" label="邮箱" min-width="220">
        </el-table-column>

        <el-table-column prop="combatPower" label="战力值" min-width="180" show-overflow-tooltip  sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column prop="title" label="称号" min-width="100">
        </el-table-column>

        <el-table-column prop="currentPoints" label="当前积分" min-width="100"  sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column prop="completeCourseNumber" label="完成课程数" min-width="140"  sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column prop="completeProjectNumber" label="完成项目数" min-width="140"  sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column align="center" fixed="right" label="状态" min-width="100" :filters="[
        { text: '已启用', value: '1' }, 
        { text: '已禁用', value: '0' },
        ]">
          <template slot-scope="scope">
            <span :class="[scope.row.status ? 'success': 'rejected' ]">
              {{scope.row.status | status('已启用' , '已禁用')}}
            </span>
          </template>
        </el-table-column>

        <el-table-column align="center" fixed="right" label="操作" min-width="130">
          <template slot-scope="scope">

            <span @click="$router.push({ name: 'staff-detail', query: { staffId: 'testId' } })" :style="{ marginRight: '8px' }" class="cursor-porinter">
              查看
            </span>

            <span @click="handlerCourse(scope.row.status ? true : false , scope.row)" :style="{ marginRight: '8px' }" class="cursor-porinter">
              {{scope.row.status | status('禁用' , '启用')}}
            </span>

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
    <Ul-Confirm :confrimVisible="confrimVisible" :message="delconfirmMssage" @submit="delConfrimSubmit" />
    <!-- ** -->
    <Ul-Confirm :confrimVisible="setStatusConfrimVisible" :message="setStatusConfirmMssage" @submit="setStatusConfrimSubmit" />
    <!-- ** -->
    <Ul-Upload title="白名单导入" :uploadVisible="uploadVisible" :uploadTips="uploadTips" @upload="upload" />
  </div>
</template>

<script>

 import { publicMixin } from "@/mixin/publicMixin";

  export default {
    name: "staff-management",

    mixins:[publicMixin] , 

    data() {
      return {
        confrimVisible: { state: false }, //删除确认框显示
        setStatusConfrimVisible: { state: false }, //修改状态确认框显示
        uploadVisible: { state: false }, //上传框显示
        setStatusConfirmMssage: [],
        delconfirmMssage: [
          "确认要删除当前员工吗？",
          "员工 删除后将不可操作，请仔细核对后删除。",
        ],
        uploadTips: {}, //上传文件的提示信息
        masterData: [
          {
            wechatNumber: "zs124839570",
            wechatNikname: "张三的微信名",
            name: "张三",
            department: "人力资源部",
            email: "zahngsan001@unilever.com",
            combatPower: "200",
            title: "算法大神",
            currentPoints: 200,
            completeCourseNumber: 8,
            completeProjectNumber: 2,
            status: 1,
            screenshot:
              "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=147053525,1014959484&fm=26&gp=0.jpg",
          },
          {
            wechatNumber: "ls124839570",
            wechatNikname: "李四的微信名",
            name: "李四",
            department: "人力资源部",
            email: "zahngsan001@unilever.com",
            combatPower: "200",
            title: "算法大神",
            currentPoints: 200,
            completeCourseNumber: 8,
            completeProjectNumber: 2,
            status: 0,
            screenshot:
              "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1021798210,2859690464&fm=26&gp=0.jpg",
          },
          {
            wechatNumber: "ww124839570",
            wechatNikname: "ww的微信名",
            name: "王五",
            department: "人力资源部",
            email: "zahngsan001@unilever.com",
            combatPower: "200",
            title: "算法大神",
            currentPoints: 200,
            completeCourseNumber: 8,
            completeProjectNumber: 2,
            status: 1,
            screenshot:
              "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3850099191,250318210&fm=26&gp=0.jpg",
          },
          {
            wechatNumber: "zs2124839570",
            wechatNikname: "张三2的微信名",
            name: "张三2",
            department: "人力资源部",
            email: "zahngsan001@unilever.com",
            combatPower: "200",
            title: "算法大神",
            currentPoints: 200,
            completeCourseNumber: 8,
            completeProjectNumber: 2,
            status: 1,
            screenshot:
              "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1633520149,1682204961&fm=26&gp=0.jpg",
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
      delConfrimSubmit: function () {
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
       * 修改员工状态
       */
      setStatusConfrimSubmit: function () {
        console.log(`${this.delDate.status ? "禁用" : "启用"}`, this.delDate);
        this.delDate.status
          ? (this.delDate.status = 0)
          : (this.delDate.status = 1);
        this.setStatusConfrimVisible.state = false;
      },
      /**
       * 确定上传
       * **/
      upload: function (file) {
        console.log(file);
        // this.uploadTips = {type:'error' , message:'这是一条错误信息'}
        // this.uploadTips = {type:'success' , message:'这是一条成功信息'}
        this.uploadTips = {
          type: "partialSuccess",
          message: "这是一条成功一部分的信息",
          tableHeader: [
            { col: "邮箱", prop: "email", minWidth: 180, isTips: true },
          ],
          tableData: [
            { email: "123323ss@unilever.com" },
            { email: "123323@unilever.com" },
            { email: "123325546@unilever.com" },
            { email: "1233236796@unilever.com" },
            { email: "123323ryur@unilever.com" },
            { email: "123323@unilever.com" },
          ],
        };
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