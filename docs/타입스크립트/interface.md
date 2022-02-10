---
layout: page
title: 인터페이스
parent: 타입스크립트
nav_order: 4
has_children: false
permalink: /ts/interface/
---

# 인터페이스  
인터페이스는 일반적으로 타입 체크를 위해 사용되며 변수, 함수, 클래스에 사용할 수 있다.  
인터페이스는 여러가지 타입을 갖는 프로퍼티로 이루어진 새로운 타입을 정의하는 것과 유사하다.  
인터페이스는 프로퍼티와 메소드를 가질 수 있다는 점에서 클래스와 유사하지만,  
- 직접 인스턴스를 생성할 수 없고
- 모든 메소드는 추상 메소드이다.  
단, 추상 클래스의 추상 메소드와 달리 abstract 키워드를 사용하지 않는다.  

## 1\. 변수와 인터페이스  
인터페이스는 변수의 타입으로 사용할 수 있다. 이때 인터페이스 타입으로 선언된 변수는 해당 인터페이스를 준수해야 한다. 무슨 말이냐면, 아래 예시를 보자!  

```
// 인터페이스의 정의
interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

// 변수 todo를 Todo 인터페이스 타입으로 선언
let todo: Todo;

// 변수 todo는 Todo 인터페이스를 준수해야 함
todo = { id: 1, content: 'typescript', completed: false };
```

함수의 파라미터의 타입으로 인터페이스를 사용하여 선언할 수 있다. 함수에 객체를 전달할 때 복잡한 매개변수 체크가 필요없어서 매우 유용하다.  

```
// 인터페이스의 정의
interface Todo {
  id: number;
  content: string;
  completed: boolean;
}

let todos: Todo[] = [];

// Todo 인터페이스로 파라미터 todo의 타입을 선언했다.
function addTodo(todo: Todo) {
  todos = [...todos, todo];
}

// 파라미터 todo는 Todo 인터페이스를 준수해야 한다.
const newTodo: Todo = { id: 1, content: 'typescript', completed: false };
addTodo(newTodo);
```  

## 2\. 함수와 인터페이스  
인터페이스는 함수의 타입으로 사용할 수 있다. 이때 함수의 인터페이스에는 타입이 선언된 파라미터와 리턴 타입을 정의한다.  

```
// 함수 인터페이스의 정의
interface SquareFunc {
  (num: number): number;    // (파라미터): 리턴타입;
}

const squareFunc: SquareFunc = function (num: number) {
  return num * num;
}

console.log(squareFunc(10)); // 100
```

## 3\. 클래스와 인터페이스  
클래스 선언문의 implements 뒤에 인터페이스를 선언하면 해당 클래스는 지정된 인터페이스를 반드시 구현해야 한다.  

```
// 인터페이스의 정의
interface ITodo {
  id: number;
  content: string;
  completed: boolean;
}

// Todo 클래스는 ITodo 인터페이스를 구현해야 한다.
class Todo implements ITodo {
  constructor (
    public id: number,
    public content: string,
    public completed: boolean
  ) { }
}

const todo = new Todo(1, 'Typescript', false);
```  

- 인터페이스는 프로퍼티뿐만 아니라 메소드도 포함할 수 있다.
    - 단, 모든 메소드는 추상 메소드여야 한다.
- 인터페이스를 구현하는 클래스는 인터페이스에서 정의한 프로퍼티와 추상 메소드를 반드시 구현해야 한다.  

```
// 인터페이스의 정의
interface IPerson {
  name: string;
  sayHello(): void;
}

class Person implements IPerson {
  // 인터페이스에서 정의한 프로퍼티 구현
  constructor(public name: string) {}

  // 인터페이스에서 정의한 추상 메소드 구현
  sayHello() {
    console.log(`Hello ${this.name}`);
  }
}

function greeter(person: IPerson): void {
  person.sayHello();
}

const me = new Person('Lee');
greeter(me); // Hello Lee
```

