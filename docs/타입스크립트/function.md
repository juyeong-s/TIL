---
layout: page
title: 타입스크립트에서의 함수
parent: 타입스크립트
nav_order: 3
has_children: false
permalink: /ts/function/
---

# 1\. 타입스크립트에서의 함수

- 웹 애플리케이션을 구현할 때 자주 사용되는 함수는 타입스크립트로 크게 다음 3가지 타입을 정의할 수 있다.
  - 함수의 파라미터(매개변수) 타입
  - 함수의 반환 타입
  - 함수의 구조 타입

# 2\. 함수의 기본적인 타입 선언

- 타입스크립트의 함수 선언 방법을 이해하기 위해 먼저 간단한 자바스크립트 함수를 보자.

```
function sum(a, b) {
  return a + b;
}
```

위 자바스크립트 함수에 타입을 부여하면 아래와 같다.

```
function sum(a: number, b: number): number {
  return a + b;
}
```

- 기존 자바스크립트 함수의 선언 방식에서 **매개변수**와 함수의 **반환 값**에 타입을 추가했다.  
  만약, 함수의 반환 값에 타입을 정하지 않을 때는 void라도 사용해야 한다.

## 2.1\. 함수의 인자

타입스크립트에서는 함수의 인자를 모두 필수(required) 값으로 간주한다. 따라서, 함수의 매개변수를 설정하면 `undefined`나 `null`이라도 넘겨야 한다. 또한, 정의된 매개변수 값만을 받을 수 있추가로 인자를 받을 수 없다.

![image](https://user-images.githubusercontent.com/63364990/171355314-eb4f5579-ece8-41ac-bb1f-e09af74b187a.png)

타입스크립트의 함수는 위와 같이 정의된 매개변수의 갯수만큼 인자를 넘기지 않아도 되는 자바스크립트의 특성과 반대된다. 만약 이러한 특성을 사용하고 싶다면 `?`를 이용해서 아래와 같이 정의할 수 있다.  
매개변수 `b`를 `optional`값으로 정의해주었다.

![image](https://user-images.githubusercontent.com/63364990/171355775-e18cad30-9760-4c76-b505-40747718c850.png)

### 2.1.1\. 매개변수 초기화

매개변수 초기화 방법은 ES6문법과 동일하다.  
![image](https://user-images.githubusercontent.com/63364990/171356644-2e836491-1c2f-40b8-969b-26f1ac2e530e.png)

### 2.1.2\. REST문법이 적용된 매개변수

ES6문법에서 지원하는 Rest문법은 타입스크립트에서 다음과 같이 사용할 수 있다.

![image](https://user-images.githubusercontent.com/63364990/171358931-5cd09b4c-d37a-41d9-9b82-d15b013047ad.png)
