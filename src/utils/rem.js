/*
 * @Descripttion: rem等比适配配置文件
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-11 18:40:02
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-11 18:42:25
 */
 
// 基准大小
const baseSize = 128
// 设置 rem 函数
function setRem() {
  const scale = document.documentElement.clientWidth / 1280
  // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
  // document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
  document.documentElement.style.fontSize = baseSize * scale + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function() {
  setRem()
}

