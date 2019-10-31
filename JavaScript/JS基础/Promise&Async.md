### Event Loop
主线程从任务队列中读取事件，这个过程是不断循环的，这种运行机制又称为 Event Loop
Javascript 是单线程的，同一时间只能做一件事。因为它主要是用来处理用户交互和操作 `DOM` 的。js 在执行的时候会按照顺序先执行主线程中的任务，当遇到异步操作时，会将它加入到一个异步的任务队列，等到主线程中的代码全部执行完毕后，才会去一一执行异步任务队列中的代码。
js 中的内存分为 `堆内存` 和 `栈内存`，堆内存中存的 `Object` 类型的数据，栈内存中存的是基本类型数据和函数执行时的运行空间。同步代码就放在执行栈中。

#### 宏任务与微任务
异步任务分为 宏任务 与 微任务，执行的顺序是 `执行栈中的代码 => 微任务 => 宏任务`。
`微任务`：当执行栈中的代码执行完毕后，会在执行 `宏任务队列` 之前看看 `微任务队列` 中有没有任务，如果有会先将 `微任务队列` 中的任务清空才会去执行 `宏任务队列`。
`宏任务`：等待 `执行栈` 和 `微任务队列` 都执行完毕才会执行，并且在执行完每一个`宏任务` 之后，会去看看 `微任务队列` 有没有新添加的任务，如果有，会先将 `微任务队列` 中的任务清空，才会继续执行下一个 `宏任务`

### Promise
`Promise` 是微任务，`setTimeout`、 `setInterval` 是宏任务。
`Promise` 构造函数本身是同步的，`then` 方法是异步的。
`Promise` 状态不可逆
`then` 或 `catch` return 出去的数值会被后面的 `then` 或 `catch` 接收
`then` 接收到的如果不是函数，会发生穿透
`Promise` 对象 `resolve` 或者 `reject` 一个 `promise` 对象，前一个 `promise` 的状态会由后一个决定。
```
// 先执行微任务，再执行宏任务
setTimeout(() => {
    console.log(1);
});
var a  = new Promise(resolve => {
    console.log(2);
});
// 2 1
```
```
// 先将第一个 setTimeout 加入宏任务队列，因为 promise 函数本身是同步的，所以里面的 setTimeout 会第二个加入宏任务队列，最后才是第三个 setTimeout
setTimeout(() => {
    console.log(1)
});
var a  = new Promise(resolve => {
    setTimeout(() => { 
        console.log(2);
    });
});
setTimeout(() => {
    console.log(3)
});
// 1 2 3
```
```
setTimeout(() => {
    console.log(1)
});
var a  = new Promise(resolve => {
    resolve();
}).then(() => {
    setTimeout(() => { 
        console.log(2);
    });
});
setTimeout(() => {
    console.log(3)
});
// 1 3 2
```
```
setTimeout(() => {
    console.log(1)
});
var a  = new Promise(resolve => {
    setTimeout(() => { 
        console.log(2);
    });
    console.log(4);
});
setTimeout(() => {
    console.log(3)
});
// 4 1 2 3
```
```
new Promise(resolve => {
    console.log(2);
    resolve(3);
}).then(data => {
    console.log(data);
});
console.log(1);
// 2 1 3
```
```
// `Promise` 对象 `resolve` 或者 `reject` 一个 `promise` 对象，前一个 `promise` 的状态会由后一个决定。
let a = new Promise((resolve, reject) => {
    resolve(b);
});
let b = new Promise((resolve, reject) => {
    reject(4);
});
a.then(() => {
    console.log(1);
}).catch(() => {
    console.log(2);
});
// 2


// ???????????????????????????
var a = new Promise((resolve, reject) => {
    resolve(b);
});
var b = new Promise((resolve, reject) => {
    reject(4);
});
a.then(() => {
    console.log(1);
}).catch(() => {
    console.log(2);
});
// 1
```

