caller: 返回调用当前函数的函数的引用。主要用来查看函数本身被哪个函数调用
callee: 返回当前函数的引用，是 arguments 的一个属性，拥有 length 属性
```
function func1() {
    if(func1.caller) {
        alert(func1.caller.toString());
    } else {
        alert('函数直接执行');
    }
}

function func2() {
    func1();
}

func2(); 
// function func2() {
//    func1();
// }

func1(); // 函数直接执行
```
```
function calleeLengthDemo(arg1, arg2) {
    alert(arguments.callee.toString()); // 形参长度
    if(arguments.length === arguments.callee.length) {
        alert('形参与实参长度一致。')
    } else {
        alert('实参长度：' + arguments.length); // 1
        alert('形参长度：' + arguments.callee.length); // 2
    }
}
calleeLengthDemo(1);
```
```
// 实现函数柯里化
Function.prototype.currying = function() {
    var args = [],
        self = this;
    
    return function() {
        if(arguments.length === 0) {
            return self.apply(this, args);  // ?????????????????????
        } else {
            [].push.apply(args, arguments);
            return arguments.callee;
        }
    }
}
var add = function() {
    var sum = 0;
    for(var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}.currying();
add(2); // 未求值
add(3, 3); // 未求值
add(4); // 未求值
console.log(add()); // 12
```