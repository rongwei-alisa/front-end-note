`AMD` 是 `require.js` 对模块定义的规范化产出。规范采用异步的方式加载模块，模块的加载不影响其后面代码的执行。依赖这个模块的代码都会定义在一个回调函数中，当模块加载完成之后，会执行定义的回调函数。
* 依赖前置
* 提前下载并执行
### 基本语法
```
define(['math'], function(math) {
    return {};
});

require(['math'], function(math) {})
```
### 运行时编译
```
var a = 1;
if(a) {
    require('module1');
} else {
    require('module2'); // 其中 module2 中引入了依赖 module 1
}

// 执行后发现资源中的 module2 并没有被加载，说明 AMD 是运行时加载，可以将模块加载语句写在判断语句或其他 js 语句中
```