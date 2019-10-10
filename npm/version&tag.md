<!--
 * @Description: file content
 * @Author: RongWei
 * @Date: 2019-09-03 19:26:03
 * @LastEditors: RongWei
 * @LastEditTime: 2019-09-03 20:16:05
 -->
# version & tag

## version
[npm version](https://docs.npmjs.com/cli/version.html)
每一个版本号都对应了其资源文件，而且是不可修改的。

```
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease [--preid=<prerelease-id>] | from-git]

'npm [-v | --version]' to print npm version
'npm view <pkg> version' to view a package's published version
'npm ls' to inspect current package/dependency versions
```
运行以上命令，会改变版本号，并将数据写回 `package.json`， `package-lock.json`, `npm-shrinkwrap.json`

## tag
一般情况下，不指定 `tag`，则默认为 `latest` 这个 `tag`

## tag 和 version
tag 和 version 是相互独立的
```
// 查看当前的 tag 和对应的 version
npm dist-tag ls

// 给某个版本加 tag
npm dist-tag add [package]@[version] [tag]

// 查看发布过的所有的版本号
npm view my-package versions
npm view my-package version // 发布过的一个version
```

## 预发布版本
很多时候一些新改动，不能直接发布到稳定版本上，这时可以发布一个“预发布版本”。
```
npm version prerelease
npm publish --tag beta
```
比如原来的版本号是 `1.0.1`，那么发布后的版本是 `1.0.1-0`
