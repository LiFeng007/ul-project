<!--
 * @Descripttion: 
 * @version: 
 * @Author: Fred
 * @email: fenglee9794@gmail.com
 * @Date: 2021-03-10 14:50:21
 * @LastEditors: Fred
 * @LastEditTime: 2021-03-16 20:08:17
-->
# 项目说明
此项目是UL小程序后台管理系统前端代码

## 分支说明
* dev -- 开发环境代码
* master -- 生产环境代码 
* 两个环境`BASE_URL`不同 , 注意切换

## 项目运行
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### 项目目录
```bash
|-- api # 调用服务器接口方法文件夹
|-- assets # 静态文件,包含icon及背景图等
|-- components # 通用组件
|-----|-- confirm # 询问框组件
|-----|-- nav # header下方导航栏
|-----|-- paging # 分页组件
|-----|-- upload # 上传组件
|-- filters # 全局过滤器
|-- layout # 基础页面
|-- mixin # 通用逻辑混入
|-- router # 前端路由配置
|-- serve # 基础路径
|-- style # 样式
|-- utils # 工具类目录
|-- views #
|-- pages

```