### Async
* Async 函数会返回一个 promise 对象
* return 错误会让返回的 promise 状态变为 reject
* 内部如果 await 多个 promise 对象，则会等所有 promise 完成之后再执行 then
```
async function a() {
    await b();
    return new Error('hh'); 
}
function b() {
    console.log(3);
}
a().then(() => {
    console.log(1);
}).catch((err) => {
    console.log(err);
});
// 3 1

async function a() {
    await b();
    return new error('hh'); 
}
function b() {
    console.log(3);
}
a().then(() => {
    console.log(1);
}).catch((err) => {
    console.log(err, 'www');
});
// 3
// ReferenceError: error is not defined
    at a (<anonymous>:3:5) "www"
```
```
async function a() {
    let c = await b();
    let f = await d();
    console.log(c, f)
    return c + f; 
}
function b() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1);
        }, 1000);
    });
}
function d() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(4);
        }, 5000);
    });
}
a().then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err, 'www');
});
// 1 4
// 5
```
### Node 中的 Event Loop
Node 中的Event Loop会在每次切换队列的时候 清空微任务队列，也就会会将当前队列都执行完，在进入下一阶段的时候检查一下微任务中有没有任务。
```
setTimeout(() => {
    console.log('timeout1')
    Promise.resolve().then(() => {
        console.log('promise1')
    })
    Promise.resolve().then(() => {
        console.log('promise2')
    })
}, 0)

setTimeout(() => {
    console.log('timeout2')
    Promise.resolve().then(() => {
        console.log('promise3')
    })
}, 0)
```
* 先将两个setTimeout塞到宏任务队列中
* 当第一个setTimeout1时间到了执行的时候，首先打印timeout1，然后在微任务队列中塞入promise1和promise2
* 当第一个setTimeout1执行完毕后，继续执行下一个setTimeout2
* 当setTimeout2 执行的时候，先打印一个timeout2，然后又在微任务队列中塞了一个promise2
* 当前宏任务队列清空，进入下一阶段，去检查微任务队列中有没有任务
清空微任务队列
* 在node环境中执行 会依次打印 timeout1 timeout2 promise1 promise2 promise3

### 实现异步框架
```
// 利用 promise 实现
(function() {
    function asy() {

    }
    asy.prototype.on = function(fn) {
        return new Promise((resolve, reject) => {
            fn(resolve, reject);
        });
    };

    function getAsy() {
        return new asy();
    }

    let asyOb = new getAsy();
    asyOb.on((resolve, reject) => {
        setTimeout(() => {
            console.log(1);
            resolve(2);
        }, 2000);
    }).then((res) => {
        console.log(res);
    });
})();
// 1 2
```
```
// 利用 async 实现
(function() {
    function asy() {

    }
    asy.prototype.on = function(fn) {
        let _promise = new Promise((resolve, reject) => {
            fn(resolve, reject);
        });
        async function _call() {
            return await _promise;
        }
        return _call();
    };

    function getAsy() {
        return new asy();
    }

    let asyOb = new getAsy();
    asyOb.on((resolve, reject) => {
        setTimeout(() => {
            console.log(1);
            resolve(2);
        }, 2000);
    }).then((res) => {
        console.log(res);
    });
})();
// 1 2
```
```
// 并发
(function() {
    function asy() {
        this.promiseArr = [];
    }
    asy.prototype.on = function(fn) {
        return new Promise((resolve, reject) => {
            fn(resolve, reject);
        });
    };
    asy.prototype.all = function() {
        let args = Array.prototype.slice.call(arguments);
        for(let i = ; i < args.length; i += 1) {

        }
    };

    function getAsy() {
        return new asy();
    }

    let asyOb = new getAsy();
    asyOb.on((resolve, reject) => {
        setTimeout(() => {
            resolve(3);
        }, 2000);
    }).then((res) => {
        console.log(res);
    });
})();
```
