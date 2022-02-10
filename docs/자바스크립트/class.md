---
layout: page
title: 클래스
parent: 자바스크립트
nav_order: 11
has_children: false
permalink: /js/class/
---

# 클래스  

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
    constructor (name,age, city) {
        this.name = name;
        this.age = age;
        this.city = city;
    }
    // 메서드생성
    nextYearAge() {
        return this.age + 1;
    }
}

let kim = new Person('kim', 24, 'seoul');
```

