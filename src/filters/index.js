/*
 * @Descripttion: 用于处理泛型 , 时间...
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-15 13:48:26
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-15 16:21:18
 */
export const filters  = {
    // 员工状态
   status(status , sucessStr , fileStr) {
     if(status == 1 ){
      return sucessStr;
     } else if(status == 0){
      return fileStr;
     } else {
      return status;
     }
  } 
}
 

