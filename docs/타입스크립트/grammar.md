---
layout: page
title: 타입스크립트 기초 문법
parent: 타입스크립트
nav_order: 2
has_children: false
permalink: /ts/grammer/
---

# 1\. 타입스크립트 기초 문법

##  타입 표기(Type Annotation)

타입스크립트 코드에서 어떤 변수 또는 값의 타입을 표기하기 위해 타입 표기를 사용한다. 타입 표기는 식별자 또는 값 뒤에 콜론(`:`)을 붙여 `value: type` 의 형태로 표기한다.  

```
const areYouCool: boolean = true;

const answer: number = 42;

const typescript: string = "great";

const greetings: string = `Hello, Readers! Welcome to TypeScript.`;

const hasType: Object = {
  TypeScript: true,
  JavaScript: false
};
```

# 2\. 기본 타입

## 2.1\. 불리언
- 자바스크립트의 `boolean`에 대응하는, 참 또는 거짓을 나타내는 타입이다.  
```
const isTypeScriptAwesome: boolean = true;
const doesJavaScriptHasTypes: boolean = false;
```

## 2.2\. 숫자  
- 자바스크립트 변수의 타입이 숫자이면 아래와 같이 선언한다.  
```
let num: number = 10;
```

## 2.3\. 문자열  
- 자바스크립트 변수의 타입이 문자열인 경우 아래와 같이 선언해서 사용한다.  
`let str: string = 'hi';`

## 2.4\. null / undefined  
- null 타입과 undefined 타입은 각각 null과 undefined라는 하나의 값만을 갖는다.  
이 두 값을 자기 자신의 타입과 `void` 타입 이외의 타입에 할당하려 하면 타입 에러(`TS2322: Type 'null' is not assignable to type 'number'`)가 발생한다.  
```
const nullValue: null = null;
const undefinedValue: undefined = undefined;
const numberValue: number = null; // TS2322: Type 'null' is not assignable to type 'number'
```

## 2.5\. Array  
- 타입이 배열인 경우 아래와 같이 선언한다.  
`let arr: number[] = [1,2,3];`  
또는 아래와 같이 제네릭을 사용할 수 있다.
`let arr: Array<number> = [1,2,3];`  

## 2.6\. Tuple  
- 튜플은 배열의 길이가 고정되고 각 요소의 타입이 지정되어 있는 배열 형식을 의미한다.  
`let arr: [string, number] = ['hi', 10];`  
- 만약 정의하지 않은 타입, 인덱스로 접근할 경우 오류가 발생한다.  
```
arr[1].concat('!'); // Error, 'number' does not have 'concat'
arr[5] = 'hello'; // Error, Property '5' does not exist on type '[string, number]'.
```

## 2.7\. Enum  
- 이넘은 C, Java와 같은 다른 언어에서 흔하게 쓰이는 타입으로, `특정 값(상수)들의 집합`을 의미합니다.  
```
enum Avengers { Capt, IronMan, Thor } // Avengers로 타입을 만듦
let hero: Avengers = Avengers.Capt;
```  
- 이넘은 인덱스 번호로도 접근할 수 있다.  
```
enum Avengers { Capt, IronMan, Thor }
let hero: Avengers = Avengers[0];
```  
- 만약 원한다면 이넘의 인덱스를 사용자 편의로 변경하여 사용할 수도 있다.  
```
enum Avengers { Capt = 2, IronMan, Thor }
let hero: Avengers = Avengers[2]; // Capt
let hero: Avengers = Avengers[4]; // Thor
```

# 3\. 특별한 타입
- 자바스크립트에서 직접적으로 대응되는 값은 없지만 타입스크립트가 제공하는 특수한 타입이 몇 가지 있다.  

## 3.1\. any

- `any` 타입은 모든 타입과 호환 가능하다. 단어 의미 그대로 모든 타입에 대해서 허용한다는 의미를 갖고 있다.  
즉, 모든 값의 타입을 any 로 지정할 수 있고, any 타입의 변수에는 모든 값을 할당할 수 있다.  
```
let str: any = 'hi';
let num: any = 10;
let arr: any = ['a', 2, true];
```

## 3.2\. void  
- 변수에는 undefined와 null만 할당하고, 함수에는 반환 값을 설정할 수 없는 타입이다.  

```
let unuseful: void = undefined;
function notuse(): void {
  console.log('sth');
}
```  

## 3.3\. never  
- 함수의 끝에 절대 도달하지 않는다는 의미를 지닌 타입이다.  
```
// 이 함수는 절대 함수의 끝까지 실행되지 않는다는 의미
function neverEnd(): never {
  while (true) {

  }
}
```
