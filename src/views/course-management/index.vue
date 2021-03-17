<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 20:26:46
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-17 16:18:47
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
      <el-table ref="filterTable" :data="masterData" @sort-change="onSortChange" @filter-change="filterStatus" height="500" style="width: 100%">

        <el-table-column prop="courseId" label="课程ID" min-width="120">
        </el-table-column>

        <el-table-column label="课程名称" prop="name" min-width="150">
          <template slot-scope="scope">
            <span @click="$router.push({ name: 'course-detail', query: { courseId: scope.row.courseId } })" :style="{ marginRight: '8px' }" class="cursor-porinter">
              {{scope.row.name}}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="rewardPoint" label="课程积分" min-width="100" sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column prop="linkUrl" label="跳转链接" show-overflow-tooltip min-width="180">
        </el-table-column>

        <el-table-column prop="uploaderUserName" label="上传人" min-width="120">
        </el-table-column>

        <el-table-column prop="Uploadtime" label="上传时间" min-width="180" show-overflow-tooltip sortable="custom" :sort-orders="['ascending','descending']">
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
        { text: '已下线', value: '0' }, 
        { text: '已上线', value: '1' },
        ]" >
          <template slot-scope="scope">
            <span :class="[scope.row.status ? 'success': 'rejected' ]">
              {{scope.row.status | status('已上线' , '已下线')}}
            </span>
          </template>
        </el-table-column>

        <el-table-column align="center" fixed="right" label="操作" min-width="130">
          <template slot-scope="scope">

            <span @click="$router.push({ name: 'course-detail', query: { courseId: scope.row.courseId } })" :style="{ marginRight: '8px' }" class="cursor-porinter">
              查看
            </span>

            <span @click="$router.push({ name: 'course-to-examine', query: { courseName: scope.row.name , rewardPoint:scope.row.rewardPoint  } })" :style="{ marginRight: '8px' }" class="cursor-porinter">
              审核
            </span>

            <span :style="{ marginRight: '8px' }" class="cursor-porinter" @click="del(scope.row.status ? false : true, scope.row)">
              {{scope.row.status | status('下线' , '上线')}}
            </span>
          </template>
        </el-table-column>
      </el-table>
      <!-- ** -->
      <Ul-Page :total="201" @getData="getData" />
    </div>
    <!-- ** -->
    <Ul-Confirm :confrimVisible="confrimVisible" :message="confirmMssage" @submit="setStatusConfrimSubmit" />
    <!-- ** -->
    <Ul-Upload title="课程上传" :uploadVisible="uploadVisible" :uploadTips="uploadTips" @upload="upload" />
  </div>
</template>

<script>
  import { publicMixin } from "@/mixin/publicMixin";

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
        masterData: [
          {
            courseId: 2021031201,
            name: "课程名称",
            rewardPoint: "50",
            linkUrl: "www.baidu.com",
            uploaderUserName: "钢铁侠",
            Uploadtime: "2020/03/13 11:50:00",
            unfinishedNum: 25,
            unreviewedNum: 24,
            unpassedNum: 12345678,
            passedNum: 200,
            status: 1,
          },
          {
            courseId: 2021031202,
            name: "课程名称1",
            rewardPoint: "60",
            linkUrl: "www.baidu2.com",
            uploaderUserName: "蝙蝠侠",
            Uploadtime: "2020/03/13 11:50:01",
            unfinishedNum: 30,
            unreviewedNum: 24,
            unpassedNum: 20,
            passedNum: 200,
            status: 0,
          },
          {
            courseId: 2021031203,
            name: "课程名称2",
            rewardPoint: "501",
            linkUrl: "www.baidu.com1",
            uploaderUserName: "蜘蛛侠",
            Uploadtime: "2020/03/13 11:50:00",
            unfinishedNum: 21,
            unreviewedNum: 24,
            unpassedNum: 20,
            passedNum: 200,
            status: 1,
          },
          {
            courseId: 2021031203,
            name: "课程名称3",
            rewardPoint: "502",
            linkUrl: "www.baidu.com2",
            uploaderUserName: "钢铁侠",
            Uploadtime: "2020/03/13 11:50:00",
            unfinishedNum: 24,
            unreviewedNum: 24,
            unpassedNum: 20,
            passedNum: 200,
            status: 1,
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
        console.log("确认删除", this.delDate);
        this.confrimVisible.state = false;
      },
      /**
       * 模板下载
       * */
      templateDown() {
        console.log("模板下载");
      },
      /**
       * 删除课程
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
      setStatusConfrimSubmit: function () {
        console.log(`${this.delDate.status ? "下线" : "上线"}`, this.delDate);
        this.delDate.status
          ? (this.delDate.status = 0)
          : (this.delDate.status = 1);
        this.confrimVisible.state = false;
      },
      /**
       * 确定上传
       * **/
      upload: function (file) {
        console.log(file);
        this.uploadTips = {type:'error' , message:'这是一条错误信息'}
        // this.uploadTips = {type:'success' , message:'这是一条成功信息'}
        // this.uploadTips = {
        //   type: "partialSuccess",
        //   message: "这是一条成功一部分的信息",
        //   tableHeader: [
        //     { col: "课程ID", prop: "corseId" },
        //     { col: "课程名称", prop: "corseName" },
        //     { col: "课程描述", prop: "courseDescribe", minWidth: 180, isTips: true },
        //     { col: "课程积分", prop: "couresJF" },
        //     { col: "二维码链接", prop: "linkUrl", minWidth: 180, isTips: true },
        //   ],
        //   tableData: [
        //     { corseId: 1, corseName: "课程A",courseDescribe:'这是一段课程描述,这是一段课程描述' , couresJF:'20' , linkUrl: "pages/index/index" },
        //     { corseId: 2, corseName: "课程B",courseDescribe:'这是一段课程描述,这是一段课程描述' , couresJF:'20' , linkUrl: "pages/index/index" },
        //     { corseId: 3, corseName: "课程C",courseDescribe:'这是一段课程描述,这是一段课程描述' , couresJF:'20' , linkUrl: "pages/index/index" },
        //     { corseId: 4, corseName: "课程D",courseDescribe:'这是一段课程描述,这是一段课程描述' , couresJF:'20' , linkUrl: "pages/index/index" },
        //     { corseId: 5, corseName: "课程E",courseDescribe:'这是一段课程描述,这是一段课程描述' , couresJF:'20' , linkUrl: "pages/index/index" },
        //   ],
        // };
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
