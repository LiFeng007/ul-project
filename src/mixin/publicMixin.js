/*
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-16 10:56:04
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-28 11:27:55
 */
import UlNav from "@/components/nav"

import UlPage from "@/components/paging"

import UlConfirm from "@/components/confirm"

import UlUpload from "@/components/upload"

import { publicMethod } from "@/utils/common"

export const publicMixin = {
  components: { UlNav, UlPage, UlConfirm, UlUpload },

  data() {
    return {
      payload: {
        searchKey: "", //检索信息
        sortKey: "", //排序键
        sortStatus: "", //排序类型
        pageNumber: 1, //分頁信息
        pageSize: 10,
        status: [], //状态筛选
      },
      delDate: {}, //将被删除的数据
      uploadTips: {}, //上传文件的提示信息
      total: 0,//总条数
      tableIsLoading: false, //表格loading层加载与否
      uploadLoading:false , //上传状态
    }
  },

  methods: {
    /**
* 表格排序事件处理函数
* @param {object} {column,prop,order} 列数据|排序字段|排序方式
*/
    onSortChange: publicMethod.throttle(function ({ prop, order }) {
      let sortType = ''
      switch (order) {
        case 'ascending':
          sortType = 1;
          break;
        case 'descending':
          sortType = 2;
          break;
        default:
          break;
      }
      this.payload.sortKey = prop
      this.payload.sortStatus = sortType
      this.getData(this.payload.searchKey)
    }, 500),
    /**
      * 状态筛选
      * */
    filterStatus: publicMethod.throttle(function (status) {
      this.payload.status = []
      this.payload.status = Object.values(status)[0]
      this.getData()
    }, 500)
  },
}