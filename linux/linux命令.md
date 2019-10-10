<!--
 * @Description: file content
 * @Author: RongWei
 * @Date: 2019-04-01 15:55:31
 * @LastEditors: RongWei
 * @LastEditTime: 2019-09-12 17:34:23
 -->
### 文件和目录相关
```
// 创建一个叫做 'dir1' 的目录'
mkdir dir1  
// 同时创建两个目录  
mkdir dir1 dir2 
// 创建一个目录树 
mkdir -p /tmp/dir1/dir2  

// 新建文件
cat>>filename
touch filename
```

### 任务相关
`fg`： 将后台任务切换到前台运行
`jobs`： 查看所有运行中的任务
`nohup Command &`： 在后台运行任务，忽略所有挂断信号，并默认将日志输出到当前目录下的 `nohup.out` 文件中
`nohup npm start > nohup.out &`：每次写入的时候都先清空 `nohup.out` 中的内容
`cp /dev/null nohup.out` 或 `cat /dev/null > nohup.out`：清空 `nohup.out` 文件

### 连接服务器
`ssh username@IP`