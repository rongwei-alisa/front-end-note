* `Node` 是 `CommonJS` 规范的主要实践者
* 每一个文件就是一个模块，有自己的作用域，在其中定义的所有变量、函数都是私有的，不会污染全局作用域
* 在服务器端，模块的加载是运行时同步加载；在浏览器端，模块需要提前编译打包处理
* 模块可以多次加载，但只会在第一次加载的时候运行一次，然后运行结果就会被缓存。
* 模块按照其在代码中出现的顺序进行加载
* 模块就是对象，???输入的是模块值的拷贝???（个人认为输出的并不是模块的拷贝，而是 module.exports 对象本身）

它提供了四个重要的环境变量为模块化的实现提供支持：`module`、`exports`、`require`、`global`。
* 在每个模块内部，`module` 变量代表当前模块，它的 `exports` 属性表示对外暴露的接口。语法：`module.exports = value` 或 `exports.XXX = value`
* `require`：加载模块文件。读入并执行一个 js 文件，并返回模块的 exports 对象。语法：`require('XXX')`
### 服务器端
```
// 定义模块 math.js
function add(a, b) {
    return a + b;
}

function minus(a, b) {
    return a - b;
}

module.exports = {
    add,
    minus
};


// 模块引用
const math = require('./math');
math.add(2, 5);
```
使用同步的方式加载模块。在服务端，模块文件都存在本地，读取非常快，但在浏览器端，由于网络环境的限制，使用异步的加载方式更为合理

```
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```
整体加载 `fs` 模块，生成一个对象，然后再从这个对象上读取相应的方法。运行时加载导致没办法在编译时做静态优化。
### 浏览器端
浏览器端需要使用 browserify 来实现 CommonJS 的加载，可以把 nodejs 的模块编译成浏览器可用的模块