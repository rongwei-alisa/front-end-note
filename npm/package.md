<!--
 * @Author: RongWei
 * @Date: 2021-09-20 11:21:19
 * @LastEditors: RongWei
 * @LastEditTime: 2021-09-22 21:16:00
 * @Description: file content
-->
# package.json 与 package-lock.json

`npm init -y` 可以自动生成 `package.json`
`npm install` 安装所需要的模块

## package.json
- `name` 项目名称，命名有一定的规范，当在 npm 上发布包时，会成为 URL 的一部分，因此不能包含任何非 URL 安全字符。
- `version` 版本
- `scripts` 指定了运行脚本命令的 npm 命令行缩写
- `dependencies` 项目运行所依赖的模块，`npm install <pck> --save`
- `devDependencies` 项目开发所需要的模块， `npm install <pck> --save-dev`
- `peerDependencies` 
- `bin` 指定各个内部命令对应的可执行文件的位置 
- `main` 指定加载模块的入口文件
- `config` 添加命令行的环境变量
- 其他
   - `browser` 支持的浏览器版本
   - `engines` 指明了该模块运行的平台
   - `man` 指定当前模块的 man 文档的位置
   - `preferGlobal` 布尔值，表示当用户不将该模块安装为全局模块时，要不要显示警告
   - `style` 样式打包工具 parcelify 通过它知道样式文件的打包位置

### 语义版本控制
`x.y.z` 主版本.次版本.补丁版本
- 进行不兼容的 API 更改时，升级主版本
- 以向后兼容的方式添加功能时，升级次版本
- 进行向后兼容的方式修复缺陷时，升级补丁版本

更新版本时的规则：
- `^` 只会执行不更改最左边非零数字的更新，如 ^1.2.2 表示安装 1.x.x 的最新版本（不低于 1.2.2）; ^0.2.3 表示安装 0.2.x 的最新版本
- `~` 更新到补丁版本，如 ～1.2.2 表示安装 1.2.x 的最新版本（不低于 1.2.2）
- `>`
- `>=`
- `<`
- `<=`
- `=`
- `-` 接受一定范围的版本，`2.1.0 - 2.6.2`
- `||` 组合集合 `< 2.1 || > 2.6`
- `tag` latest: 最新版本

## package-lock.json
package-lock.json 会固化当前安装的每个软件包的版本
当运行 `npm update` 时，`package-lock.json` 中的软件包的版本会被更新
requires 字段制定了软件包的依赖，它们会按照字母顺序被添加到文件中，每个都有 `version` 字段，指向软件包位置的 `resolved`字段，以及用于校验软件包的 `integrity` 字段





### 查看 npm 包安装的版本
`npm list` 也可以打开 package-lock.json 文件查看
`npm list -g` 适用于全局安装的软件包
`npm list --depth=0` 仅获取顶层的软件包，package.json 中列出的软件包
`npm list [package_name]` 获取特定软件包的版本，也适用于安装的软件包的依赖
`npm view [package_name] version` 查看软件包在 npm 仓库上的最新可用版本
`npm view [package_name] versions` 查看软件包在 npm 仓库上的所有版本

### 安装包的旧版本
`npm install <package>@<version>`

package-lock冲突时如何解决？
script脚本
version tag publish

