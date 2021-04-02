
<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-29 15:39:06
 * @LastEditors: Fred
 * @LastEditTime: 2021-04-01 16:20:05
-->
<template>
  <div class="staff-edit-com">
    <!-- *** -->
    <div class="edit-main">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <!-- nav-1 -->
        <div class="edit-nav">
          基础信息
        </div>
        <!-- ** -->
        <el-form-item label="头像" class="hand-portrait">
          <!-- <img :src="ruleForm.imageUrl" alt="头像" class="image_url"> -->
          <el-image style="width: 100px; height: 100px" :src="ruleForm.imageUrl"></el-image>
          <el-upload ref="upload" class="upload-demo" :auto-upload="false" action="Fake Action" :on-change="handleChange" :on-preview="handlePreview" :on-remove="handleRemove" :limit="1" :file-list="fileList" multiple list-type="picture">
            <a href="javascript:;" @click="clearFileList">更换头像</a>
          </el-upload>
        </el-form-item>
        <!-- ** -->
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <!-- ** -->
        <el-form-item label="部门" prop="position">
          <el-input v-model="ruleForm.position" placeholder="请输入部门"></el-input>
        </el-form-item>
        <!-- ** -->
        <el-form-item label="邮箱">
          <span>{{ruleForm.email}}</span>
        </el-form-item>
        <!-- ** -->
        <el-form-item label="战力值">
          <span>{{ruleForm.highestValue}}</span>
        </el-form-item>
        <!-- ** -->
        <el-form-item label="称号">
          <span>{{ruleForm |  employeeTitle(ruleForm.highestFieldName , ruleForm.highestValue)}}</span>
        </el-form-item>
        <!-- ** -->
        <el-form-item label="当前积分">
          <span>{{ruleForm.point}}</span>
        </el-form-item>
        <!-- ** -->
        <el-form-item label="完成课程数">
          <span>{{ruleForm.courseNum}}</span>
        </el-form-item>
        <!-- ** -->
        <el-form-item label="完成项目数">
          <span>{{ruleForm.projectNum}}</span>
        </el-form-item>
        <!-- ** -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">{{lodaing ? '保存中...' : '保存'}}</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
  import {
    setUserInfo,
    userDetailByuserId,
    uploadPircture,
  } from "@/api/staffManagement";

  import { publicMethod } from "@/utils/common";

  export default {
    name: "staff-edit",

    data() {
      return {
        lodaing: false,
        ruleForm: {},
        fileList: [],
        rules: {
          name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
          position: [{ required: true, message: "请输入部门", trigger: "blur" }],
        },
      };
    },

    mounted() {
      this.getUserDetail();
    },

    methods: {
      /** 员工详情 **/
      getUserDetail: async function () {
        const res = await userDetailByuserId({
          userId: this.$route.query.staffId,
        });
        if (res.data.code == "E0") {
          this.ruleForm = res.data.data;
        } else {
          this.$root.$tipsInfo("数据获取失败" + res.data.message, "error");
        }
      },
      // 头像更换
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      // 点击上传的时候清空文件列表
      clearFileList() {
        this.$refs.upload.clearFiles();
      },
      // 上传成功
      handleChange(file, fileList) {
        this.fileList = fileList;
        this.ruleForm.imageUrl = fileList[0].url;
      },
      /** 修改用户资料 **/
      setUserInfo: function () {
        var { userId, name, imageUrl, position } = this.ruleForm;
        var payload = { userId, name, imageUrl, position };
        setUserInfo(payload).then((modfiyRes) => {
          this.lodaing = false;
          if (modfiyRes.data.code == "E0") {
            this.$root.$tipsInfo("修改成功", "success");
            this.$router.push({ name: "staff-management" });
          } else {
            this.$root.$tipsInfo("修改失败 , " + modfiyRes.data.message, "error");
          }
        });
      },
      /** 提交修改 **/
      submitForm: publicMethod.throttle(function (formName) {
        this.$refs[formName].validate(async (valid) => {
          if (!valid) {
            return;
          }
          this.lodaing = true;
          //有没有上传图片
          if (!this.fileList.length) {
            // 修改用户资料
            this.setUserInfo();
          } else {
            var fromData = new FormData();
            fromData.append("file", this.fileList[0].raw);
            // 上传图片
            uploadPircture(fromData, { type: "multipart/form-data" }).then(
              (res) => {
                if (res.data.code == "E0") {
                  this.ruleForm.imageUrl = res.data.data.imageUrl;
                  console.log(this.ruleForm);
                  // 修改用户资料
                  this.setUserInfo();
                } else {
                  this.$root.$tipsInfo(
                    "头像上传失败" + res.data.message,
                    "error"
                  );
                  return false;
                }
              }
            );
          }
        });
      }, 500),
      resetForm: publicMethod.throttle(function () {
        this.$router.push({ name: "staff-management" });
      }, 500),
    },
  };
</script>