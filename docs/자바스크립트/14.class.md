---
layout: page
title: 클래스
parent: 자바스크립트
nav_order: 14
has_children: false
permalink: /js/class/
---

# 클래스

클래스를 살펴보기 전에 프로토 타입 상속을 먼저 복습해보자.

```
function Person(nane, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function() {
    console.log("Hello", this.name);
}

const alberto = new Person("Alberto", 26);
const caroline = new Person("Caroline", 26);

alberto.greet();  // Hello Alberto
caroline.greet();  // Hello Caroline
```

Person의 프로토타입에 새 메서드를 추가해서 Person 객체의 인스턴스들이 접근할 수 있도록 만들었다.

## 클래스 생성

클래스를 만드는 방법은 두가지가 있다. 클래스 선언과 클래스 표현식이다.

```
// 클래스 선언
class Person {

}
// 클래스 표현식
const person = class Person {

};
```

클래스 선언 및 표현식은 [호이스팅](https://hanamon.kr/javascript-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85%EC%9D%B4%EB%9E%80-hoisting/)되지 않는다. 클래스에 접근하기 전에 클래스를 선언하지 않으면 ReferenceError가 발생한다.

그럼 이제 첫번째 클래스를 만들어보자.

생성자 메서드를 추가한 것을 제외하면 프로토타입 방식과 큰 차이가 없다. -> 생성자는 하나만 추가해야 함.

## 생성자(Constructor)란?

Constructor(생성자)를 이용하면 class 객체의 초기 값을 설정해 줄 수 있다. 인스턴스 객체를 초기화할 때 수행할 초기화 코드를 정의할 수 있다.  
class 내부에서 Constructor는 한 개만 존재할 수 있으며, 2번 이상 사용 시 Syntax Error가 발생할 수 있다.

### 구문

```
constructor(argument0, argument1, ... , argumentN) { ... }
```

```
class Person {
    constructor (name, age, city) {
        this.name = name;
        this.age = age;
        this.city = city;
    }
}

let kim = new Person('kim', 24, 'seoul');
```

- Constructor는 새로운 클래스를 생성할 때 가장 처음 실행되면서 초기값을 설정해준다.
- 클래스에 생성자를 정의하지 않으면 기본 생성자(빈 메서드)를 사용한다.

```
constructor() {}
```

- 다른 클래스를 상속하는 경우, 기본 생성자는 자신의 매개변수를 부모 클래스의 생성자로 전달한다.

```
constructor(...args) {
  super(...args);
}
```

## 메서드 (method)

```
class Person {
    constructor (name, age) {
        this.name = name;
        this.age = age;
    }
    // 메서드생성
    greet() {
        console.log(`Hi ${this.name}, ${this.age}`);
    }
    farewell() {
        console.log("goodbye");
    }
}

let kim = new Person('kim', 24, 'seoul');
```

### 정적 메서드

앞의 예시에서 추가한 `greet()`와 `farewell()` 메서드는 Person 클래스의 모든 인스턴스에서 접근할 수 있지만, Array.of() 처럼 클래스의 인스턴스가 아닌 클래스 자체에서 접근할 수 있는 정적 메서드는 다음과 같이 정의할 수 있다.

```
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    static info() {
        console.log("Hello");
    }
}

const alberto = new Person("Alberto", 26);

alberto.info();  // TypeError
Person.info();  // Hello
```

### set와 get

세터 및 게터 메서드를 사용하여 클래스 내에 값을 설정하거나 가져올 수 있다.

```
class Person {
    constructor(name, surname) {
        this.name = name;
        this.surname = surname;
        this.nickname = "";
    }
    set nicknames(value) {
        this.nickname = value;
    }
    get nicknames() {
        console.log(`Your nickname is ${this.nickname}`);
    }
}

const alberto = new Person("Alberto", "Montalesi");

// 세터 호출
alberto.nicknames = "Albi";

// 게터 호출
alberto.nicknames;  // Your nickname is Albi
```

## 클래스 상속

기존 클래스로부터 상속된 새로운 클래스를 만들려면 `extends` 키워드를 사용한다.

```
// 기존 클래스
class Person {
    constructor (name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        console.log(`Hi ${this.name}, ${this.age}`);
    }
    farewell() {
        console.log("goodbye");
    }
}

// 상속을 통해 만든 새 클래스
class Adult extends Person {
    constructor(name, age, work) {
        this.name = name;
        this.age = age;
        this.work = work;
    }
}

const alberto = new Adult("Alberto", 26, "software"); // ReferenceError: must call super constructor before using |this| in Adult class constructor
```

Person을 상속하는 Adult 클래스를 만들었지만 이 코드를 실행하면 오류가 발생한다.

새로운 클래스에서 this를 사용하기 전에 super()를 호출하라는 오류다. 즉, Adult를 만들기에 앞서 Person을 만들어야 한다는 것이다. 생성자 내부에서 super()를 호출하면 Person이 만들어진다.

```
class Adult extends Person {
    constructor(name, age, work) {
        super(name, age);
        this.work = work;
    }
}
```

여기서 왜 super(name, age) 형태로 호출했을까? Adult 클래스는 Person으로부터 이름과 나이를 상속받기 때문에 Person을 다시 선언하고 초기화할 필요가 없다. super() 생성자가 하는 일이 바로 이것이다.
