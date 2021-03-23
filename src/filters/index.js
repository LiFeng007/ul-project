/*
 * @Descripttion: 用于处理泛型 , 时间...
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-15 13:48:26
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-23 10:35:13
 */
export const filters = {
  /**
   * @param {status , sucessStr , fileStr} 状态 成功返回值 失败返回值 适用只有两种状态
   * @return {handleStatus}
   */
  status(status, sucessStr, fileStr) {
    if (status == 1) {
      return sucessStr;
    } else if (status == 2 || status == 0) {
      return fileStr;
    } else {
      return status;
    }
  },
  /**
   * @param {status} 状态 1 2 3 4
   * @return {handlerStatus}
   */
  courseStatus(status) {
    switch (status) {
      case 1:
        return '待审核';
      case 2:
        return '待上传';
      case 3:
        return '已驳回';
      case 4:
        return '已完成';
    }
  },
  // 时间过滤器
  /**
   * @param {value} 未处理时间
   * @param {type} 期望处理类型 YMD YMDHMS HMS YM
   * @return {dataTime} 处理后时间
   */
  data(value, type) {
    console.log(value);
    if(!value || value === null){
      return value
    }
    var dataTime = "";
    var data = new Date(value);
    var year = data.getFullYear();
    var month = (data.getMonth() + 1);
    var day = (data.getDate());
    var hour = (data.getHours());
    var minute = (data.getMinutes());
    var second = (data.getSeconds());
    if (type == "YMD") {
      dataTime = year + "-" + month + "-" + day;
    } else if (type == "YMDHMS") {
      dataTime = year + "-" + month + "-" + day + " " + hour.toString().padStart(2, '0') + ":" + minute.toString().padStart(2, '0') + ":" + second.toString().padStart(2, '0');
    } else if (type == "HMS") {
      dataTime = hour + ":" + minute + ":" + second;
    } else if (type == "YM") {
      dataTime = year + "-" + month;

    }
    return dataTime

  },
}


