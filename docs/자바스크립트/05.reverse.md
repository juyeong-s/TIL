---
layout: page
title: reverse()
parent: 자바스크립트
nav_order: 5
has_children: false
permalink: /js/reverse/
---

# reverse()

배열의 순서를 거꾸로 뒤집어주는 함수이다.

> array.reverse()

이 함수는 array를 거꾸로 뒤집는다. 주의할 것은 원본 배열이 바뀐다는 것이다.

```
const arr = ['Apple', 'Banana', 'Orange'];
const reverse = arr.reverse();

console.log(arr);   // Orange,Banana,Apple
console.log(reverse);   // Orange,Banana,Apple
```

## 원본 배열 유지하기

원본 배열은 그대로 유지하고 싶을 때는 원본 배열을 복사해서 사용해야 한다.

```
const reverse = [...arr].reverse();
```

-> 배열을 복사하기 위해서 spread operator(전개 연산자) 사용.