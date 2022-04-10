---
layout: page
title: this
parent: 자바스크립트
nav_order: 3
has_children: false
permalink: /js/this/
---

# **함수 스코프와 this 키워드의 이해**

### **스코프**

: 변수의 스코프는 변수가 접근할 수 있는 위치를 제어한다.


**전역 스코프** : 코드의 어느 곳에서든 접근 가능  
**블록 스코프** : 변수가 선언된 블록 내부에서만 접근할 수 있음

\* 블록 : 함수, 루프, 중괄호로 구분되는 영역

#### **var**

블록 스코프를 가지지 않는다. 따라서, 블록 외부에서도 접근할 수 있다.

#### **let, const**

블록 스코프 외부에서 해당 변수에 접근할 수 없다. 해당 변수가 선언된 위치에 해당하는 블록 스코프 내에서만 접근이 가능하다.

#### **this 키워드**

```
const myCar = {
    color: 'red',
    logColor: function(){
        console.log(this.color);
    }
}

// 1번
const unboundGetColor = myCar.logColor;
console.log("1", unboundGetColor());

// 2번
const boundGetColor = unboundGetColor.bind(myCar);
console.log("3", boundGetColor());
```

1번은 전역으로 호출되기 때문에 전역 범위의 this가 호출된다.

따라서, 그 값은 Window 객체가 되고, 이 객체에는 color가 없으므로 결과는 undefined가 된다.

---

### **1\. .bind()**

2번은 this의 값을 수동으로 설정하고자 .bind() 를 사용했다.

.bind()를 사용하면 boundGetColor의 this 키워드가 괄호 안의 객체인 myCar를 참조함을 알 수 있다.

### **2\. .call()**

: 인수의 목록을 받는다.

```
function Car(maker, color){
    this.carMaker = maker;
    this.carColor = color;
}

function MyCar(maker, color){
    Car.call(this, maker, color);
    this.age = 5;
}

const myNewCar = new MyCar('bmw', 'red');
console.log(myNewCar.carMaker); // bmw
console.log(myNewCar.carColor); // red
```

.call() 에 MyCar 객체를 전달하여 this.carMaker가 MyCar의 인수로 전달한 maker가 되도록 했다.

### **3\. .apply()**

: 하나의 인수 배열을 받는다.

```
function Car(maker, color){
    this.carMaker = maker;
    this.carColor = color;
}

function MyCar(maker, color){
    Car.apply(this, [maker, color]);
    this.age = 5;
}

const myNewCar = new MyCar('bmw', 'red');
console.log(myNewCar.carMaker); // bmw
console.log(myNewCar.carColor); // red
```

.apply() 는 인수 목록이 담긴 배열을 인수로 받는다.