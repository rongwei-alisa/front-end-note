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