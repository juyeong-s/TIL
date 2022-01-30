---
layout: page
title: 자료형
parent: 자바스크립트
nav_order: 4
has_children: false
permalink: /js/data_type/
---

# 자료형
​
자바스크립트는 동적 타입 언어이다. 즉, 정적 언어와 달리 변수를 정의할 때 자료형을 정의할 필요가 없다.  
변수의 타입 지정없이 값이 할당되는 과정에서 자동으로 변수의 타입이 결정(타입 추론)된다.  
즉, 변수는 고정된 타입이 없다. 따라서, 같은 변수에 여러 타입의 값을 자유롭게 할당할 수 있다.  
처음에는 편해보이지만, 대규모 프로젝트에서는 문제의 원인이 될 수 있다.  
여기서, **타입스크립트**가 _자바스크립트를 엄격한 자료형을 준수하는 강타입 언어로 탈바꿈 시킨 언어_ 이다.  
- 타입스크립트에 관해서는 [여기서]() 살펴보면된다.

자바스크립트에는 어떤 데이터 타입이 있는지 알아보자!  
## 데이터 타입  

자바스크립트에는 총 7개의 데이터 타입이 있다.  
6개는 원시 자료형, 1개는 객체다.  
- 원시 타입
    - boolean : 불리언
    - null : 널(값이 없음)
    - undefined : 정의되지않은 값
    - number : 숫자
    - string : 문자열
    - symbol (ES6에서 추가) : 고유하고 변경할 수 없는 값
- 객체 타입
    - object

​
### 1. **원시 타입**
​
: 원시 타입의 값은 변경 불가능한 값이며, `pass-by-value(값에 의한 전달)`이다.  
#### 1.1 number
: C나 Java는 정수와 실수를 구분하여 int, long, float, double 등 다양한 숫자 타입이 존재하지만, 자바스크립트는 하나의 숫자 타입만 존재한다.  
숫자 타입의 값은 배정밀도 64비트 부동소수점 형(-(253 -1) 와 253 -1 사이의 숫자값)을 따른다.  
- 모든 수를 `실수`로 처리한다. -> 정수로 표시되는 수 끼리 나누더라도 실수가 나올 수 있다.
- 2진수, 8진수, 16진수 데이터 타입을 제공하지 않기 때문에 이들 값을 참조하면 모두 10진수로 해석된다.  

```
let binary = 0b01000001; // 2진수
let octal = 0o101;       // 8진수
let hex = 0x41;          // 16진수

console.log(binary); // 65
console.log(octal);  // 65
console.log(hex);    // 65

// 표기법만 다를뿐 같은 값이다.
console.log(binary === octal); // true
console.log(octal === hex);    // true
```  

추가적으로 3가지 특별한 값들도 표현할 수 있다.

- Infinity : 양의 무한대
- -Infinity : 음의 무한대
- NaN : 산술 연산 불가(not-a-number)  
```
let pInf = 10 / 0;  // 양의 무한대
console.log(pInf);  // Infinity

let nInf = 10 / -0; // 음의 무한대
console.log(nInf);  // -Infinity

let nan = 1 * 'string'; // 산술 연산 불가
console.log(nan);       // NaN
```

#### 1.2 string
: 문자열(String) 타입은 텍스트 데이터를 나타내는데 사용한다.  
문자열은 작은 따옴표(‘’) 또는 큰 따옴표(“”) 안에 텍스트를 넣어 생성한다. 가장 일반적인 표기법은 작은 따옴표를 사용하는 것이다.  
```
let str = "string"; // 큰 따옴표
str = 'string';     // 작은 따옴표
str = `string`;     // 백틱(ES6 템플릿 리터럴)
```

자바스크립트의 문자열은 원시 타입이며 변경 불가능하다. 즉, 한 번 문자열이 생성되면, 그 문자열을 변경할 수 없다.  
```
let str = 'Hello';
str = 'world';
```  
첫번째 구문이 실행되면 메모리에 문자열 ‘Hello’가 생성되고 식별자 str은 문자열 ‘Hello’의 메모리 주소를 가리킨다. 
그리고 두번째 구문이 실행되면 이전에 생성된 문자열 ‘Hello’을 수정하는 것이 아니라 새로운 문자열 ‘world’를 메모리에 생성하고 식별자 str은 이것을 가리키게 된다. 이때 문자열 ‘Hello’와 ‘world’는 모두 메모리에 존재하고 있다. 변수 str은 문자열 ‘Hello’를 가리키고 있다가 문자열 ‘world’를 가리키도록 변경되었을 뿐이다.  

문자열은 배열처럼 인덱스를 통해 접근할 수 있다. 이와 같은 특성을 갖는 데이터를 유사 배열이라 한다.  
```
let str = 'string'; // 문자열은 유사배열이다.
for (var i = 0; i < str.length; i++) {
  console.log(str[i]);
}

// 문자열을 변경할 수 없다.
str[0] = 'E';
console.log(str);   // string
```

`str[0] = 'E'`처럼 이미 생성된 문자열의 일부 문자를 변경해도 반영되지 않는다(이때 에러가 발생하지 않는다).  
한번 생성된 문자열은 read only로서 변경할 수 없다.  
그러나 새로운 문자열을 재할당하는 것은 물론 가능하다.  
```  
let str = 'string';
str = 'Etring';
console.log(str);   // Etring

str += 'test';
console.log(str);   // Etringtest
```  
#### 1.3 boolean
: 불리언(boolean) 타입의 값은 논리적 참, 거짓을 나타내는 true와 false 뿐이다.  
```
let foo = true;
let bar = false;

// typeof 연산자는 타입을 나타내는 문자열을 반환한다.
console.log(typeof foo);    // boolean
console.log(typeof bar);    // boolean
```  
다음 4가지는 false로 간주된다.  
- 비어있는 문자열
- null
- undefined
- 숫자 0

#### 1.4 undefined
: undefined 타입의 값은 undefined로 유일하다.  
선언 이후 값을 할당하지 않은 변수는 undefined 값을 가진다.  
```
let foo;
console.log(foo);   // undefined
```

변수의 값이 없다는 것을 명시하고 싶은 경우는 undefined가 아니라 null을 할당하는 것이 좋다.  

#### 1.5 null
: null 타입의 값은 null이 유일하다.  
타입을 나타내는 typeof 연산자로 null 값을 출력해보면 null이 아닌 object가 나온다. 이는 자바스크립트의 설계상의 오류라고 한다.  
따라서 null 타입을 확인할 때 typeof 연산자를 사용하면 안되고 일치 연산자(===)를 사용해야 한다.  
```
let foo = null;
console.log(foo === null);  // true
```

#### 1.6 symbol
: 심볼은 주로 이름의 충돌 위험이 없는 유일한 객체의 프로퍼티 키(property key)를 만들기 위해 사용한다.  
볼은 Symbol 함수를 호출해 생성한다. 이때 생성된 심볼 값은 다른 심볼 값들과 다른 유일한 심볼 값이다.  
```
let key = Symbol('a');
console.log(typeof key); // symbol

let obj = {};
obj[key] = 'value';
console.log(obj[key]); // value
```

### 2. 객체 타입
자바스크립트는 `객체(object) 기반의 스크립트 언어`로서 자바스크립트를 이루고 있는 거의 “모든 것”이 객체이다.  
`원시 타입`을 제외한 나머지 값들(`배열, 함수, 정규표현식` 등)은 모두 `객체`이다. 또한 객체는 pass-by-reference(참조에 의한 전달) 방식으로 전달된다.  
