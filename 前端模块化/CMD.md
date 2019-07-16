`CMD` 是 `sea.js` 对模块定义的规范化产出。专门用于浏览器端，模块的加载是异步的，模块使用时才会加载执行。一个文件就是一个模块。
* 依赖就近
* 延迟执行，下载完遇到require语句才会执行

### 常用API
`define`、 `require`、 `require.async`、 `exports`、 `module.exports` 

### 基本语法 ([CMD 模块定义规范](https://github.com/seajs/seajs/issues/242))
#### 通过 sea.js 在页面中引入模块
```
seajs.config({
    path: {}, // 设置路径
    alias: {}, // 设置别名
    base: '' // 基础路径
});

// 在页面中加载一个或多个模块
seajs.use('./module');
seajs.use('./module', function(m) {});
seajs.use(['./module1', './module2'], function(m1, m2) {})
```
#### 定义模块的语法：`define(factory);`
`factory` 可以是一个函数，也可以是一个对象或字符串。

* factory 为对象或字符串
```
// factory 为对象或字符串时，表示模块的接口就是该对象、字符串
define({
    foo: 'bar
});
```
* factory 为函数时，表示该模块的构造方法。执行该构造方法，可以得到模块向外提供的接口。factory 方法执行时，默认会传入三个参数：require, exports, module
```
// 暴露接口，所有的模块都通过 define 来定义
define(function(require, exports, module) {
    // 引入依赖模块（同步）
    var module1 = require('module1');

    // 引入依赖模块（异步）
    require.async('module2', function(m2) {});

    // 对外输出接口
    exports.XXX = value;
});
```
#### [require 书写约定](https://github.com/seajs/seajs/issues/259)
* 第一个参数必须命名为 require 
```
// 错误！
// 加载时是通过正则匹配 require 关键字来加载模块的。
define(function(req) {
    var m = req('./module.js'); // req 函数会执行，但得不到想要的返回结果
    console.log(m); // null
}); 
```
* 不要重命名 require 函数，或在任何作用域内给 require 重新赋值 
```
// 错误！
var req = require, mod = req('./mod');

// 错误！
require = function() {}

// 错误！
function F(require) {}

// 错误！
function F() {
    var require = function() {}
}
```
* require 的参数值必须是字符串的直接量
```
// 静态分析阶段加载模块的而不是执行阶段加载模块，无法获知变量的值
// 错误！
require(myModule);

// 错误！
require("my-" + "module");

// 错误！
require("MY-MODULE".toLowerCase());

// 正确！
require("my-module");
```
#### exports
exports 是一个对象，用来向外提供模块的接口
```
define(function(require, exports) {
    // 对外提供 foo 属性
    exports.foo = 'bar';

    // 对外提供 doSomething 方法
    exports.doSomething = function() {};
});

// 除了给 exports 对象增加成员，还可以使用 return 直接向外提供接口
define(function() {
    return {
        foo: 'bar',
        doSomething: function() {}
    };
});

// 如果 return 语句是模块中的唯一代码，还可简化为
define({
    foo: 'bar',
    doSomething: function() {}
});
```
```
// 错误写法
define(function(require, exports) {
    exports = {};
});

// 正确的写法是使用 return 或者给 module.exports 赋值，或者给 exports 对象增加属性。因为 exports 仅仅是 module.exports 的一个引用，如果给它重新赋值，并不能改变 module.exports 的值。
```
#### module
module 是一个对象，上面存储了与当前模块相关联的一些属性和方法
* `module.uri`: 根据模块系统的路径解析规则得到的模块绝对路径
* `module.id`: 模块的唯一标识。 `define` 的第一个参数就是模块标识。`require` 和 `require.async` 的第一个参数也是模块标识。不设置时，值等于`module.uri`。相对标识相对于 require 所在模块的路径来解析，顶级标识根据模块系统的基础路径来解析
```
define('id', [], function() {});
require('jquery');
require('./module');
```
* `module.dependencies`: 是一个数组，表示当前模块的依赖
* `module.exports`: 模块对外提供的接口
```
// 对 module.exports  的赋值需要同步执行，不能放在回调函数里
// a.js
define(function(require, exports, module) {
    setTimeout(function() {
        module.exports = {
            a: 'hello'
        };
    });
});

// b.js
define(function(require, exports, module) {
    var m = require('./a);
    console.log(m.a); // undefined
});
```
### 动态依赖
```
// 会将两个模块文件都下载下来，但真正执行的是符合条件的模块里的代码
// 这种情况下，推荐使用 require.async 来进行条件加载。
if(todayIsWeekend) {
    require('play');
} else {
    require('work');
}
```
### 如何理解模块的加载是异步的，模块使用时才会加载执行
* 模块的加载是异步的，是指模块加载不会阻塞网页的渲染。
* 模块使用时才会加载执行，是指模块在静态分析时会将所有同步加载的模块全部下载下来，但只有使用时通过 require 加载进来之后才会被引入相应的模块内使用。这里的加载其实是 引入 的意思。
```
// index.html
<script type="text/javascript" src="./js/libs/sea.js"></script>
<script type="text/javascript">
    seajs.use('./js/modules/main');
    console.log('index')
</script>

// main.js
define(function (require) {
    console.log('main')
    var m1 = require('./module1');
    var m4 = require('./module4');
});

// 结果是：index main
```
```
// 模块在静态分析时会预先加载
// 将 main.js 做如下修改
define(function (require) {
    console.log('main');

    // 两个模块都会加载进来
    var a = 1;
    if (a === 1) {
        require('./module1');
    } else {
       require('./module4');
    }
});

// module4.js
define(function (require, exports, module) {
    console.log('module4');
    var module2 = require('./module2');

    function show() {
        console.log('module4 show() ' + module2.msg);
    }

    exports.show = show;

    require.async('./module3', function (m3) {
       console.log('异步引入依赖模块3 ' + m3.API_KEY); 
    });
});

// 网页中下载的静态资源是：module1.js module4.js module2.js
// module3.js 是异步加载的，只有执行到相应的代码才会去加载
```

### 小结
与 RequireJS 的 AMD 规范相比，CMD 规范尽量保持简单，并与 CommonJS 和 Node.js 的 Modules 规范保持了很大的兼容性。通过 CMD 规范书写的模块，可以很容易在 Node.js 中运行