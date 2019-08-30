<!--
 * @Description: file content
 * @Author: RongWei
 * @Date: 2019-08-29 09:31:30
 * @LastEditors: RongWei
 * @LastEditTime: 2019-08-29 19:23:46
 -->
`Array.from()` 方法从一个类似数组或可迭代对象中创建一个新的，浅拷贝的数组实例。

***类数组结构转数组，也可以用展开运算符。***

## 语法
`Array.from(arrayLike[, mapFn[, thisArg]])`

`from()` 的 length 属性为 1，即 `Array.from.length === 1`

#### 参数
- arrayLike
想要转换成数组的伪数组对象或可迭代对象。（数组、类数组对象、或者是字符串、map 、set 等可迭代对象）
- mapFn (可选参数)
如果指定了该参数，新数组中的每个元素会执行该回调函数。（在生成的数组上执行一次 `map` 方法后再返回）
- thisArg (可选参数)
可选参数，执行回调函数 mapFn 时 this 对象。

#### 返回值
一个新的数组实例

## 用途
#### 将类数组转换成数组
通常我们遇到的类数组有 函数中的 `arguments` 对象，或者是一个 `DOM` 集合
```
function sum() {
    return Array.from(arguments).reduce((sum, num) => sum + num, 0);
}

sum(1, 2, 3); // 6
```
其他例子：
```
Array.from('Hello'); // ["H", "e", "l", "l", "o"]
Array.from(new Set(['one', 'two'])); // ["one", "two"]

const map = new Map();
map.set('one', 1);
map.set('two', 2);
Array.from(map); // [["one", 1], ["two", 2]]
```

#### 克隆数组
单纯浅拷贝数组的话，还是推荐用 `slice`，效率比较高
```
// 实现数组的浅拷贝
const num = [1, 2, 3];
const copyNum = Array.from(num);

num === copyNum; // false
```
```
// 创建数组的克隆，包括所有嵌套
function recursiveClone(arr) {
    return Array.isArray(arr) ? Array.from(arr, recursiveClone) : arr;
}

const arr = [[1, 2, 3], ['one', 'two', 'three']];
const copyArr = recursiveClone(arr);

arr[0] === copyArr[0]; // false
```

#### 使用值填充数组
```
const length = 3;
const init = 0;
const result = Array.from({ length }, () => init);
result; // [0, 0, 0]

// Array.from({ length }): [undefined, undefined, undefined]
```
```
// 使用 `fill` 填充
const length = 3;
const init = 0;
const result = Array(length).fill(init);
result; // [0, 0, 0]
```

##### 使用对象填充
当初始化数组的每一项都应该是一个新数组时，`Array.from()` 是一个更好的方法
```
const length = 3;
// const init = {};

const resultA = Array.from({ length }, () => ({}));
const resultB = Array(length).fill({});

resultA[0] === resultA[1]; // false
resultB[0] === resultB[1]; // true

// const resultA = Array.from({ length }, () => init);
// const resultB = Array(length).fill(init);
// resultA[0] === resultA[1]; // true
// resultB[0] === resultB[1]; // true
// resultA[0] === resultB[0]; // true
```

##### 使用 `array.map` 填充？
```
const result = Array(3).map(()=> 0);
// result 为长度为 3 的空数组
// Array(3) 会创建一个包含三个空项的数组，也称为稀疏数组。
// map 方法会跳过空项
```

#### 生成数字范围
```
function range(num) {
    return Array.from({length: num}, (item, index) => index);
}

range(4); // [0, 1, 2, 3]
```

#### 数组去重
```
// `Set` 类似于数组，但是所有成员的值都是唯一的，没有重复值
function unique(arr) {
    return Array.from(new Set(arr));
}

unique([1, 1, 2, 3, 3]); // [1, 2, 3]

new Set([1, 1, 2, 3, 3]); // Set(3) {1, 2, 3}
```

### Polyfill
```
if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };
    var toItems = function (value) {
      // support set
      if (value.size > 0 && value.values) {
        let values = value.values()
        var it = values.next()
        var o = []
        while (!it.done) {
          o.push(it.value)
          it = values.next()
        }
        return o
      }
      return Object(value);
    };
    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = toItems(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else      
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method 
      // of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
}
```
