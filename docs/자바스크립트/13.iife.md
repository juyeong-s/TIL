---
layout: page
title: IIFE(즉시실행함수)
parent: 자바스크립트
nav_order: 13
has_children: false
permalink: /js/iife/
---

# IIFE(즉시실행함수)

"이피"라고도 읽는 이 함수는 "Immediately Invoked Function Expression"의 줄임말로,
정의되자마자 즉시 실행되는 함수 표현식을 말한다. -> 전역변수 사용을 억제하기 위해 사용한다.

> 전역 스코프에 불필요한 변수를 추가해서 오염시키는 것을 방지할 수 있을 뿐 아니라 IIFE 내부안으로 다른 변수들이 접근하는 것을 막을 수 있는 방법이다.
> -MDN

`IIFE`의 기본 문법은 다음과 같다. 화살표 함수로도 만들 수 있다.

```
(function () {
    //do something
})();

(() => {
  //do something
})();
```

함수 정의와 동시에 호출되는 즉시 실행 함수는 단 한번만 호출된다. 모든 코드를 즉시 실행 함수로 감싸면 모든 변수는 즉시 실행 함수의 지역변수가 된다.

```
(function () {
   let foo = 10;    // 즉시 실행 함수의 지역변수
})();

console.log(foo);   // ReferenceError: foo is not defined
```

예시를 통해 더 알아보자.

```
// 일반 함수 선언식
function game() {
  let score = Math.random() * 10;
  console.log(score >= 5);
}
game();
```

위 일반함수를 IIFE로 재구성하면 다음과 같다.

```
// IIFE(익명 함수)
(function () {
  let score = Math.random() * 10;
  console.log(score >= 5);
})();
```

`IIFE`는 전체 익명함수를 괄호로 감싸줌으로써 내부 코드가 선언문이 아니라 표현식인 것처럼 Parser를 속인다.

## IIFE의 목적

외부에서 접근할 수 없는 자체 scope를 형성한다. 자바스크립트에서 변수의 scope가 함수에 의해 정해지기 때문에 `IIFE` 함수는 상위 scope에 접근할 수 있으면서도, 내부 변수를 외부로부터 보호해 privacy를 유지할 수 있다.  
따라서, `IIFE` 사용의 가장 큰 목적은 **데이터 프라이버시**와 **코드 모듈화**라고 할 수 있다.

## IIFE의 구조

IIFE의 구조는 다음과 같이 두개의 괄호()로 나눌 수 있다.

- **첫번째**, 괄호()로 둘러쌓인 익명함수
- **두번째**, 생성된 함수를 즉시 실행시키는 괄호()

```
// 첫번째 괄호 - 익명함수 정의
(function () {
  var score = Math.random() * 10;
  console.log(score >= 5);
})
// 두번째 괄호 - 함수 즉시실행
();
```

필요하다면 아래와 같이 IIFE에도 인자를 줄 수 있다.

```
(function (target) {
  var score = Math.random() * 10;
  console.log(score >= 5 - target);
})(2);
```
