<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 20:27:53
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-16 13:50:27
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
      <el-table ref="filterTable" :data="masterData" @sort-change="onSortChange"  @filter-change="filterStatus" height="500" style="width: 100%">

        <el-table-column prop="projectName" label="项目名称" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <span @click="$router.push({ name: 'project-detail', query: { projectName: scope.row.projectName } })" :style="{ marginRight: '8px' }" class="cursor-porinter">
              {{scope.row.projectName}}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="projectIntegral" label="项目积分" min-width="120" sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column prop="uploader" label="上传人" min-width="100">
        </el-table-column>

        <el-table-column prop="uploadTime" label="上传时间" show-overflow-tooltip min-width="180" sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column prop="toBeComplete" label="待完成" min-width="120" sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column prop="toExamineing" label="审核中" min-width="120" sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column prop="completed" label="已完成" min-width="120" sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column align="center" fixed="right" label="状态" min-width="100" :filters="[
        { text: '已下线', value: '0' }, 
        { text: '已上线', value: '1' },
        ]">
          <template slot-scope="scope">
            <span :class="[scope.row.status ? 'success': 'rejected' ]">
              {{scope.row.status | status('已上线' , '已下线')}}
            </span>
          </template>
        </el-table-column>

        <el-table-column align="center" fixed="right" label="操作" min-width="130">
          <template slot-scope="scope">

            <span @click="$router.push({ name: 'project-detail', query: { projectName: scope.row.projectName } })" :style="{ marginRight: '8px' }" class="cursor-porinter">
              查看
            </span>

            <span @click="$router.push({ name: 'project-to-examine', query: { projectName: scope.row.projectName , projectIntegral:scope.row.projectIntegral  } })" :style="{ marginRight: '8px' }" class="cursor-porinter">
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
    <Ul-Upload title="项目上传" :uploadVisible="uploadVisible" :uploadTips="uploadTips" @upload="upload" />
  </div>
</template>

<script>

  import {publicMixin} from "@/mixin/publicMixin"

  export default {
    name: "project-management",

    mixins:[publicMixin],

    data() {
      return {
        confrimVisible: { state: false }, //确认框显示
        uploadVisible: { state: false }, //上传框显示
        confirmMssage: [],
        uploadTips: {}, //上传文件的提示信息
        masterData: [
          {
            projectName: "项目名称1",
            projectIntegral: "200",
            toBeComplete: "50",
            uploader: "钢铁侠",
            uploadTime: "2020/03/13 11:50:00",
            toExamineing: 25,
            completed: 200,
            status: 1,
          },
          {
            projectName: "项目名称2",
            projectIntegral: "200",
            toBeComplete: "50",
            uploader: "钢铁侠",
            uploadTime: "2020/03/13 11:50:00",
            toExamineing: 25,
            completed: 200,
            status: 0,
          },
          {
            projectName: "项目名称3",
            projectIntegral: "200",
            toBeComplete: "50",
            uploader: "钢铁侠",
            uploadTime: "2020/03/13 11:50:00",
            toExamineing: 25,
            completed: 200,
            status: 1,
          },
          {
            projectName: "项目名称4",
            projectIntegral: "200",
            toBeComplete: "50",
            uploader: "钢铁侠",
            uploadTime: "2020/03/13 11:50:00",
            toExamineing: 25,
            completed: 200,
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
       * 修改课程状态
       * */
      setStatusConfrimSubmit: function () {
        console.log(`${this.delDate.status ? "下线" : "上线"}`, this.delDate);
        this.delDate.status
          ? (this.delDate.status = 0)
          : (this.delDate.status = 1);
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
      upload: function (file) {
        console.log(file);
        // this.uploadTips = {type:'error' , message:'这是一条错误信息'}
        // this.uploadTips = {type:'success' , message:'这是一条成功信息'}
        this.uploadTips = {
          type: "partialSuccess",
          message: "这是一条成功一部分的信息",
          tableHeader: [
            { col: "项目名称", prop: "projectName" },
            {
              col: "项目描述",
              prop: "projectDescribe",
              minWidth: "200",
              isTips: true,
            },
            { col: "项目积分", prop: "projectIntegral" },
          ],
          tableData: [
            {
              projectName: "项目A",
              projectDescribe: "项目描述项目秒项目描述项目描述A",
              projectIntegral: "200",
            },
            {
              projectName: "项目B",
              projectDescribe: "项目描述项目秒项目描述项目描述B",
              projectIntegral: "20",
            },
            {
              projectName: "项目C",
              projectDescribe: "项目描述项目秒项目描述项目描述C",
              projectIntegral: "21",
            },
            {
              projectName: "项目D",
              projectDescribe: "项目描述项目秒项目描述项目描述D",
              projectIntegral: "1",
            },
            {
              projectName: "项目E",
              projectDescribe: "项目描述项目秒项目描述项目描述E",
              projectIntegral: "100",
            },
          ],
        };
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
