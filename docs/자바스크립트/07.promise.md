---
layout: page
title: promise 패턴
parent: 자바스크립트
nav_order: 7
has_children: false
permalink: /js/promise/
---

# Promise 패턴

자바스크립트는 동기적으로 작동한다. 즉, 각 코드 블록이 이전 블록 이후에 실행된다.  
잠시 다음 코드를 보자.

```
const data = fetch('your-api');
console.log('Finished');
cnosole.log(data);
```

위 코드에서는 `fetch`를 사용하여 어떤 url에서 데이터를 가져온다. 동기 코드의 경우, 우리는 `fetch` 작업이 실제로 완료된 후에 다음 행이 호출될거라 예상한다. 하지만, 실제로는 `fetch`가 호출된 직후 바로 다음 두 행이 실행된다. 마지막 `console.log(data)`는 `undefined`를 출력하게 된다.

이러한 현상이 발생하는 이유는 fetch함수가 비동기적으로 동작하기 때문이다. 즉, 해당 행에서 `fetch`가 완료될 때까지 코드 실행을 중지하는게 아니라, 계속해서 다음 행을 실행한다.

이 문제를 해결하기 위해 콜백 or 프로미스를 사용하면 `fetch`가 무어나가를 반환하는 시점까지 기다리게 할 수 있다.

## 1\. 콜백지옥

비동기 코드를 동기식으로 작성하기 위해 콜백으로 여러 코듭 블록을 차례로 연결한다. 이때, 여러 차례 연결로 인해 발생하는 상황을 **콜백 지옥**이라고 한다.  

예를 들어, A를 하고, A가 완료될 때까지 기다렸다가 B를 수행하고, B가 완료될 때까지 기다렸다가 C를 수행하고, 이런 식으로 계속된다.

이런 코드에서는 기다리는 시점마다 콜백을 사용해야 하기 때문에 코드가 복잡해진다.

아래는 콜백 지옥의 의미를 보여주는 예제이다. 피자를 준비하는 각 단계마다 서버에 요청을 보내야 하고, 서버가 응답할 때까지 기다렸다가 다음 단계를 수행해야 하는 비동기적 상황이다.

```
const makepizza = (ingredients, callbacks) => { // 호출
  mixingredients(ingrdients, function(mixedIngredients)){    // 호출
      bakePizza(mixedIngredients, function(bakePizza)){  // 호출
          console.log('finished');
      }
  }
}
```

이렇게 하면 시각적으로 위에서 아래로 코드가 실행되는 것처럼 보이게 작성할 수는 있지만, 그것 때문에 과도한 함수 중첩을 유발하고 있다.

이런 현상을 해결하기 위해 프로미스 패턴을 사용한다.

## 2\. 프로미스

프로미스는 비동기 작업의 최종 성공 또는 실패를 나타내는 객체이다. 직접 프로미스를 만들어보자.

```
const myPromise = new Promise((resolve, reject) => {
    // 코드
});
```

이런 방식으로 프로미스를 만든 후, 프로미스의 성공을 알리기 위해서는 resolve를, 실패를 알리기 위해서는 reject를 호출하면 된다. 프로미스 안에서 즉시 resolve를 호출하면 어떤 값이 반환되는지 확인해보자.

```
const myPromise = new Promise((resolve, reject) => {
    resolve("Call resolve");
});

myPromise
  .then(
    (data) => {
    console.log(data);
  });
// Call resolve
```

resolve안의 "Call resolve"가 콘솔에 출력된다.

이번엔 reject를 이용한 오류 처리 방법도 살펴보자.

```
const myPromise = new Promise((resolve, reject) => {
    reject(new Error("this is error"));
});

myPromise
  .then(
    (data) => {
    console.log(data);
  })
  .catch(err => {
      console.log(err);
  });

// Error: this is error
// Stack trace:
// myPromise</<@debugger eval code:3:14
```

프로미스가 성공할 때의 값을 얻는 데에 `.then()`을 사용하고, 프로미스가 실패할 때의 오류를 처리하는 데에는 `.catch()`를 사용한다.

출력된 오류로그를 보면 오류가 발생한 위치를 알 수 있다. 단순히 `reject("this is error")`라고 작성하지 않고 `reject(new Error("this is error"))`라고 작성했기 때문이다.

## 3\. Promise 체이닝

