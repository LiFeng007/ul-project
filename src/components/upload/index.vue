<!--
 * @Descripttion: 确认框组件 , props : uploadVisible:{state:Boolean}  
                  自定义方法 upload 用户点击上传执行的方法
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-12 14:04:31
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-12 23:11:20
-->
<template>
  <div class="ul-upload">
    <el-dialog :visible.sync="uploadVisible.state" title="课程上传">
      <div class="ul-upload-main">
        <el-upload ref="uploadMutiple" class="upload-demo" :auto-upload="false" action="Fake Action" :on-preview="handlePreview" :on-remove="handleRemove" :on-change="handleChange" :limit="1" accept=".xlsx,.xls" :on-exceed="handleExceed" :file-list="fileList" multiple>
          <div>
            <div><i :style="{ color: '#F25B8E' }">*</i> 文件:</div>
            <el-button size="small" icon="el-icon-upload" v-if="!fileList.length">点击上传</el-button>
          </div>
          <p v-if="uploadTips.type === 'error' || uploadTips.type === 'success'" :style="{
              color: uploadTips.type === 'error' ? '#F25B8E' : ' ',
              color:  uploadTips.type === 'success' || uploadTips.type === 'partialSuccess' ? '#003FAD': '',}" :class="['uploadTips']">
            {{ uploadTips.message }}
          </p>
         
        </el-upload>
         <el-table v-if="uploadTips.type === 'partialSuccess'" :data="gridData">

            <el-table-column property="date" label="日期" width="150"></el-table-column>

            <el-table-column property="name" label="姓名" width="200"></el-table-column>

            <el-table-column property="address" label="地址"></el-table-column>

          </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <button :class="['default-btn']" @click="uploadVisible.state = false">
          取 消
        </button>
        <button class="routine-btn" @click="uploadVisible.state = false">
          确 定
        </button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "ul-upload",

    props: {
      uploadVisible: {
        //显示与否
        type: Object,
        required: true,
      },
      uploadTips: {
        /**
         * {Object}
         * type: 提示类型 , 错误信息-error 全部上传成功-success 部分上传成功-partialSuccess
         * message: 提示信息
         * errObject: 只有提示类型为partialSuccess时这个键必传 , 包含需要渲染的表头信息及表体内容
         *
         * **/
        type: Object,
        required: true,
      },
    },

    data() {
      return {
        fileList: [],
        gridData: [
          {
            date: "2016-05-02",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1518 弄",
          },
        ],
      };
    },

    methods: {
      handleRemove(file, fileList) {
        this.fileList = [];
        this.$parent.uploadTips = {};
      },
      handlePreview(file) {
        // console.log(file);
      },
      upload() {
        this.$emit("upload", this.fileList[0]);
      },
      handleExceed(files, fileList) {
        this.$message.warning(
          `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
            files.length + fileList.length
          } 个文件`
        );
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
      },
      // 上传成功
      handleChange(file, fileList) {
        this.fileList = fileList;
        this.$root.$tipsInfo("文件导入成功", "success");
        this.$nextTick(() => {
          const Node = document.querySelector(".el-upload-list__item-name");
          const uploadSpan = document.createElement("span");
          const removeSpan = document.createElement("span");

          uploadSpan.className = "iconfont icon-21upload cursor-porinter";
          removeSpan.className = "iconfont icon-shachu-xue cursor-porinter";

          removeSpan.addEventListener("click", this.handleRemove);
          uploadSpan.addEventListener("click", this.upload);

          Node.appendChild(uploadSpan);
          Node.appendChild(removeSpan);
        });
      },
    },

    watch: {
      uploadTips: {
        handler(newVal) {
          const Node = document.querySelector(".el-upload-list__item");
          switch (newVal.type) {
            case "error":
              this.$nextTick(() => {
                Node.className = "el-upload-list__item is-ready error";
              });
              break;
            case "success":
              console.log(newVal.type);
              break;
            case "partialSuccess":
              console.log(newVal.type);
              break;
          }
        },
        deep: true,
      },
    },
  };
</script>
<style lang="scss">
  .ul-upload {
    .el-dialog {
      width: 580px;
      min-height: 172px;
      padding: 13px 0 16px 0;

      .el-dialog__header {
        padding-left: 16px;
      }
      .el-dialog__footer {
        padding: 8px 16px 0 0;
      }
      .el-upload-list {
        position: absolute;
        top: 70px;
        left: 155px;
      }
      .el-upload-list__item {
        .iconfont {
          margin-left: 8px;
        }
      }
      .error {
        border: 1px solid #f25b8e;
        border-radius: 3px;
      }
      .is-ready {
        outline-color: #fff;
      }
      .el-upload-list__item:hover .el-icon-close {
        display: none;
      }
      .el-upload {
        margin-top: 14px;
        min-height: 79px;
        // text-align: left;
        border: 2px solid #e2e6e9;
        border-left: none;
        border-right: none;
        width: 100%;
        & > div {
          display: flex;
          align-items: center;
          padding-left: 100px;
          margin-top: 33px;
        }
        .uploadTips {
          margin-top: 10px;
          text-align: left;
          padding-left: 155px;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Medium;
          font-weight: 500;
        }
        .el-button--default {
          // width: px;
          height: 32px;
          background: #ffffff;
          border: 1px solid #e2e6e9;
          border-radius: 3px;
          display: flex;
          align-items: center;
          margin-left: 24px;
          &:hover,
          &:focus {
            color: black;
          }
          .el-icon-upload {
            font-size: 18px;
            margin-right: 8px;
          }
        }
      }
    }
  }
</style>