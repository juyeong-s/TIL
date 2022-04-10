---
layout: page
title: charAt함수 vs 대괄호 참조 (특정 위치 문자 찾기)
parent: 자바스크립트
nav_order: 15
has_children: false
permalink: /js/charAt/
---

# 특정 인덱스 위치의 문자를 찾는 2가지 방법

## 1\. charAt() 함수

> str.charAt(index)

- charAt 함수는 주어진 문자열(str)의 index 위치의 문자를 읽어서 리턴한다.

### 매개변수  
- `0`과 `str.length - 1` 사이의 정수값.
- 인자를 생략하면 기본값으로 0를 설정된다.

### 반환 값  
- 지정된 인덱스에 해당하는 단일문자를 반환한다.
- 만약 index가 문자열 길이보다 큰 경우 빈 문자열 ''을 반환한다.

```
const str = 'abcde';

console.log(str.charAt());  // a
console.log(str.charAt(0)); // a
console.log(str.charAt(9999));  // ''(빈문자열, 아무것도 없음)
```

## 2\. 대괄호 인덱스 활용 (문자열[index])

배열의 index를 접근하듯이 대괄호([])와 index를 활용하여 특정 문자열을 읽을 수 있다.

```
const str = 'abcde';
console.log(str[0]);    // a
console.log(str[9999]); // undefined
```

# charAt()함수와 문자열[index]의 차이점

```
const str = 'abcde';

console.log(str.charAt(9999));  // ''
console.log(str[9999]); // undefined
```

- **charAt(index) 함수**와 **문자열[index]** 구문의 가장 큰 차이점은, index값으로 범위를 벗어나는 값이 입력되었을 경우이다.  
- index로 범위를 벗어나는 값이 입력될 경우,
    - **charAt(index) 함수**: `빈 문자열('')`을 리턴
    - **문자열[index]**: `undefined`를 리턴

---  

이 문제를 풀다가 알아낸 사실이다. 쉬운 문젠데 자꾸 undefined가 떠서 엄청 애먹은 문제였다 ㅎㅎ..  
- [JadenCase 문자열 만들기](https://programmers.co.kr/learn/courses/30/lessons/12951#)