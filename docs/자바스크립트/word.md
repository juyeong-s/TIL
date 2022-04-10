---
layout: page
title: 자바스크립트 관련 단어 정리
parent: 자바스크립트
nav_order: 1
has_children: false
permalink: /js/word/
---

# 자바스크립트 관련 단어 정리  

## 일급 객체(1급객체, First Class Object)  
다른 객체들에 일반적으로 적용 가능한 연산을 모두 지원하는 객체를 가리킨다.

일급 객체의 조건  
- 변수에 할당(assignment)할 수 있다.  
```
const a = function(...) {
    ...
}
```  
- 다른 함수를 인자(argument)로 전달 받는다.  
```
function b(num) {
    return num * num;
}

const a = function(fn, num) {
    return fn(num);
}

const result = a(b, 3);
```  
- 다른 함수의 결과로서 리턴될 수 있다.  
```
function add(num1) {
    return function(num2) {
        return num1 + num2;
    }
}

add(3)(4);  // 7
```

=> 함수를 데이터(string, number, boolean, array, object) 다루 듯이 다룰 수 있다는 점.

