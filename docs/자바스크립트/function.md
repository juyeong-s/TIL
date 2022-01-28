---
layout: page
title: 함수
parent: 자바스크립트
nav_order: 7
has_children: false
permalink: /js/function/
---

# **함수**

### **함수정의**

```
function greet(name){
	console.log(name);
}
greet("Alberto");
```

여기서, 인자에 원시 자료형이 전달될 경우 해당 값에 대한 변경 사항이 전역적으로 반영되지 않는다.

하지만, 객체나 배열을 전달할 경우는 참조 형태로 전달되기 때문에 원본 객체나 배열에 변경 사항이 반영된다.

### **함수 표현식**

```
const greeter = function greet(name){
	console.log(name);
}
greeter("Alberto");
```

greeter라는 const에 greet 함수를 할당했다.

### **익명 함수**

이 함수 표현식을 사용하여 다음과 같이 **익명 함수**를 만들 수 있다.

```
const greeter = function(name) {
	console.log(name);
}
greeter("Alberto");
```

### **화살표 함수**

ES6에서 도입된 화살표 함수를 사용하여 다음과 같이 만들 수 있다.

```
const greeter = (name) => {
	console.log(name);
}
greeter("Alberto");
```

화살표 함수의 특징은 나중에 다시 살펴보장