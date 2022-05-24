---
layout: page
title: 유틸리티 타입
parent: 타입스크립트
nav_order: 5
has_children: false
permalink: /ts/utility/
---

# 유틸리티 타입 - Partial, Pick, Omit

유틸리티 타입이란 이미 정의해놓은 타입을 변환할 때 사용하기 좋은 제네릭 인터페이스이다. 훨씬 간결한 문법으로 타입을 정의할 수 있다.

## Partial<T>

제네릭 `T`의 모든 프로퍼티를 선택적으로 만드는 타입을 구성한다.

![image](https://user-images.githubusercontent.com/63364990/170054648-3c0affad-76ea-4b82-93d6-7036f2f8cb21.png)

위와 같이 기존의 인터페이스에 `?`키워드가 붙은 것처럼 타입을 구성하게 된다.

## Pick<T,K>

제네릭 `T`에서 몇개의 속성을 골라(`K`) 타입을 정의한다. 이때 `K`는 필수 속성이다.

![image](https://user-images.githubusercontent.com/63364990/170054229-e6c22154-ae24-4fb9-a3dd-e69401d74fc7.png)

## Omit<T,K>

제네릭 T에서 K의 집합을 제외하고 나머지 속성을 필수 타입으로 지정한다. 사실상 Pick과 반대되는 개념이다.

![image](https://user-images.githubusercontent.com/63364990/170053945-808a37a3-2b35-43f2-868f-58b0a540a88e.png)
