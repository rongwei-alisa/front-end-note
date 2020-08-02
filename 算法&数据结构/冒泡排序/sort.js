/*
 * @Description: file content
 * @Author: RongWei
 * @Date: 2020-08-02 23:05:46
 * @LastEditors: RongWei
 * @LastEditTime: 2020-08-02 23:12:06
 */
function sort(arr) {
    const len = arr.length;
    if (len <= 1) return;

    for (let i = 0; i < len; i++) {
        // 提前退出循环的标识
        let sortAlready = true;
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                sortAlready = false;
            }
        }
        if (sortAlready) {
            break;
        }
    }
    console.log(arr);
}

sort([12, 7, 5, 9, 3, 8, 2, 5]);