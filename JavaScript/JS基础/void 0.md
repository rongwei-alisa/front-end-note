# 为什么可以使用 void 0 来代替 undefined ?
开发过程中可以使用 `void 0` 来代替 `undefined`。使用 `void 0` 有以下好处：
* 防止 undefined 被重写。undefined 不是 js 中的保留字，只是全局对象的一个属性，在低版本的 IE 中会被重写；ES5 中，undefined 在全局作用域中已经是只读了，但是在局部作用域中还是可以被重写。
* void 能对给定的表达式求值，但是永远只返回 undefined（这其中最短的就是 void 0 了），且不能被重写
>The void operator evaluates the given expression and then returns undefined.
* 使用 void 0 可以节省字节。不少 JavaScript 压缩工具在压缩过程中，正是将 undefined 转换为 void 0 了
```
(function() {
  var undefined = 10;

  // 10 -- chrome
  alert(undefined);
})();

(function() {
  undefined = 10;

  // undefined -- chrome
  alert(undefined);
})();
```