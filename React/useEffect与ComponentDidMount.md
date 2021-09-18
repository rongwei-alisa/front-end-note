<!--
 * @Author: your name
 * @Date: 2021-09-02 19:24:05
 * @LastEditTime: 2021-09-09 14:18:08
 * @LastEditors: RongWei
 * @Description: In User Settings Edit
 * @FilePath: /front-end-note/React/useEffect与ComponentDidMount.md
-->
# useEffect 与 ComponentDidMount

useEffect 什么时候执行？state/props变更时执行？

什么是副作用

useEffect 涉及到闭包，以下怎么理解？
```
const [count, setCount] = useState(0);

<!-- 以下拿不到最新的 count 值 -->
useEffect(() => {
  let timer = setInterval(() => {
    console.log('count', count);
    setCount(count + 1);
  },1000);
  return () => {
    clearInterval(timer);
  };
},[]);
```
