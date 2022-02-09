---
layout: page
title: padStart & padEnd 함수
parent: 자바스크립트
nav_order: 7
has_children: false
permalink: /js/pad/
---

# padStart()

`padStart()` 메서드는 현재 문자열의 시작을 다른 문자열로 채워, 주어진 길이를 만족하는 새로운 문자열을 반환한다.  
대상 문자열의 시작(좌측)부터 채워진다.  

## 구문  
`str.padStart(targetLength [, padString])`  
**매개변수**  
- targetLength : 목표 문자열 길이.
    - 현재 문자열의 길이보다 작다면 채워넣지 않고 그대로 반환한다.
- padString : 현재 문자열에 채워넣을 다른 문자열. (Optional)
    - 해당 문자열까지 채워넣은 문자열(`return 값`)이 문자열의 길이를 초과하면, `padString`의 오른쪽부터 짤려 들어간다.
    - default값은 `""`

## 반환값  
목표 길이만큼 시작점부터 주어진 문자열로 채운 `String`을 반환한다.  

## 예시  
```
'abc'.padStart(10);         // "       abc"
'abc'.padStart(10, "foo");  // "foofoofabc"
'abc'.padStart(6,"123456"); // "123abc"
'abc'.padStart(8, "0");     // "00000abc"
'abc'.padStart(1);          // "abc"
```

# padEnd()

padEnd() 메서드는 현재 문자열에 다른 문자열을 채워, 주어진 길이를 만족하는 새로운 문자열을 반환한다.  
대상 문자열의 끝(우측)부터 채워진다.  

## 구문  
`str.padEnd(targetLength [, padString])`  
**매개변수**, **반환값**
- `padStart`와 같다.

## 예시  
```
'abc'.padEnd(10);          // "abc       "
'abc'.padEnd(10, "foo");   // "abcfoofoof"
'abc'.padEnd(6, "123456"); // "abc123"
'abc'.padEnd(1);           // "abc"
```

