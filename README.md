# SHIAN-ADMIN

本项目主要应用于 PC 端，涉及 vue3、pinia、vite、Element plus 和 Typescript 等相关知识点，请熟练掌握。

- `vite` 前端开发与构建工具。[官方网址](https://vitejs.cn/)
  
- `vue3` 渐进式框架。[官方网址](https://v3.cn.vuejs.org/)
  
- `pinia` 跨组件/页面共享状态。[官方网址](https://pinia.vuejs.org/)
  
- `Element plus` UI 组件库。[官方网址](https://element-plus.gitee.io/zh-CN/)
  
- 添加了`模板插件`输入 vue3 并按回车可以快速生成页面模板
 
## 快速上手

由于 shian-admin 示例工程，是基于最新的 vite 构建，代码规范插件配置也是基于 vscode，为了兼容避免报错，推荐使用 vscode 集成开发。

## 项目代码
  
### 登录码云,拉取项目代码

```js
git clone git@gitee.com:guangzhou-shian/shian-admin.git
```

拉取成功后安装项目依赖

```js
pnpm install
```

安装成功后运行项目

```js
pnpm dev 或 pnpm serve
```

打包

```js
pnpm build
```


### 目录结构

```js

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

## 常见问题

volar插件配置接管模式，禁用内置的TypeScript扩展:

  1. vscode中 shift+ctrl+p 搜索 Extensions: Show Built-in Extensions 命令
  2. 找到TypeScript和JavaScript语言特性，右键单击，选择禁用(工作区)。

## 图标

默认已经引入了 element-plus 自带的全部 icons 图标，可以直接使用。

### 使用方法一

- i 前缀加上别名 i-{集合名称}-{别名}

    ```html
    <i-home-filled />
    ```

### 使用方法二

- 在 src\config\iconify\index.ts 引入需要使用的 icon

    ```js
    import homeFilled from '@iconify-icons/ep/home-filled'

    addIcon('home-filled', homeFilled)
    ```

    引入后在页面中使用

    ```html
    <sa-icon icon="home-filled" />
    ```

### 更多图标

- 如果 element-plus 自带的 icons 无法满足您的图标需求，可以在[Iconify](https://icon-sets.iconify.design/ep/)寻找需要的 icons 使用。

- 使用方法

    ```html
    <!-- 找到需要的 icon 复制 Selected icon 名称
            如：ant-design:home-twotone   -->

    <sa-icon icon="ant-design:home-twotone" />
    <sa-icon type="ant-design" icon="home-twotone" />
    ```

## utils 公共方法目录

`is.ts` 校验数据类型的方法
`mitt.ts` 事物总线，进行组件通信

框架内置了一些校验规则，如是否手机号，邮箱号，URL 等

```js
// 引入方法：
import { 方法名称 } from '@/utils'
```

- 深度克隆
    deepClone(any)
    深度克隆对象或数组，返回 any。

    ```js
    let data = deepClone(data)
    ```

- JS对象深度合并
    deepMerge(any)
    JS对象深度合并对象，返回对象。

    ```js
    let target = deepMerge(target,source)
    ```

- 获取 url 参数
    handleUrlArgs(String, String)
    获取 url 参数，返回字符串。

    ```js
    console.log(handleUrlArgs('https://www.baidu.com/s?ie=utf-8&code=123&rsv_bp=1', 'code'))
    //返回：123
    ```

- 是否验证码
    code(String, len:Number = 6)
    校验是否验证码(要求为数字)，返回 true 或者 false。

    ```js
    console.log(code('4567', 4))
    ```

- 是否 Json 字符串
    jsonString(String)
    校验是否 Json，返回 true 或者 false。

    ```js
    console.log(jsonString('{"a": 1}'))
    ```

- 是否邮箱号
    email(String)
    校验是否邮箱号，返回 true 或者 false。

    ```js
    console.log(email('123465798@gmail.com'))
    ```

- 是否手机号
    mobile(String)
    校验是否手机号，返回 true 或者 false。

    ```js
    console.log(mobile('13845678900'))
    ```

- 是否URL
    url(String)
    校验是否 URL 链接，返回 true 或者 false。

    ```js
    console.log(url('www.baidu.com'))
    ```

- 是否IP
    ip(String)
    校验是否 IP 地址，支持0.0.0.0到255.255.255.255，返回 true 或者 false。

    ```js
    console.log(ip('192.168.0.110'))
    ```

- 是否普通日期
    date(String)
    验证一个字符串是否日期，返回 true 或者 false，如下行为正确：
    2020-02-10、2020-02-10 08:32:10、2020/02/10 3:10、2020/02/10 03:10、2020/02-10 3:10
    如下为错误：

    2020 年 02 月 10 日、2020-02-10 25:32

    ```js
    console.log(date('2020-02-10 08:32:10'))
    ```

- 是否十进制数值
    整数，小数，负数，带千分位数(2,359.08)等可以检验通过，返回 true 或者 false。

    number(Number)

    ```js
    console.log(number(2020))
    ```

- 是否整数
    正整数，0等可以检验通过，返回 true 或者 false。

    digits(Number)

    ```js
    console.log(digits(2020))
    ```

- 是否身份证号
    身份证号，包括尾数为"X"的类型，可以校验通过，结果返回 true 或者 false。

    idCard(String)

    ```js
    console.log(idCard('110101199003070134'))
    ```

- 是否车牌号
    可以校验旧车牌号和新能源类型车牌号，结果返回 true 或者 false。

    carNo(String)

    ```js
    console.log(carNo('京A88888'))
    ```

- 是否金额
    最多两位小数，可以带千分位，结果返回 true 或者 false。

    amount(String)

    ```js
    console.log(amount('3,233.08'))
    ```

- 是否汉字
    可以为单个汉字，或者汉字组成的字符串，结果返回 true 或者 false。

    chinese(String)

    ```js
    console.log(chinese('更上一层楼'))
    ```

- 是否字母
    只能为"a-z"或者"A-Z"之间的字符，结果返回 true 或者 false。

    letter(String)

    ```js
    console.log(letter('abc'))
    ```

- 是否字母或者数字
    只能是字母或者数字，结果返回 true 或者 false。

    enOrNum(String)

    ```js
    console.log(enOrNum('abc'))
    ```

- 数值是否在某个范围内
    如 30 在"29-35"这个范围内，不在"25-28"这个范围内，结果返回 true 或者 false。

    range(String,Array)

    ```js
    console.log(range('35, [30, 34]'))
    ```

- 字符串长度是否在某个范围内
    如"abc"长度为 3，范围在"2-5"这个区间，结果返回 true 或者 false。

    rangeLength(String,Array)

    ```js
    console.log(rangeLength('abc', [3, 10]))
    ```

- 去除空格
    该方法可以去除空格，分别可以去除所有空格，两端空格，左边空格，右边空格，默认为去除两端空格。

    trim(str : String , pos : String)

    pos:both-默认值，去除两端空格，left-去除左边空格，right-去除右边空格，all-去除包括中间和两端的所有空格

    ```js
    console.log(trim('abc    b ', 'all')) // 去除所有空格
    console.log(trim(' abc ')) // 去除两端空格
    ```

- 去除表情
    该方法可以去除手机自带表情。

    filterEmoji(str : String)

    ```js
    console.log(filterEmoji('表情'))
    ```

- 防抖函数
    在连续的操作中，无论进行了多长时间，只有某一次的操作后在指定的时间内没有再操作，这一次才被判定有效

    func <Function> 触发回调执行的函数
    wait <Number> 时间间隔，单位ms
    immediate <Boolean> 在开始还是结束处触发，如非特殊情况，一般默认为false即可

    ```js
    debounce(func, wait = 500, immediate = false)
    ```

- 节流函数
    规定时间内，只触发一次，可以通过设置immediate来决定触发的时机在这个时间的开始，还是结束的时候执行。

    func <Function> 触发回调执行的函数
    wait <Number> 时间间隔，单位ms
    immediate <Number> 在开始还是结束处触发，比如设置wait为1000ms，如果在一秒内进行了5次操作，只触发一次，如果immediate为true，那么就会在第一次操作 触发回调，如果为false，就会在第5次操作触发回调。

    ```js
    throttle(func, wait = 500, immediate = true)
    ```
