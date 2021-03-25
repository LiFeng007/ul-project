<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-18 10:44:20
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-25 22:22:07
-->
<template>
  <div class="login-container">
    <!-- main -->
    <div class="login-main">
      <!-- title -->
      <div class="title">您好，</div>
      <!-- sub title -->
      <p>欢迎登录U+数字荣耀系统</p>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item prop="userName">
          <el-input type="text" v-model="ruleForm.userName" placeholder="用户名" prefix-icon="el-icon-user" clearable @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" placeholder="密码" prefix-icon="el-icon-lock" clearable @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom:0">
          <el-button type="primary" @click="submitForm('ruleForm')">{{isLogin ? '登录中...' :'登录'}}</el-button>
        </el-form-item>
        <el-form-item style="text-align:left">
          <el-checkbox-group v-model="ruleForm.type">
            <el-checkbox label="十天内自动登录系统" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { login } from "@/api/courseManagement";

  export default {
    name: "Login",
    data() {
      var validUserName = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入用户名"));
        } else {
          callback();
        }
      };
      var validPassWord = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          callback();
        }
      };
      return {
        isLogin: false,
        ruleForm: {
          userName: "",
          password: "",
          type: "",
        },
        rules: {
          userName: [{ validator: validUserName, trigger: "blur" }],
          password: [{ validator: validPassWord, trigger: "blur" }],
        },
      };
    },

    methods: {
      async submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.isLogin = true;
            login({ ...this.ruleForm })
              .then((res) => {
                this.isLogin = false;
                if (res.data.code == "E0") {
                  this.$root.$tipsInfo("登录成功！", "success");
                  window.localStorage.setItem("x-token", res.data.data.token);
                  this.$router.push({ name: "course-management" });
                } else {
                  this.$root.$tipsInfo(
                    `登录失败！失败原因：${res.data.message}`,
                    "error"
                  );
                }
              })
              .catch((_) => (this.isLogin = false));
          }
        });
      },
    },
  };
</script>

