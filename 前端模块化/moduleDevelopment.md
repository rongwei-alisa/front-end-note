## 什么是模块
* 将一个复杂的程序依据一定的规则(规范)封装成几个块(文件), 并进行组合在一起
* 块的内部数据与实现是私有的, 只是向外部暴露一些接口(方法)与外部其它模块通信

## 为什么需要模块化
* 避免命名冲突，减少命名空间污染
* 更好的分离，按需加载
* 高复用性
* 高可维护性 
* 更方便的进行依赖关系的管理

## 模块的发展
### 模块封装
#### 原始写法，全局 function 模式
* 实现：将不同的功能封装成不同的全局函数
* 问题：污染全局变量，可能会导致命名冲突
```
function add() {}
function minus() {}
```
#### Namespace 模式
* 作用：减少了全局变量
* 问题：本质是对象，不安全，会暴露所有的模块成员，内部状态可以被外部改写
```
var mathModule = {
    _sum: 0,
    add: function() {},
    minus: function() {}
};

mathModule.add();
mathModule._sum = 1;
```
#### IIFE（匿名函数自调用）
* 实现：将数据和行为封装到一个函数内部, 通过给 window 添加属性来向外暴露接口
* 作用：数据是私有的，外部只能通过暴露的方法进行操作
* 问题：无法解决模块的依赖问题
```
// ES6 之前，函数是 Javascript 中唯一的局部作用域
var mathModule = (function() {
    var _sum = 0;
    var add = function() {};
    return {
        add: add
    };
})();

mathModule.add();
mathModule._sum; //undefined
```
#### IIFE 模式增强，引入依赖
现代模块实现的基石
* 保证了模块的独立性
* 使得模块之间的依赖关系变得明显
```
// modules.js
var myModule = (function($) {
    var $body = $('body');
    var foo = function() {
        console.log($body);
    };
    return {
        foo: foo
    };
})(jQuery);

myModule.foo();
```
### 模块加载
#### script tags
* 请求过多
* 依赖模糊
* 难以维护
```
<!-- 引入的js必须有一定顺序 -->
  <script type="text/javascript" src="jquery-1.10.1.js"></script>
  <script type="text/javascript" src="module.js"></script>
  <script type="text/javascript">
    module.foo()
  </script>
```
#### 
* `LAB.js（Loading and Blocking）`: Loading 指异步并行加载，Blocking 是指同步等待执行。LABjs 通过优雅的语法（script 和 wait）实现了这两大特性，核心价值是性能优化。作用是：动态并行加载脚本文件 以及 管理加载脚本文件的执行顺序
* `YUI Loader`：基于模块的依赖管理

### 模块化解决方案
(社区制定的模块加载方案)
* `CommonJS` 用于服务器
* `AMD` 用于浏览器
* `CMD`
* `ES6 Module` 在语言标准的层面上实现了模块功能，成为浏览器和服务器通用的解决方案