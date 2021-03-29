
<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-29 15:39:06
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-29 18:42:43
-->
<template>
  <div class="project-edit-com">
    <!-- *** -->
    <div class="edit-main">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <!-- nav-1 -->
        <div class="edit-nav">
          基础信息
        </div>
        <!-- ** -->
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入项目名称"></el-input>
        </el-form-item>
        <!-- ** -->
        <el-form-item label="项目积分" prop="point">
          <el-input v-model.number="ruleForm.point" placeholder="请输入项目积分" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        </el-form-item>
        <!-- ** -->
        <el-form-item label="上传人">
          <span>钢铁侠</span>
        </el-form-item>
        <!-- ** -->
        <el-form-item label="上传时间">
          <span>2021-03-29 16:27:00</span>
        </el-form-item>
        <!-- nav-2 -->
        <div class="edit-nav">
          项目描述
        </div>
        <!-- ** -->
        <el-form-item label="项目描述">
          <el-input type="textarea" :rows="2" placeholder="请输入项目描述" v-model="ruleForm.desc" maxlength="120" show-word-limit>
          </el-input>
        </el-form-item>
        <!-- ** -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button @click="resetForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
  export default {
    name: "project-edit",

    data() {
      return {
        ruleForm: {
          name: "",
          point: "",
          desc: "",
        },
        rules: {
          name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
          point: [{ required: true, message: "请输入项目积分", trigger: "blur" }],
        },
      };
    },

    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(valid, this.ruleForm);
        });
      },
      resetForm(formName) {
        for (let key in this.ruleForm) {
          this.ruleForm[key] = "";
        }
      },
    },
  };
</script>