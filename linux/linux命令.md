### 文件相关
`cat>>filename` 或 `touch filename`：新建文件

### 任务相关
`fg`： 将后台任务切换到前台运行
`jobs`： 查看所有运行中的任务
`nohup Command &`： 在后台运行任务，忽略所有挂断信号，并默认将日志输出到当前目录下的 `nohup.out` 文件中
`nohup npm start > nohup.out &`：每次写入的时候都先清空 `nohup.out` 中的内容
`cp /dev/null nohup.out` 或 `cat /dev/null > nohup.out`：清空 `nohup.out` 文件
