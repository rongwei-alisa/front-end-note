<!--
 * @Description: file content
 * @Author: RongWei
 * @Date: 2020-03-17 16:20:55
 * @LastEditors: RongWei
 * @LastEditTime: 2020-03-17 20:22:31
 -->
## 函数模块
lodash 中每个函数在 NPM 都有一个单独的发布模块。这种做法需要安装所有用到的 lodash npm 包
`import isEqual from 'lodash.isequal';`

## 全路径引用
`import isEqual from 'lodash/isEqual';`

## 使用插件优化
使用 `lodash-webpack-plugin` 与 `babel-plugin-lodash` 按需加载