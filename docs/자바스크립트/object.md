---
layout: page
title: 객체(object)
parent: 자바스크립트
nav_order: 10
has_children: false
permalink: /js/object/
---

# 1\. 객체(Object)란?

자바스크립트는 객체 기반의 스크립트 언어이다.   
자바스크립트를 이루는 거의 "모든 것"이 객체이다.  
원시 타입(Primitives)을 제외한 나머지 값들(함수, 배열, 정규표현식 등)은 모두 객체다.  

자바스크립트의 객체는 **키(key)**와 **값(value)**으로 구성된 프로퍼티(속성)들의 집합이다.  
프로퍼티의 값으로는 모든 값을 사용할 수 있다. 자바스크립트의 함수는 일급 객체(1급객체)이므로 값으로 취급할 수 있다.  

> * 일급객체 : 다른 객체들에 일반적으로 적용 가능한 연산을 모두 지원하는 객체를 가리킨다.  

**일급객체**의 조건
- 변수에 할당할 수 있다.
- 다른 함수를 인자로 전달 받는다.
- 다른 함수의 결과로서 리턴될 수 있다. 

즉, 함수를 데이터 다루듯이 다룰 수 있다.  

자바스크립트의 객체는 객체지향 상속을 구현하기 위해 `프로토타입`이라고 불리는 객체의 프로퍼티와 메소드를 상속받을 수 있다.  

## 1.1\. 프로퍼티  

프로퍼티는 키(이름)와 값으로 구성된다. 프로퍼티는 키로 유일하게 식별할 수 있다.  
프로퍼티 키의 명명 규칙과 값으로 사용할 수 있는 값은 아래와 같다.  
- 키 : 빈 문자열을 포함한 모든 문자열 or symbol 값
- 값 : 모든 값

만약 키에 문자열 이외의 값을 지정하면 암묵적 타입변환이 일어나 문자열으로 변환된다. 이미 존재하는 키를 중복 선언하면 나중에 선언한 프로퍼티가 이전 프로퍼티를 덮어쓰게 된다.  
객체는 배열과 달리 프로퍼티 열거 순서를 보장하지 않는다.  

## 1.2\. 메소드

프로퍼티의 값이 함수일 경우, 일반 함수와 구분하기 위해 메소드라고 부른다.  

# 2\. 객체 생성 방법  

자바와 같은 클래스 기반 객체 지향 언어는 클래스를 사전에 정의하고, 필요한 시점에 new 연산자를 사용하여 인스턴스를 생성하지만, 자바스크립트는 프로토타입 기반으로 클래스라는 개념이 없고 별도의 객체 생성 방법이 존재한다.  

## 2.1\. 객체 리터럴  

가장 일반적인 객체 생성 방법이다. 중괄호`{}`를 사용하여 객체를 생성하는 방법이다.  
`{}` 내에 아무것도 기술하지 않으면 빈 객체가 생성된다.  
`{}` 내에 1개 이상의 프로퍼티를 기술하면 1개의 프로퍼티가 추가된 객체가 생성된다.  

```
let object1 = {};

let object2 = {
	name: 'Shin',
	gender: 'male',
	sayHello: function() { // 익명함수
		console.log('Hello' + this.name);
	}
}
console.log(object2); // {name: "Shin", gender: "male", sayHello: ƒ}

object2.sayHello(); // Hello Shin
```  

## 2.2\. Object 생성자 함수  



## **객체의 복사**

: 객체를 복사할 때는 참조 방식이 쓰인다.

```
let car = {
	color: 'red',
};
let secondCar = car;
```

여기서 secondCar는 그 자체로 객체가 아니라 car에 대한 참조를 나타낸다.

즉, car의 주소를 저장한다.

car를 수정하면 secondCar도 수정된다. 같은 주소를 갖고 있기 때문에.

두 객체를 비교해보면, 두 객체가 동일하다는 것을 알 수 있다.

```
console.log(car == secondCar);	// true
console.log(car === secondCar);	// true
```

동일한 주소말고, 복사본을 만드는 방법 중 하나는 Object.assign()을 사용하는 방법이다.

```
const car = {
	color: 'red',
}

const secondCar = Object.assign({}, car);
```

이렇게 하면 car를 업데이트해도 secondCar에 영향을 주지 않는다.

**첫 번째 인자**는 **복사본**에 해당하는 객체이고, **두 번째 인자**는 **원본**에 해당하는 객체이다.