# SHIAN-ADMIN

本项目主要应用于PC端，涉及vue3、pinia、vite、Element plus、和 Typescript 等相关知识点，请熟练掌握。

- `vite` 前端开发与构建工具。[官方网址](https://vitejs.cn/)
  
- `vue3` 渐进式框架。[官方网址](https://v3.cn.vuejs.org/)
  
- `pinia` 跨组件/页面共享状态。[官方网址](https://pinia.vuejs.org/)

- `Element plus` UI组件库。[官方网址](https://element-plus.gitee.io/zh-CN/)

- 添加了`模板插件`输入vue3并按回车可以快速生成页面模板

## 快速上手

由于shian-admin示例工程，是基于最新的vite构建，代码规范插件配置也是基于vscode，为了兼容避免报错，推荐使用vscode集成开发。

## 项目代码

### 登录码云,拉取项目代码

``` js
git clone git@gitee.com:guangzhou-shian/shian-admin.git
```

拉取成功后安装项目依赖

``` js
npm install
```

安装成功后运行项目

``` js
npm run dev
```

### 目录结构  

```
SHIAN-ADMIN
    ├─.vscode
    ├─public                    
    ├─src                       
    │   ├─api                   // 接口目录
    │   ├─assets                // 静态资源目录
    │   ├─components            // 公共组件目录
    │   ├─config                // 项目配置目录
    │   ├─layout                // 页面布局
    │   ├─router                // 路由
    │   ├─store                 // pinia目录
    │   ├─style                 // 公共样式目录
    │   ├─utils                 // 公共方法目录
    │   └─views                 // 页面目录
    │  App.vue                  // App全局样式以及监听
    │  main.ts                  // 挂载App，Vue初始化入口文件
    │  .eslintrc.js             // eslint配置文件
    │  .prettierrc.js           // prettier配置文件
    │  package.json             // 配置项目依赖打包等信息
    └─ vite.config.js           // vite配置文件
```

通过目录结构，可以帮助我们进一步了解项目。
