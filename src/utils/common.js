/*
 * @Author: Fred
 * @Date: 2020-11-25 19:51:43
 * @LastEditTime: 2021-03-10 16:03:55
 * 
 *
 * debounce
 * 防抖函数(可用于防止重复提交) 
 * desc func 执行函数, wait 间隔时间, immediate 立即执行
 * 
 * 
 * throttle
 * 节流函数
 * desc func 执行函数, wait 间隔时间, options 立即执行,
 * options中  leading：false 表示禁用第一次执行 trailing: false 表示禁用停止触发的回调 1
 * 
 */

export const publicMethod = {
    // 防抖
    debounce: (func, wait, immediate) => {
        let timeout, result;
        let docounced = function () {
            let args = arguments;
            if (timeout) clearTimeout(timeout);
            if (immediate) {
                // 如果已经执行过，不再执行
                let callNow = !timeout;
                timeout = setTimeout(() => {
                    timeout = null;
                }, wait)
                // 立即执行
                if (callNow) {
                    result = func.apply(this, args)
                }
            } else {
                // 不会立即执行
                timeout = setTimeout(() => {
                    func.apply(this, args)
                }, wait);
            }
            return result
        }
        docounced.cancel = function () {
            clearTimeout(timeout)
            timeout = null
        }
        return docounced
    },
    // 节流
    throttle: (func, wait, options) => {
        let context, args, timeout;
        let old = 0; // 时间戳
        if (!options) options = {};
        let later = function () {
            old = new Date().valueOf();
            timeout = null;
            func.apply(context, args);
        }
        return function () {
            context = this;
            args = arguments;

            let now = new Date().valueOf();
            if (options.leading === false && !old) {
                old = now;
            }
            if (now - old > wait) {
                // 第一次会直接执行 
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                func.apply(context, args);
                old = now;
            } else if (!timeout && options.trailing !== false) {
                // 最后一次也会被执行
                timeout = setTimeout(later, wait);
            }
        }
    },
    // 导出公共方法
    exportMethod(res,fileName) {
        // console.log(res);
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = URL.createObjectURL(res.data)
        // link.download = res.headers['content-disposition'] //下载后文件名
        link.download = fileName//下载的文件名
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    },
    /**
     * element 表单多个验证不通过，滚动到验证提示的位置
     * { String } object 验证规则
     * 备注：
     *     1.this.$refs.infoList.validate((_, object)=>{})   返回两个参数，第一个参数：验证是否成功，第二个参数：验证规则
     *     2.验证的标签上添加ref属性，名字和prop值一致。例：<el-form-item :prop="'infoData.' + scope.$index + '.coalName'" :ref="'infoData.' + scope.$index + '.coalName'" ></el-form-item>
     */
    scrollToView(_this, object) {
        for (let i in object) {
            let dom = _this.$refs[i];
            if (Object.prototype.toString.call(dom) !== "[object Object]") {
                //这里是针对遍历的情况（多个输入框），取值为数组
                dom = dom[0];
            } 
            //第一种方法（包含动画效果）
            dom.$el.scrollIntoView({
                //滚动到指定节点
                block: "center", //值有start,center,end，nearest，当前显示在视图区域中间
                behavior: "smooth", //值有auto、instant,smooth，缓动动画（当前是慢速的）
            });
            break; //因为我们只需要检测一项,所以就可以跳出循环了
        }
    }
}





