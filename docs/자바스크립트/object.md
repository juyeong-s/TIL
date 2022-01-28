---
layout: page
title: 객체
parent: 자바스크립트
nav_order: 5
has_children: false
permalink: /js/object/
---

# **객체**

: 여러 속성의 모음을 저장하는 데 사용할 수 있다.


예시) 차의 속성을 저장하는 데 사용하는 객체

```
const car = {
	wheels : 4,
	color: "red",
};
```

wheels, color 는 **key**, 4, "red"는 **값**이 된다.

키의 자료형은 string이다.

값의 자료형은 모든 될 수 있다. 함수도 가능하다.

```
const car = {
	wheels : 4,
	color: "red",
    	drive : function(){
    		console.log("wroom")
    	},
};
```

객체 car에서 drive함수를 호출할 수 있다.

```
console.log(Object.keys(car)[0]);		// wheels
console.log(typeof Object.keys(car)[0]);	// string
car.drive();	// wroom
```

---

## **빈 객체 생성하기**

: 빈 객체를 만드는 방법은 두 가지가 있다.

```
const car = new Object();
const car = {};
```

**객체 리터럴** 방법인 두 번째 방법이 일반적으로 사용된다.

**점 표기법**을 사용하여 비어있는 새 객체 car에 새 속성을 추가할 수 있다.

```
car.color = 'red';
console.log(car);	// {color: "red"}
```

#### **객체의 속성에 접근하는 두 가지 방법**

1\. 점 표기법

```
car.wheels
```

2\. 대괄호 표기법

```
car['color']
```

---


**두 방법의 차이점**

여러 단어로 이루어진 속성의 경우 점 표기법을 사용할 수 없다.

```
const car = {
	wheels : 4,
	color: "red",
    	"goes fast": true,
};
```

```
car.goes fast	// error
car['goes fast']	// true
```

또, 새로운 변수로 객체의 속성에 접근하려고 할 시, 점 표기법을 사용할 수 없다.

```
const car = {
	ferrari: "cali",
};
const key = "ferrari";

car.key		// undefined
car['key']	// undefined
car[key]	// cali
```

변수에 저장된 키를 통해 접근할 시 대괄호 표기법을 사용해야 한다.

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