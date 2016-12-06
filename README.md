# gfe-node-build

如果后端应用框架为 `express`、前端集成解决方案为 `GFE`，那么进行 node 本地调试时需要解决下面三个问题：
- ssi 标签解析(本地调试时页面的ssi标签动态拉取 uat 环境内容)
- 公共组件 js、css 路径处理(组件前添加uat服务器server)
- js 位置的动态处理(本地调试时将 js 脚本位置放到 body 标签之前)

而 `gfe-node-build` 恰好解决了以上三个问题

## 安装
```
npm install gfe-node-build
```

## 使用
```javascript
var gfeNodeBuild = require('gfe-node-build');
gfeNodeBuild.init(express);
```

## 方法
#### init(express, options)

*express* `Object` express 对象

*options* `Object` 配置参数对象，如果必要请覆盖相应配置项，默认值如下：

```javascript
{
    //拉取ssi内容时的域名
    ssiServer: "http://www.atguat.com.cn",

    //拉取js组件时的域名
    jsServer: "http://js.atguat.com.cn",

    //拉取css组件时的域名
    cssServer: "http://css.atguat.com.cn",

    //js插入的位置，取值：insertHead和insertBody
    jsPlace: "insertBody"
}
```

MIT