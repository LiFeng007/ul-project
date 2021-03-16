<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 20:28:38
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-16 11:45:47
-->
<template>
  <div class="ul-puzzle-solving">
    <!-- ** -->
    <div class="ul-main-com">
      <!-- ** -->
      <Ul-nav @getData="getData">
        <template v-slot:left>
          <button class="routine-btn" @click="() => uploadVisible.state = true">积分导入</button>
          <span class="cursor-porinter" @click="templateDown">下载模板</span>
        </template>
      </Ul-nav>
      <!-- ** -->
      <el-table ref="filterTable" :data="masterData" @sort-change="onSortChange" height="500" style="width: 100%">

        <el-table-column prop="fileName" label="文件名称" min-width="120">
        </el-table-column>

        <el-table-column prop="staffNumber" label="员工数量" min-width="180" sortable="custom" :sort-orders="['ascending','descending']">
        </el-table-column>

        <el-table-column prop="EmployeeSh" label="导入者" min-width="100">
        </el-table-column>

        <el-table-column prop="ImportShij" label="导入时间" show-overflow-tooltip min-width="180" sortable>
        </el-table-column>

        <el-table-column align="center" fixed="right" label="操作" min-width="130">
          <template slot-scope="scope">
            <span @click="$router.push({ name: 'puzzle-solving-detail', query: { fileName: scope.row.fileName , staffNumber:scope.row.staffNumber } })" :style="{ marginRight: '8px' }" class="cursor-porinter">
              查看
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
    <Ul-Confirm :confrimVisible="confrimVisible" :message="confirmMssage" @submit="confrimSubmit" />
    <!-- ** -->
    <Ul-Upload title="积分上传" :uploadVisible="uploadVisible" :uploadTips="uploadTips" @upload="upload" />
  </div>
</template>

<script>
  import { publicMixin } from "@/mixin/publicMixin";

  export default {
    name: "puzzle-solving-module",

    mixins: [publicMixin],

    data() {
      return {
        confrimVisible: { state: false }, //确认框显示
        uploadVisible: { state: false }, //上传框显示
        confirmMssage: [
          "确认要删除当前文件吗？",
          "文件删除后将不可操作，请仔细核对后删除。",
        ],
        retrievalInfo: "", //检索信息
        delDate: {}, //将被删除的数据
        uploadTips: {}, //上传文件的提示信息
        masterData: [
          {
            fileName: "积分导入文件1",
            staffNumber: "22",
            EmployeeSh: "andmin",
            ImportShij: "2019-03-14",
          },
          {
            fileName: "积分导入文件1439",
            staffNumber: "222",
            EmployeeSh: "andmin",
            ImportShij: "2022-03-14",
          },
          {
            fileName: "积分导入文件122",
            staffNumber: "2",
            EmployeeSh: "andmin",
            ImportShij: "2020-03-14",
          },
          {
            fileName: "积分导入文件4",
            staffNumber: "11",
            EmployeeSh: "andmin",
            ImportShij: "2021-02-14",
          },
          {
            fileName: "积分导入文件2",
            staffNumber: "9",
            EmployeeSh: "andmin",
            ImportShij: "2021-03-15",
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
       * 删除课程
       * */
      del: function (row) {
        this.delDate = row;
        this.confrimVisible.state = true;
      },
      /**
       * 模板下载
       * */
      templateDown() {
        console.log("模板下载");
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
          message: "导入成功28条,失败5条,失败信息如下",
          tableHeader: [
            { col: "邮箱", prop: "email", minWidth: 200, isTips: true },
            { col: "员工姓名", prop: "staff", minWidth: 120, isTips: true },
            { col: "获得积分", prop: "integral" },
          ],
          tableData: [
            { email: "23790we7whud@unilever.com", staff: "张三", integral: "20" },
            {
              email: "sdajkldhfkdhl@unilever.com",
              staff: "李四",
              integral: "200",
            },
            {
              email: "fnkdhkklfhdl@unilever.com",
              staff: "法外光秃",
              integral: "200",
            },
            {
              email: "fjkdkdfhdl@unilever.com",
              staff: "法外狂徒",
              integral: "200",
            },
            { email: "afen@unilever.com", staff: "葬爱", integral: "200" },
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

<style>
</style>