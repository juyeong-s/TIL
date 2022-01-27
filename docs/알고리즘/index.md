---
layout: page
title: 알고리즘
nav_order: 3
has_children: true
permalink: /algo/
---

# [알고리즘] 이진 탐색 (이분 탐색, Binary Search)

![image](https://user-images.githubusercontent.com/63364990/151374565-654c998a-b744-4f21-a342-37342dd6bf21.png)
​
## **이진 탐색 (이분 탐색, Binary Search)**
​
-   이진 탐색 알고리즘은 **정렬되어 있는 리스트에서** **탐색 범위를 절반씩 좁혀가며 데이터를 탐색**하는 방법이다.
-   이진 탐색은 **배열의 데이터가 정렬되어 있어야만 사용할 수 있는** 알고리즘이다.
-   변수 3개(start, mid, end)를 사용하여 탐색한다.  
    **찾고자하는 데이터와 배열의 중간(mid) 위치에 있는 데이터를 반복적으로 비교해서 원하는 데이터를 찾는 것**이 이진 탐색이다.
​
------------------
​
## **이진 탐색(Binary Search)의 탐색 과정**
​
![image](https://user-images.githubusercontent.com/63364990/151374639-784a7e4a-4d54-44c2-af86-8510fcc0e77e.png)
​
위의 데이터 집합에서 8이란 데이터를 탐색하도록 하자. 우선 첫번째로 배열의 중간 요소를 선택한다.  
mid \= 7;
​
![image](https://user-images.githubusercontent.com/63364990/151374659-38188d51-ab02-417e-bb94-36446d957b2e.png)
​
두번째로는 중간 값과 찾으려는 값을 서로 비교한다.  
만약 찾으려는 값이 중간 값보다 작다면 중앙 요소의 왼쪽에서 중간 값을 다시 택하고, 찾으려는 값이 중간 값보다 크다면 오른쪽에서 중간 값을 다시 택하게 된다.  
그리곤 다시 이진 탐색(Binary Search)과정을 거치는 것이다.  
위의 경우, 찾으려는 값인 8이 중간값 7보다 크므로 중간 값 왼쪽에 있는 데이터는 비교할 필요가 없는 것이다.  
이제, 중간 값 7의 오른편에서 중간 값을 다시 택한다.
​
![image](https://user-images.githubusercontent.com/63364990/151374674-affbb9cd-0a94-473f-9229-9c54c0c1c0fe.png)
​
이제는 중간 값이 9이고, 다시 찾으려는 값과 중간 값을 비교하게 됩니다.  
찾으려는 값 8, mid \= 9;  
8이 9보다 작으므로 중간 값 왼편에서 데이터를 찾아야 •한다.
​
![image](https://user-images.githubusercontent.com/63364990/151374689-ad01b879-a4ab-4610-b267-7b99ff89ce82.png)
​
그럼 다시 왼쪽에서 중간 값을 선택한다.  
mid \= 8;  
남은 데이터 8이 중간 값으로 택해지게 되는데 찾으려는 데이터와 일치하므로 탐색을 끝마친다.
​
------------------
​
## **이진 탐색 코드 (JavaScript)**
: 자바스크립트로 구현한 이진탐색 코드이다.
​
```
function binarySearch(sortedArray, target) {
    let start = 0;
    let end = sortedArray.length - 1;
  
    while (start < end) {
      const mid = start + Math.floor((start + end) / 2);
​
      if (sortedArray[mid] === target)
        return mid;
​
      if (sortedArray[mid] < target)
        start = mid + 1;
      else
        end = mid - 1;
    }
  
    return -1;
}
  
const nums = [10, 40, 70, 50, 30, 90, 80, 20, 60];
const sortedNums = nums.sort();
​
console.log(binarySearch(sortedNums, 40));
> 3
​
console.log(binarySearch(sortedNums, 100));
> -1
```