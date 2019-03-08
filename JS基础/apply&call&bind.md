都是用来改变函数运行时 this 的指向。第一个参数都是函数内部 this 的指向。当第一参数传值为 null 或者 undefined 时，默认指向 window
不同：
* apply 和 call 会立即执行，
* bind 方法不会立即执行，而是返回一个改变了上下文 this 值的函数
* bind 第二个参数开始及之后的参数是一个参数列表；call 的第二个开始及之后的参数是一个参数列表； apply 的第二个参数是一个数组
```
// 利用 call 实现 bind
Function.prototype.bind = function() {

    // shift 方法用于删除数组中的第一个参数，并返回第一个元素的值
    // slice 方法返回对传入数组的一部分的浅拷贝，不会改变原数组
    // arguments 为类数组，不具备 shift 和 slice 方法

    var self = this, // 保存原函数
        context = [].shift.call(arguments), // 返回传入函数的第一个参数，即函数内 this 的指向
        args = [].slice.call(arguments); // 剩余的参数转为数组
    
    return function() {
        self.apply(context, [].concat.call(args, [].slice.call(arguments)));
    }
};
```