프로미스의 성공 또는 실패 여부와 무관하게 이전 프로미스에서 반환된 것을 후속 프로미스의 기반으로 사용하여 프로미스를 계속 체이닝(연결)할 수 있다.  
원하는 만큼 많은 프로미스를 연결할 수 있으며, 그 코드는 위에서 봤던 콜백 지옥보다 훨씬 읽기 쉽다.

```
const myPromise = new Promise((resolve, reject) => {
    resolve();
});

myPromise
  .then(data => {
    return 'working';   // 새로운 값을 반환
  })
  .then(data => {
    console.log(data);  // 이전 프로미스에서 받은 값 출력
    // working
    throw 'failed';
  })
  .catch(err => {
    console.log(err);   // 프로미스 수행 중 발생한 오류 출력
    // failed
  });
```

여기서, throw는 예외를 강제를 발생시킨다는 뜻이다. 예외를 의도적으로 발생시키기 위해 throw 키워드를 사용한다.

예제를 보면 첫번째 `.then()`이 두번째 `.then()`으로 값을 전달하여 해당 값이 출력되었고, 두번째 `.then()`에서 발생시킨 오류는 `.catch()`절로 전달되어 오류(failed)가 출력되었다.

프로미스가 성공한 경우뿐만 아니라 실패한 경우에도 연쇄적으로 연결하여 사용하는 것이 가능하다.

```
const myPromise = new Promise((resolve, reject) => {
    resolve();
});

myPromise
  .then(data => {
    throw new Error("failed");
    console.log("first value");
  })
  .catch(err => {
    console.log("catch error");
  });
  .then(data => {
    console.log("second value");
  });
```

이 코드의 경우 첫번째 `.then()`에서 오류가 발생했기 때문에 `"first value"`는 출력되지 않고, 첫번째 `.catch()`와 마지막 .`then()`을 수행하면서 로그가 출력된다.

## 4\. Promise.resolve()와 Promise.reject()

`Promise.resolve()`와 `Promise.reject()`는 자동으로 성공하거나 실패하는 프로미스를 생성한다.

```
Promise.resolve('Success').then(function(value){
    console.log('Success');
}, function(value){
    console.log('fail');
});

Promise.reject(new Error('fail')).then(function(){
    console.log('Success');
}, function(error){
    console.log(error);
});
// Error: fail;
```

.then()절에서 생성된 프로미스에는 두 개의 인수가 있다. 하나는 프로미스가 성공할 때 호출되는 함수이고, 다른 하나는 프로미스가 실패할 때 호출되는 함수이다. Promise.resolve()는 즉시 프로미스를 성공 처리하므로 첫번째 함수가 호출된다.

한편, 두번째 예제에서는 `Promise.reject()`를 사용하여 프로미스를 즉시 실패 처리하므로 `.then()`절의 두번째 인수가 호출된다.

## 5\. Promise.all()과 Promise.race()

`Promise.all()`은 모드 프로미스가 성공할 경우에만 하나의 프로미스를 반환한다.

```
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'first value');
});
const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'second value');
});

Promise
  .all([promise1, promise2])
  .then(data => {
    const [promise1data, promise2data] = data;
    console.log(promise1data, promise2data);
  });
// 1000ms 후
// first value second value
```

1000ms 후에 첫번째, 두번째 프로미스의 결과가 함께 반환되었다. 즉 첫번째 프로미스가 성공 후에도 두번째 프로미스가 성공할 때까지 기다렸음을 알 수 있다. 비어있는 이터러블을 전달하면 이미 성공 처리된 프로미스를 반환한다.  
프로미스 중 하나가 실패하면 헤당 실패에서 발생한 오류가 반환된다.

```
const promise1 = new Promise((resolve, reject) => {
  resolve('first value');
});
const promise2 = new Promise((resolve, reject) => {
  reject('Error("ooops error")');
});

Promise
  .all([promise1, promise2])
  .then(data => {
    const [promise1data, promise2data] = data;
    console.log(promise1data, promise2data);
  })
  .catch(err => {
    console.log(err);
  });
// Error: ooops error
```

이와 대조적으로, `Promise.race()`는 이터러블에 포함된 프로미스들 중 가장 먼저 성공 또는 실패한 결과를 반환한다.

```
const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, 'first value');
});
const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'second value');
});

Promise
  .race([promise1, promise2])
  .then(value => {
    console.log(value);
  });
// 둘 다 성공하지만 promise2가 먼저 성공
// second value
```

비어있는 이터러블을 전달하면 `.race()`는 영원히 보류된 상태로 남아있는다.