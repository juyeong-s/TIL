---
layout: page
title: async await
parent: 자바스크립트
nav_order: 14
has_children: false
permalink: /js/asyncawait/
---

# async await

`async await`은 비동기 프로그래밍을 동기 프로그래밍처럼 작성할 수 있도록 함수에 추가된 기능이다. `async await`을 이용해서 비동기 코드를 작성하면 프로미스의 `then`메서드를 체인 형식으로 호출하는 것보다 가독성이 좋아진다.  
그렇다고 `async await`가 프로미스를 완전히 대체하는 것은 아니다. 프로미스는 비동기 상태를 값으로 다룰 수 있기 때문에 `async await`보다 큰 개념이다.

## async await 이해하기

프로미스는 객체로 존재하지만 `async await`는 함수에 적용되는 개념이다. 다음과 같이 `async await`함수는 프로미스를 반환한다.

```
async function getData(){
    return 123;
}

getData().then(data => console.log(data));  // 123
```

- async키워드를 사용하여 정의된 함수는 async await함수이며, 항상 프로미스를 반환한다.
- 따라서 함수 호출 후 then메서드를 사용할 수 있다.

`async await`함수 내부에서 프로미스를 반환하는 경우를 살펴보자

```
async function getData(){
    return Promise.resolve(123);
}

getData().then(data => console.log(data));  // 123
```

- 프로미스의 `then`메서드와 마찬가지로 `async await`함수 내부에서 반환하는 값이 프로미스라면 그 객체를 그대로 반환한다.


## await 키워드 사용법

`await`키워드는 `async await`함수 내부에서 사용된다. `await`키워드 오른쪽에 프로미스를 입력하면 그 프로미스가 `처리됨` 상태가 될 때까지 기다린다.

따라서 await키워드로 비동기 처리를 기다리면서 순차적으로 코드를 작성할 수 있다. 아래 예시를 보자.

```
function requestData(value){
    return new Promise(resolve => 
        setTimeout(() => {
            console.log('requestData:', value);
            resolve(value);
        }, 100),
    );
}

async function getData(){
    const data1 = await requestData(10);
    const data2 = await requestData(20);
    console.log(data1, data2); -- 1
    return [data1, data2];
}

getData();

// requestData: 10
// requestData: 20
// 10 20
```

- `requestData`함수가 반환하는 프로미스가 처리됨 상태가 될 때까지 1번 코드는 실행되지 않는다.

`await`키워드는 오직 `async await`함수 내에서만 사용할 수 있다. 다음과 같이 await을 선언하면 에러가 발생한다.

```
function getData(){
    const data = await requestData(10); // 에러 발생
}
```

## async await 활용하기

### 비동기 함수를 병렬로 실행하기

async await 함수에서 여러 비동기 함수를 병렬로 처리하는 방법을 알아보자. 다음과 같이 여러 비동기 함수에 각각 await 키워드를 사용하면 순차적으로 실행된다.

```
async function getData(){
    const data1 = await func1();
    const data2 = await func2();
}
```

앞의 두 함수 사이에 의존성이 없다면 동시에 실행하는 것이 더 좋다. 프로미스는 생성과 듕시에 비동기 코드가 실행된다. 따라서 두 개의 프로미스를 먼저 생성하고 `await` 키워드를 나중에 사용하면 병렬로 실행되는 코드가 된다.

```
async function getData(){
    const p1 = func1();
    const p2 = func2();
    const data1 = await p1;
    const data2 = await p2;
}
```

- 두 개의 프로미스가 생성되고 각자의 비동기 코드가 실행된다.
- 두 프로미스가 생성된 후 기다리기 때문에 두 개의 비동기 함수가 병렬로 처리된다.

아래의 `Promise.all`을 사용하면 다음과 같이 더 간단해진다.

```
async function getData(){
    const [data1, data2] = await Promise.all([func1(), func2()]);
}
```

### 예외 처리하기

`async await` 함수에서 예외를 처리하는 방법을 알아보자. `async await` 함수에 내부에서 발생하는 예외는 다음과 같이 `try catch` 문으로 처리하는게 좋다.

```
async function getData(){
    try {
        await doAsync();
        return doAsync();
    } catch (error) {
        console.log(error);
    }
}
```

- 비동기 함수와 동기 함수에서 발생하는 모든 예외가 `catch`문에서 처리된다.
만약 `getData()`가 `async await` 함수가 아니었다면 `doAsync` 함수에서 발생하는 예외는 `catch`문에서 처리되지 않는다. `doAsync` 함수의 처리가 끝나는 시점을 알 수 없기 때문이다.

### Thenable을 지원하는 async await

`Thenable`은 프로미스처럼 동작하는 객체다. `async await`은 프로미스가 아니더라도 `then`메서드를 사진 객체를 프로미스처럼 취급한다. 이렇게 ES6의 프로미스가 아니더라도 `then` 메서드를 가진 객체를 `Thenable`이라고 부른다.

