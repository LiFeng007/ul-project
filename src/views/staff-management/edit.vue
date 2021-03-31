
<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-29 15:39:06
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-29 22:23:32
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
          <img :src="ruleForm.imageUrl" alt="头像" class="image_url">
          <el-upload ref="upload" class="upload-demo" :auto-upload="false" action="Fake Action" :on-change="handleChange" :on-preview="handlePreview" :on-remove="handleRemove" :limit="1" :file-list="fileList" multiple list-type="picture">
            <a href="javascript:;" @click="clearFileList">更换头像</a>
          </el-upload>
        </el-form-item>
        <!-- ** -->
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <!-- ** -->
        <el-form-item label="部门" prop="function">
          <el-input v-model.number="ruleForm.function" placeholder="请输入部门" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        </el-form-item>
        <!-- ** -->
        <el-form-item label="战力值">
          <span>9999</span>
        </el-form-item>
        <!-- ** -->
        <el-form-item label="称号">
          <span>开发宗师</span>
        </el-form-item>
        <!-- ** -->
        <el-form-item label="等级">
          <span>2</span>
        </el-form-item>
        <!-- ** -->
        <el-form-item label="当前积分">
          <span>99</span>
        </el-form-item>
        <!-- ** -->
        <el-form-item label="完成课程数">
          <span>99</span>
        </el-form-item>
        <!-- ** -->
        <el-form-item label="完成项目数">
          <span>00</span>
        </el-form-item>
        <!-- ** -->
        <el-form-item label="备注">
          <el-input type="textarea" :rows="2" placeholder="请输入备注信息" v-model="ruleForm.desc" maxlength="120" show-word-limit>
          </el-input>
        </el-form-item>
        <!-- ** -->
        <el-form-item>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
  import {
    courseDetailByCourseId,
    courseModfiyStatus,
  } from "@/api/courseManagement";

  import { publicMethod } from "@/utils/common";

  export default {
    name: "staff-edit",

    data() {
      return {
        lodaing: false,
        ruleForm: {
          imageUrl:
            "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKbeVUCFnqVWZ75lRnxXFInk6HdicT5MLLSrn0zKZftDezGe2ehNYnGcjAwnhJBVAy4SfnY59XIVBA/132",
          name: "",
          function: "",
          desc: "",
        },
        fileList: [],
        rules: {
          name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
          function: [{ required: true, message: "请输入部门", trigger: "blur" }],
        },
      };
    },

    methods: {
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
        console.log(111);
        this.fileList = fileList;
        this.ruleForm.imageUrl = fileList[0].url;
      },
      // 提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(valid, this.ruleForm);
        });
      },
      // 重置
      resetForm(formName) {
        for (let key in this.ruleForm) {
          this.ruleForm[key] = "";
        }
      },
    },
  };
</script>