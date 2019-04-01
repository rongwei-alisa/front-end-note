* `Node` 是 `CommonJS` 规范的主要实践者
* 每一个文件就是一个模块，有自己的作用域，在其中定义的所有变量、函数都是私有的，不会污染全局作用域
* 模块可以多次加载，但只会在第一次加载的时候运行一次，然后运行结果就会被缓存。如果想要模块再次运行，需要清除缓存
* 模块按照其在代码中出现的顺序进行加载
* 输入的是模块值的拷贝

它提供了四个重要的环境变量为模块化的实现提供支持：`module`、`exports`、`require`、`global`。
* 在每个模块内部，`module` 变量代表当前模块，它的 `exports` 属性表示对外暴露的接口。语法：`module.exports = value` 或 `exports = value`
* `require`：加载模块文件。读入并执行一个 js 文件，并返回模块的 exports 对象。语法：`require('XXX')`
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