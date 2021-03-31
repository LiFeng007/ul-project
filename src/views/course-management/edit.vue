<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-29 15:39:06
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-31 15:48:26
-->
<template>
  <div class="course-edit-com">
    <!-- *** -->
    <div class="edit-main">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <!-- nav-1 -->
        <div class="edit-nav">
          基础信息
        </div>
        <!-- ** -->
        <el-form-item label="课程名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入课程名称"></el-input>
        </el-form-item>
        <!-- ** -->
        <el-form-item label="课程积分" prop="rewardPoint">
          <!-- <el-input v-model.number="ruleForm.rewardPoint" placeholder="请输入课程积分" oninput="value=value.replace(/[^\d]/g,'')"></el-input> -->
          <span>{{ruleForm.rewardPoint}}</span>
        </el-form-item>
        <!-- ** -->
        <el-form-item label="上传人">
          <span>{{ruleForm.uploaderUserName}}</span>
        </el-form-item>
        <!-- ** -->
        <el-form-item label="上传时间">
          <span>{{ruleForm.createdAt | data('YMDHMS')}}</span>
        </el-form-item>
        <!-- nav-2 -->
        <div class="edit-nav">
          课程描述
        </div>
        <!-- ** -->
        <el-form-item label="课程描述">
          <!-- maxlength="120" show-word-limit -->
          <!-- <el-input type="textarea" :rows="2" placeholder="请输入课程描述" v-model="ruleForm.desc">
          </el-input> -->

        <UlTinymce v-model="ruleForm.desc" />
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
    courseDetailByCourseId,
    courseModfiyStatus,
  } from "@/api/courseManagement";

  import { publicMethod } from "@/utils/common";

  import UlTinymce from "@/components/Tinymce";
  export default {
    name: "course-edit",

    components: { UlTinymce },
    data() {
      return {
        lodaing: false,
        ruleForm: {
          name: "",
          rewardPoint: "",
          desc: "",
        },
        rules: {
          name: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
          rewardPoint: [
            { required: true, message: "请输入课程积分", trigger: "blur" },
          ],
        },
      };
    },

    mounted() {
      this.getCourseDetail();
    },

    methods: {
      /** 课程详情 **/
      getCourseDetail: async function () {
        const res = await courseDetailByCourseId({
          courseId: this.$route.query.courseId,
        });
        if (res.data.code == "E0") {
          this.ruleForm = res.data.data;
        } else {
          this.$root.$tipsInfo("数据获取失败" + res.data.message, "error");
        }
      },
      /** 提交修改 **/
      submitForm: publicMethod.throttle(function (formName) {
        this.$refs[formName].validate(async (valid) => {
          this.lodaing = true;
          if (!valid) {
            return;
          }
          const res = await courseModfiyStatus(this.ruleForm);
          this.lodaing = false;
          if (res.data.code == "E0") {
            this.$root.$tipsInfo("修改成功", "success");
            this.$router.push({ name: "course-management" });
          } else {
            this.$root.$tipsInfo("修改失败" + res.data.message, "error");
          }
        });
      }, 500),
      resetForm: publicMethod.throttle(function () {
        this.$router.push({ name: "course-management" });
      }, 500),
    },
  };
</script>