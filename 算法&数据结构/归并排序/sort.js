/*
 * @Description: 归并排序的实现，先将数组递归对半拆分至最小单元，再两两比较进行排序合并
 * @Author: RongWei
 * @Date: 2020-08-02 21:46:51
 * @LastEditors: RongWei
 * @LastEditTime: 2020-08-02 22:49:48
 */


// 数组合并
function merge(arr, start, harf, end) {
    let i = start, j = harf + 1, newArr = [];
    while (i <= harf && j <= end) {
        if (arr[i] <= arr[j]) {
            newArr.push(arr[i]);
            i++;
        } else {
            newArr.push(arr[j]);
            j++;
        }
        console.log(newArr, i, j)
    }
    let residueStart, residueEnd;
    if (i <= harf) {
        residueStart = i;
        residueEnd = harf;
    } else {
        residueStart = j;
        residueEnd = end;
    }
    const partArr = arr.slice(residueStart, residueEnd + 1);
    newArr.push(...partArr);
    for (let q = 0; q <= end - start; q++) {
        arr[start + q] = newArr[q];
    }
    console.log(arr);
}

// 数组拆分
function split(arr, start, end) {
    if (start >= end) return;
    const harf = parseInt((start + end) / 2);
    split(arr, start, harf);
    split(arr, harf + 1, end);
    merge(arr, start, harf, end);
}

function sort(arr) {
    split(arr, 0, arr.length - 1);
}

sort([12, 7, 5, 9, 3, 8, 2, 5]);