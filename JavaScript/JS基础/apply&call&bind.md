***在 ES6 的箭头函数下，call 和 apply 将失效。***
### 三者的比较
相同之处：
* 都是用来改变函数运行时 this 的指向
* 第一个参数都是函数内部 this 的指向。当第一参数传值为 null 或者 undefined 时，默认指向 window
* 都可以利用      

不同之处：
* bind 返回一个改变了上下文 this 值的函数，call 和 apply 则是在传入的对象上立即执行调用他们的函数
* bind 和 call 的第二个开始及之后的参数是一个参数列表； apply 的第二个参数是一个数组

bind 特点：
* 保存 this，返回一个函数
* 可以传入参数
* bind 返回的函数可以通过 new 操作符创建对象，这种行为就像把原函数（调用 bind 方法的函数）当作构造器。提供的 this（传入 bind 方法的 this 值被忽略，新的 this 值指向 new 方法创建的实例对象） 值被忽略，同时调用时的参数被提供给模拟函数   

### 利用 apply
```
// apply 实现 call
Function.prototype.call = function() {
    var ctx = [].shift.apply(arguments);
    return this.apply(ctx, arguments);
}
```
```
// 利用 apply 实现 bind
Function.prototype.bind = function() {

    // shift 方法用于删除数组中的第一个参数，并返回第一个元素的值
    // slice 方法返回对传入数组的一部分的浅拷贝，不会改变原数组
    // arguments 为类数组，不具备 shift 和 slice 方法

    var self = this, // 保存原函数，即调用 bind 方法的 bar 函数对象
        context = [].shift.apply(arguments), // 返回传入函数的第一个参数，即函数内 this 的指向
        args = [].slice.apply(arguments); // 剩余的参数转为数组
    
    var fResult =  function() {
        // 这里为什么需要用 concat 方法
        // 因为 bind 方法在使用的时候可以 var bindFn = fn.bind(this, arg1, arg2); bindFn(arg1, arg2);
        // 所以这里的 arguments 跟外层的 arguments 不是同一个对象，这里的是 bind 返回的函数在被执行的时候接收的参数
        console.log(this); // 没有 fResult.prototype = self.prototype;时，使用 new 方法时是 self 的实例对象；作为函数调用时指向 window 对象，将 fResult 的圆心改变之后，this 指向 bar
        self.apply(this instanceof self ? this : context, args.concat([].slice.apply(arguments))); // 将 bind 方法传入的 this 值指向调用 bind 方法的 bar
    };
    fResult.prototype = self.prototype; // fResult 中的 this 将指向 bar
    return fResult;
};

var foo = {
    value: 1
};

function bar(name, age) {
    this.sex = 'female';
    console.log(name);
    console.log(age);
    console.log(this.value);
}

var bindFn = bar.bind(foo, 'ZhangSan');
bindFn(18);

var obj = new bindFn('female');
console.log(obj.sex);
```
应用：
```
// 求数组中的最大项, Math.max 不支持传入一个数组，可以借用 apply 的特点，将数组转换为一个个参数
Math.max.apply(null, arr);
Math.min.apply(null, arr);

// 实现两个数组的合并
Array.prototype.push.apply(arr1, arr2);
[].push.apply(arr1, arr2);

// 将类数组转换为数组
Array.prototype.slice.apply(arr);
[].slice.apply(arr);

// 判断变量类型
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

// 做继承
// 通过 new 创建 student 实例后，Student 构造函数中的 this 就指向实例 student。而在构造函数 Student 中将 Person 中的 this 指向了 Student 中的 this，即刚创建的 student 实例。所以 student 中会含有 name、age 属性
function Person(name, age) {
    this.name = name;
    this.age = age;
}

function Student(name, age, grade) {
    Person.apply(this, arguments);
    this.grade = grade;
}

var student = new Student('wei', 24, '一年级');
```