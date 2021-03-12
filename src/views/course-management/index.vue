<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 20:26:46
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-12 23:02:24
-->
<template>
  <div class="ul-course-management">
    <!-- ** -->
    <div class="ul-main-com">
      <!-- ** -->
      <Ul-nav @getData="getData">
        <template v-slot:left>
          <button class="routine-btn" @click="() => uploadVisible.state = true">课程上传</button>
        </template>
      </Ul-nav>
      <!-- ** -->
      <el-table ref="filterTable" :data="masterData" height="500" style="width: 100%">

        <el-table-column prop="courseId" label="课程ID" min-width="120" >
        </el-table-column>

        <el-table-column prop="couresName" label="课程名称" min-width="180" sortable>
        </el-table-column>

        <el-table-column prop="courseIntegral" label="课程积分" min-width="100" sortable>
        </el-table-column>

        <el-table-column prop="targetUrl" label="跳转链接" show-overflow-tooltip min-width="180" >
        </el-table-column>

        <el-table-column prop="Uploader" label="上传人"  min-width="120">
        </el-table-column>

        <el-table-column prop="Uploadtime" label="上传时间"  min-width="180" show-overflow-tooltip sortable>
        </el-table-column>

        <el-table-column prop="toBeUploaded" label="待上传"  min-width="100" sortable>
        </el-table-column>

        <el-table-column prop="toBeReviewed" label="待审核"  min-width="100" sortable>
        </el-table-column>

        <el-table-column prop="rejected" label="已驳回"  min-width="100" sortable>
        </el-table-column>

        <el-table-column prop="completed" label="已完成"  min-width="100" sortable>
        </el-table-column>

         <el-table-column
          align="center"
          fixed="right"
          label="操作"
          min-width="130"
        >
          <template slot-scope="scope" >

              <span
                @click="$router.push({ name: 'course-detail', query: { courseId: scope.row.courseId } })"
                :style="{ marginRight: '8px' }"
                class="cursor-porinter" >
              查看
              </span>

               <span
                @click="$router.push({ name: 'course-to-examine', query: { courseId: 1 } })"
                :style="{ marginRight: '8px' }"
                class="cursor-porinter" >
              审核
              </span>

               <span
                :style="{ marginRight: '8px' }"
                class="cursor-porinter" 
                @click="del(scope.row)">
              删除
              </span>
          </template>
        </el-table-column>
      </el-table>
      <!-- ** -->
      <Ul-Page :total="201" @getData="getData" />
    </div>
    <!-- ** -->
    <Ul-Confirm 
    :confrimVisible="confrimVisible" 
    :message="confirmMssage"
    @submit="confrimSubmit"
    />
    <!-- ** -->
    <Ul-Upload :uploadVisible="uploadVisible" :uploadTips="uploadTips" @upload="upload"/>
  </div>
</template>

<script>
  import UlNav from "@/components/nav"

  import UlPage from "@/components/paging"

  import UlConfirm from "@/components/confirm"

  import UlUpload from "@/components/upload"

  export default {
    name: "course-management",

    components: { UlNav , UlPage , UlConfirm ,UlUpload},

    data() {
      return {
        confrimVisible:{state:false} , //确认框显示
        uploadVisible:{state:false} , //上传框显示 
        confirmMssage:[
          '确认要删除当前课程吗？' , 
          '课程删除后将不可操作，请仔细核对后删除。'
        ] , 
        retrievalInfo:'' , //检索信息
        delDate:{} , //将被删除的数据
        uploadTips:{} , //上传文件的提示信息
        masterData: [
          {
            courseId: 2021031201,
            couresName: "课程名称",
            courseIntegral: "50",
            targetUrl: "www.baidu.com",
            Uploader:'钢铁侠' , 
            Uploadtime:'2020/03/13 11:50:00' , 
            toBeUploaded:25,
            toBeReviewed:24,
            rejected:12345678,
            completed:200 
          },
          {
            courseId: 2021031202,
            couresName: "课程名称1",
            courseIntegral: "60",
            targetUrl: "www.baidu2.com",
            Uploader:'蝙蝠侠' , 
            Uploadtime:'2020/03/13 11:50:01' , 
            toBeUploaded:30,
            toBeReviewed:24,
            rejected:20,
            completed:200 
          },
          {
           courseId: 2021031203,
            couresName: "课程名称2",
            courseIntegral: "501",
            targetUrl: "www.baidu.com1",
            Uploader:'蜘蛛侠' , 
            Uploadtime:'2020/03/13 11:50:00' , 
            toBeUploaded:21,
            toBeReviewed:24,
            rejected:20,
            completed:200 
          },
          {
            courseId: 2021031203,
            couresName: "课程名称3",
            courseIntegral: "502",
            targetUrl: "www.baidu.com2",
            Uploader:'钢铁侠' , 
            Uploadtime:'2020/03/13 11:50:00' , 
            toBeUploaded:24,
            toBeReviewed:24,
            rejected:20,
            completed:200 
          },
        ],
      };
    },

    methods: {
      /**
       * 获取列表数据
       * */  
      getData: function (e , page) {
        e !== null && (this.retrievalInfo = e)
        const pageObj = page ? page : {currentPage:1 , limit:10}
        console.log( this.retrievalInfo , pageObj )
      },
      /**
       * 询问对话框提交
       * **/ 
      confrimSubmit:function(){
        console.log('确认删除' , this.delDate)
        this.confrimVisible.state = false
      } , 
      /**
       * 删除课程
       * */ 
      del:function(row){
        this.delDate = row
        this.confrimVisible.state = true 
      } , 
      /**
       * 确定上传
       * **/ 
      upload:function(file){
        console.log(file)
        // this.uploadTips = {type:'error' , message:'这是一条错误信息'}
        // this.uploadTips = {type:'success' , message:'这是一条成功信息'}
        this.uploadTips = {type:'partialSuccess' , message:'这是一条成功一部分的信息'}
      }
    },

    watch:{
      confrimVisible:{
        handler(newVal){
          !newVal.state && (this.delDate = {})
        } , 
        deep:true
      } , 


    }
  };
</script>

<style>
</style>