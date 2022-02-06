---
layout: page
title: 배열
parent: 자바스크립트
nav_order: 9
has_children: false
permalink: /js/array/
---

# **배열**

: 순서대로 값을 저장하는 객체, 원시 자료형이 아닌 **객체** !!

항목으로만 이루어진 목록만 저장할 때는 객체를 만들 필요 없이 배열을 사용하면 된다.

```
const fruit = ['apple', 'banana', 'orange'];
```

배열의 각 항목에 접근할 때는 인덱스를 사용하면 된다.

```
fruit[0]
fruit[1]
```

배열에 대해 호출할 수 있는 메소드가 있다. 몇 가지만 일단 살펴보자.

```
const fruit = ['apple', 'banana', 'orange'];

// 배열의 끝에 새 값을 추가
fruit.push('pear');

// 배열의 시작에 새 값을 추가
fruit.unshift('melon');

// 배열의 끝에서 값 하나 제거
fruit.pop();

// 배열의 시작에서 값 하나 제거
fruit.shift();
```


**typeof로 자료형 확인하기**

```
const str = "hello";
typeof(str);	// string

typeof(null);	// object
```

아래 null의 자료형은 object로 나온다. 자바스크립트의 첫 번째 구현에서 발생하누 버그라고 한다.

---
