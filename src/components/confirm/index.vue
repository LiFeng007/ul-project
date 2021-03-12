<!--
 * @Descripttion: 确认框组件 , props : confrimVisible:{state:Boolean} 显示与否 message:Array , 显示信息 
                  自定义方法 submit 用户点击确定执行的方法
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-12 14:04:31
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-12 15:10:36
-->
<template>
  <div class="ul-confrim">
    <el-dialog :visible.sync="confrimVisible.state">
      <div class="ul-confrim-main">
        <img src="@/assets/image/confrim_icon.png" alt="waring" />
        <span>
          <i>{{ message[0] }}</i>
          <span>{{ message[1] }}</span>
        </span>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="default-btn" @click="confrimVisible.state = false">
          取 消
        </button>
        <button class="routine-btn" @click="$emit('submit')">确 定</button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "ul-confrim",

    props: {
      confrimVisible: {
        type: Object,
        required: true,
      },
      message: {
        type: Array,
        required: true,
      },
    },

    data() {
      return {};
    },
  };
</script>

<style lang="scss">
  .ul-confrim {
    .el-dialog {
      width: 480px;
      height: 172px;
      padding: 28px 16px 16px 32px;

      .ul-confrim-main {
        display: flex;
        position: relative;
        margin-bottom: 40px;
        img {
          position: absolute;
          top: -4px;
        }
        & > span {
          margin-left: 45px;
          i {
            height: 24px;
            font-size: 14px;
            font-weight: 500;
            color: #35393f;
            margin-bottom: 4px;
            display: block;
          }
          span {
            height: 40px;
            font-size: 12px;
            font-weight: 400;
            color: #67717a;
          }
        }
      }
    }

    .default-btn {
      margin-right: 0.08rem;
    }
  }
</style>