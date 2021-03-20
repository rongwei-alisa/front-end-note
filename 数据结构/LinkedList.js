/*
 * @Author: your name
 * @Date: 2021-03-20 20:41:57
 * @LastEditTime: 2021-03-20 21:22:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /front-end-note/数据结构/LinkedList.js
 */
function Node(data) {
  this.data = data;
  this.next = null;
}

function LinkedList() {
  this.head = new Node('head');

  this.find = find;
  this.findPrev = findPrev;
  this.insert = insert;
  this.remove = remove;
  this.display = display;

  // 查找指定值的节点
  function find(val) {
    var node = this.head;
    while (node) {
      if (node.data === val) {
        return node;
      }
      node = node.next;
    }
  }

  // 查找指定值的前一个节点
  function findPrev(val) {
    var node = this.head.next, prev = node;
    while (node) {
      if (node.data === val) {
        return prev;
      }
      node = node.next;
      prev = prev.next
    }
  }

  // 在指定位置插入节点
  function insert(val) {
    var newNode = new Node(data);
    var targetNode = find(val);
    newNode.next = targetNode.next;
    targetNode.next = newNode;
  }

  // 删除指定节点
  function remove(val) {
    var targetPrev = findPrev(val);
    var target = targetPrev.next;
    targetPrev.next = target.next;
    target.next = null;
  }

  // 显示链表
  function display() {
    var node = this.head.next;
    while (node) {
      console.log(node.val);
      node = node.next;
    }
  }
}