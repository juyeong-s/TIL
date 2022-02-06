---
layout: page
title: 문자열 자르기 ( substr , substring , slice )
parent: 자바스크립트
nav_order: 3
has_children: false
permalink: /js/str_substring_slice/
---


# 자바스크립트 substr, substring, slice  
세 가지 모두 원본이 잘리는 것이 아니라 잘린 새로운 문자열이 리턴된다.

---
​
**1\. str.substr(start\[, length\])**
​
> substr(시작인덱스, 길이)  또는  substr(시작인덱스)
​
```
let str = '자바스크립트';
​
let result1 = str.substr(0, 2); // 결과 : '자바'
​
let result2 = str.substr(2, 4); // 결과 : '스크립트'
​
let result3 = str.substr(2);    // 결과 : '스크립트'
```
​

길이를 지정해주지 않으면 문자열의 끝까지 자른다.
시작 인덱스부터 길이만큼 잘라서 새로운 문자열을 리턴한다.
​

---
​
**2. str.substring(indexStart\[, indexEnd\])**
​
> substring(시작인덱스, 종료인덱스) 또는  substring(시작인덱스)
​
```
let str = '자바스크립트';
​
let result1 = str.substring(0, 2);  // 결과 : "자바"
​
let result2 = str.substring(2, 5);  // 결과 : "스크립"
​
let result3 = str.substring(2, 6);  // 결과 : "스크립트"
​
let result4 = str.substring(2);     // 결과 : "스크립트"
```
​
시작 인덱스부터 종료 인덱스의 이전 문자까지 자른다.

"종료 인덱스 - 시작 인덱스" 의 길이만큼 자른다고 생각하자!

substr과 마찬가지로 종료인덱스를 지정해주지 않으면 끝까지 자른다.


**다만, 인자로 음수(-) 값이 들어올 경우 !**

**1.** 시작 인덱스에 음수(-) 값이 들어올 경우
​
-   0으로 치환된다.


**2.** 종료 인덱스에 음수(-) 값이나  '0' 값이 들어올 경우
-    시작인덱스와 위치가 바뀐고, '0' 으로 치환된다.
​
```
let str = '자바스크립트';
​
let result1 = str.substring(-3, 5); // 결과 : "자바스크립"
// str.substring(0, 5)
​
let result2 = str.substring(2, -1); // 결과 : "자바"
// str.substring(0, 2)
```
​

---
​

**3. str.slice(beginIndex\[, endIndex\])**
​
> slice(시작인덱스, 종료인덱스)  또는  slice(시작인덱스)  

```
let str = '자바스크립트';
​
let result1 = str.slice(0, 2);  // 결과 : "자바"
​
let result2 = str.slice(2, 6);  // 결과 : "스크립트"
​
let result3 = str.slice(2);     // 결과 : "스크립트"
​
let result4 = str.slice(-4);    // 결과 : "스크립트"
​
let result5 = str.slice(-4, 5); // 결과 : "스크립"
​
let result6 = str.slice(2, -1); // 결과 : "스크립"
​
let result7 = str.slice(-4, 2)  // 결과 : ""
// (-4 : 스, 2 : 스) 이여서 ""임
​
let result8 = str.slice(-4, -2) // 결과 : "스크"
```
​
| 0 | 1 | 2 | 3 | 4 | 5 |
| --- | --- | --- | --- | --- | --- |
| 자 | 바 | 스 | 크 | 립 | 트 |
| \-6 | \-5 | \-4 | \-3 | \-2 | \-1 |
​

사용법은 substring 와 똑같다.  
다른 점은, 음수(-)를 자유롭게 사용할 수 있어서 뒤에서부터 문자열을 자를 때 유용하게 사용할 수 있다.  
substring은 음수가 들어올 경우 0으로 치환하지만, slice는 뒤에서 부터 인덱스를 계산한다.