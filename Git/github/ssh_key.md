<!--
 * @Description: file content
 * @Author: RongWei
 * @Date: 2020-08-03 00:21:50
 * @LastEditors: RongWei
 * @LastEditTime: 2020-08-03 10:29:09
-->
<!-- 生成ssh key -->
`ssh-keygen -t rsa -C "账号"`

<!-- 查看ssh key -->
`cat /Users/***/.ssh/id_rsa.pub`

<!-- 解决每次git操作需要输密码的问题 -->
`ssh-add ~/.ssh/id_rsa`