
/*
 * @Author: Fred
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
}





