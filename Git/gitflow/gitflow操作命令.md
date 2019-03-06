# Gitflow 简介

## 操作命令

#### 初始化
`git flow init`: 初始化现有的 Git 库，需要回答几个关于分支的命名约定问题，推荐使用默认值。分支 prefix 团队统一使用 "-" 连接，如 feature-reim，release-0308

#### 功能分支
`git flow feature start FEATURENAME`: 创建一个基于 develop 分支的功能分支，并切换到这个分支下
`git flow feature finish <FEATURENAME>`: 完成功能开发。这个命令将执行以下几步操作：
* 合并 FEATURENAME 分支到 develop 分支
* 删除 FEATURENAME 分支
* 切换回 develop 分支
`git flow feature publish FEATURENAME`: 发布功能分支到远程服务器，可以多人合作在一个功能分支上开发
`git flow feature pull origin FEATURENAME` 或 `git flow feature track FEATURENAME`: 取得其他用户发布的功能分支，并签出远程的变更。

#### release 分支
`git flow release start RELEASENAME`: 从 develop分支创建 release 分支
`git flow release publish RELEASENAME`: 发布 release 分支，release 分支创建之后应立即发布允许其他开发者提交代码
`git flow release finish RELEASENAME`: 完成 release 分支，会执行以下几步操作：
* 合并 release 分支到 master 分支
* 用 release 分支名打 tag
* 合并 release 分支到 develop 分支
* 移除 release 分支

#### 紧急修复
`git flow hotfix start VERSION`: VERSION 参数标记着修正版本
`git flow hotfix finish VERSION`: 完成修复。代码合并回 develop 和 master 分支，master分支上打上修正版本的 tag

## 工具
* 通过 `brew install git-flow` 来安装gitflow
* 也可以使用 vs code 中的 gitflow 插件，或 source map，不用敲命令

## 常用分支
#### master
* 主分支，产品的功能全部实现后，最终在 master 分支对外开放
* 只能从其他分支（release/hotfix）合并，不能直接在此分支上修改
* 所有的 master 分支的推送应该打 tag，方便追溯

#### develop
* 主开发分支，基于 master 分支克隆
* 包含所有要发布到下一个 release 的代码
* 只能从其他分支合并
* feature 分支开发完毕，合并到 develop
* develop 分支拉取 release 提测
* release/hotfix 分支上线完毕，合并到 develop

#### feature
* 主要用于新需求新功能开发，基于 develop 分支克隆
* 功能开发完毕后合并到 develop 分支
* feature 分支可以有多个，用于多个功能的同时开发，属于临时分支，功能开发完成后可删除

#### release
* 测试分支，feature 分支合并到 develop 之后，从 develop 分支克隆
* 测试过程中发现的 bug 可直接在本分支进行修复，修复完成后合并到develop、master 分支，打 tag
* 属于临时分支，功能上线后可删除

#### hotfix
* 补丁分支，基于 master 分支克隆，主要用于对线上的版本进行 bug 修复
* 修复完成后合并到 develop、master 分支，打 tag
* 属于临时分支，补丁修复上线后可删除



