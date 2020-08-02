/*
 * @Description: 插入排序的实现
 * @Author: RongWei
 * @Date: 2020-08-02 23:20:36
 * @LastEditors: RongWei
 * @LastEditTime: 2020-08-02 23:28:24
 */
function sort(arr) {
    const len = arr.length;
    if (len <= 1) return;
    for (let i = 1; i < len; i++) {
        let value = arr[i];
        let j;
        for (j = i; j > 0; j--) {
            if (value < arr[j - 1]) {
                arr[j] = arr[j - 1];
            } else {
                break;
            }
        }
        arr[j] = value;
    }
    console.log(arr);
}

sort([12, 7, 5, 9, 3, 8, 2, 5]);