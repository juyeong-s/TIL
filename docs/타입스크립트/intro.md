---
layout: page
title: 타입스크립트 소개와 개발환경 구축
parent: 타입스크립트
nav_order: 1
has_children: false
permalink: /ts/intro/
---

# 1\. 타입스크립트(ts)란?

타입스크립트를 사용 중인 분들이라면, "타입스크립트는 자바스크립트의 상위집합이다." 또는 "타입스크립트는 타입이 정의된 자바스크립트의 상위집합이다."라는 말을 한 번쯤 들어봤을 것이다. 그렇다면 타입스크립트와 자바스크립트와의 관계를 자세히 알아보자.  
타입스크립트는 자바스크립트를 기반으로한 정적 타입의 언어이다. 한마디로 자바스크립트에 타입을 부여한 언어다.  
자바스크립트는 아래와 같은 특징을 가지고 있으므로

- Prototype-based Object Oriented Language
- Scope와 this
- 동적 타입(dynamic typed) 언어 혹은 느슨한 타입(loosely typed) 언어

코드가 복잡해질 수 있고 디버그와 테스트 공수가 증가하는 등의 문제를 일으킬 수 있어 대규모 프로젝트에서는 주의하여야 한다.

이처럼 자바스크립트의 문제점을 극복하기 위한 언어가 타입스크립트이다.  
타입스크립트는 자바스크립트의 슈퍼셋(상위확장)이다. 따라서, 기존의 자바스크립트 문법을 그대로 사용할 수 있다.

자바스크립트 프로그램에 문법 오류가 없다면, 유효한 타입스크립트 프로그램이라고 할 수 있다.

자바스크립트는 파일이 .js (또는 .jsx) 확장자를 사용하는 반면, 타입스크립트는 .ts (또는 .tsx) 확장자를 사용한다. 타입스크립트는 자바스크립트의 상위 집합이기 때문에 .js파일에 있는 코드는 이미 타입스크립트라고 할 수 있다. main.js 파일명을 main.ts로 바꾼다고 해도 달라지는 것은 없다. 이러한 특성은 기존에 존재하는 자바스크립트 코드를 타입스크립트로 마이그레이션(migration)하는 데 엄청난 이점이 된다.

# 2\. 타입스크립트의 장점

## 2.1\. 정적 타입

타입스크립트를 사용하는 가장 큰 이유 중 하나는 정적 타입을 지원한다는 것이다. 아래 함수를 보면,

```
// js
function sum(a, b) {
  return a + b;
}
```

2개의 숫자 타입 인수를 전달받아 그 합계를 반환하려는 함수이다. 하지만 코드 상으로는 어떤 타입의 인수를 전달해야 하는지, 어떤 타입의 반환값을 리턴해야 하는지 명확하지 않다. 따라서, 위 함수는 아래와 같이 호출할 수 있다.

```
// js
function sum(a, b) {
  return a + b;
}

sum('x', 'y'); // 'xy'
```

위 코드는 자바스크립트이다. 자바스크립트의 동적 타이핑(Dynamic Typing)에 의해 변수가 반환값의 타입을 사전에 지정하지 않아도 아무런 문제없이 작동된다.

위 함수를 타입스크립트의 정적 타입을 사용해서 작성해보자.

```
// ts
function sum(a: number, b: number) {
  return a + b;
}

sum('x', 'y');
// error TS2345: Argument of type '"x"' is not assignable to parameter of type 'number'.
```

타입스크립트는 정적 타입을 지원하므로 컴파일 단계에서 오류를 포착할 수 있는 장점이 있다. 이는 코드의 가독성을 높이고 예측할 수 있게 하며 디버깅을 쉽게 한다.

- 위와 같이 인자에 `:number`로 숫자 타입이라는 것을 명시해줬다.

# 3\. 개발환경 구축

타입스크립트는 `.ts` 확장자를 갖는다.  
타입스크립트 파일(.ts)은 브라우저에서 동작하지 않으므로 타입스크립트 컴파일러를 이용해 자바스크립트 파일로 변경해야 한다. 이를 컴파일 또는 `트랜스파일링` 이라고 한다.

## 3.1\. Node.js 설치

- [Installing Node.js](https://nodejs.org/en/)
- `macOS`의 경우 `brew install node`와 `brew install typescript`로 한번에 설치할 수 있다.

## 3.2\. 타입스크립트 컴파일러 설치 및 사용법

Node.js를 설치하면 `npm`도 같이 설치된다. 아래와 같이 터미널에 npm으로 타입스크립트를 전역에 설치하자.

```
$ npm install -g typescript
```

설치가 완료되었으면 버전을 출력하여 설치가 완료되었는지 확인한다.

```
$ tsc -v
Version 4.5.5
```

트랜스파일링을 실행해보기 위해 아래와 같은 파일을 작성해보자.

```
// person.ts

class Person {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  sayHello() {
    return "Hello, " + this.name;
  }
}

const person = new Person('Lee');

console.log(person.sayHello());
```

트랜스파일링을 실행해 보자. tsc 명령어 뒤에 트랜스파일링 대상 파일명을 지정한다. 이때 확장자 .ts는 생략할 수 있다.

`$ tsc person`

트랜스파일링 실행 결과, 같은 디렉터리에 자바스크립트 파일(person.js)이 생성된다.

```
// person.js

var Person = /** @class */ (function () {
    function Person(name) {
        this.name = name;
    }
    Person.prototype.sayHello = function () {
        return "Hello, " + this.name;
    };
    return Person;
}());
var person = new Person('Lee');
console.log(person.sayHello());
```

이때 트랜스파일링된 person.js의 자바스크립트 버전은 ES3이다. 이는 TypeScript 컴파일 타겟 자바스크립트 기본 버전이 ES3이기 때문이다.

자바스크립트 버전을 변경하려면 컴파일 옵션에 --target 또는 -t를 사용한다. 현재 tsc가 지원하는 자바스크립트 버전은 ‘ES3’(default), ‘ES5’, ‘ES2015’, ‘ES2016’, ‘ES2017’, ‘ES2018’, ‘ES2019’, ‘ESNEXT’이다. 예를 들어, ES6 버전으로 트랜스파일링을 실행하려면 아래와 같이 옵션을 추가한다.

`$ tsc person -t ES2015`

```
// person.js

class Person {
    constructor(name) {
        this.name = name;
    }
    sayHello() {
        return "Hello, " + this.name;
    }
}
const person = new Person('Lee');
console.log(person.sayHello());
```

자바스크립트 파일이 생성되었으면, Node.js REPL을 이용해 트랜스파일링된 person.js를 실행해보자.

```
$ node person
Hello, Lee
```

매번 옵션을 지정하는 것은 번거로우므로 tsc 옵션 설정 파일을 생성하도록 하자.

```
$ tsc --init
message TS6071: Successfully created a tsconfig.json file.
```

아래와 같이 tsc 옵션 설정 파일인 tsconfig.json이 생성된다.

```
{
  "compilerOptions": {
    /* Basic Options */
    // "incremental": true,                   /* Enable incremental compilation */
    "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
    // "lib": [],
  }
}
```

tsc 명령어 뒤에 파일명을 지정하면 tsconfig.json이 무시되므로  
`$ tsc` 명령어만을 이용해서 트랜스파일링 해주자!  
`$ tsc person` -> tsconfig.json이 무시된다.
