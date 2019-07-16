## 设计思想
尽量静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。

```
import { stat, exists, readFile } from 'fs';
```
从 `fs` 模块加载三个方法，其他方法不加载（编译时加载或静态加载）。

## 主要命令
* `export`: 规定对外输出接口
* `import`: 输入其他模块提供的功能

### export
```
export const a = 1;
export const b = 2;

// 等价于
const a = 1;
const b = 2;
export {a, b};  
// export { a as a1, b as b1};
```
输出的接口与其对应的值是动态绑定的，即通过该接口，可以取到模块内部实时的值
用户需要知道所要加载的变量名或函数名，否则无法加载

### import
```
import {a1 as a2, b1} from './XXX';
import * as variables from './XXX';
```

### export default
指定模块的默认输出，一个模块只能有一个默认输出。
```
export default function foo() {}

import customName from './XXX';
```

本质上是输出一个叫做 `default` 的变量
```
export default foo; //将变量 foo 的值赋给 default
export {foo as default};

import foo from './XXX';
import {default as foo} from './XXX';
```

### 复合写法
先输入后输出同一个模块
```
export {foo as myFoo, bar} from './XXX';
export * from './XXX';

// 可以简单理解为以下代码，但并不等同
import {foo, bar} from './XXX';
export {foo as myFoo, bar};
```
写成一行后，foo 和 bar 实际上并没有被引入当前模块，只是对外转发了这两个接口
```
// 默认接口的改写
export {default} from './XXX';
```
## ES6 模块与 CommonJS 模块的差异
* CommonJS 模块输出的是值的拷贝，ES6 模块输出的是值的引用
* CommonJS 模块时运行时加载，ES6 模块是编译时输出接口（CommonJS 加载的是一个对象，即 module.exports 属性，该对象只有在脚本运行完才会生成；而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成）

## 总结
* CommonJS规范主要用于服务端编程，加载模块是同步的，这并不适合在浏览器环境，因为同步意味着阻塞加载，浏览器资源是异步加载的，因此有了AMD CMD解决方案。
* AMD规范在浏览器环境中异步加载模块，而且可以并行加载多个模块。不过，AMD规范开发成本高，代码的阅读和书写比较困难，模块定义方式的语义不顺畅。
* CMD规范与AMD规范很相似，都用于浏览器编程，依赖就近，延迟执行，可以很容易在Node.js中运行。不过，依赖SPM 打包，模块的加载逻辑偏重
* ES6 在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。