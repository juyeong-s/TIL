---
layout: page
title: useRef로 특정 DOM 선택하기
parent: 리액트
nav_order: 2
has_children: false
permalink: /react/useref
---

# useRef로 특정 DOM 선택하기

자바스크립트를 사용할 때에는 우리가 특정 DOM을 선택해야 하는 상황에 `getElementById`, `querySelector`와 같은 DOM selector 함수를 사용하여 돔을 선택한다.

리액트를 사용하는 프로젝트에서도 가끔 돔을 직접 다뤄야 하는 상황이 생기기도 한다. 예를 들면, 특정 엘리먼트의 크기를 가져와야 한다던디, 스크롤바 위치를 설정해야 한다던지, 포커스를 설정한다던지 등등 다양한 상황이 있을 것이다.

그럴 때 리액트에서는 `ref`를 사용한다. 함수형 컴포넌트에서는 `ref`사용을 위해 `useRef`라는 훅을 사용한다. 클래스형 컴포넌트에서는 `React.createRef`라는 함수를 사용한다.

나는 함수형 컴포넌트를 기준으로 포스팅을 작성할 것이다.

아래는 초기화 버튼 컴포넌트 코드이다. 초기화 버튼을 누르면 포커스가 초기화 버튼에 그대로 남아있게 되는데, 초기화 버튼을 클릭했을 때 이름 Input에 포커스가 잡히도록 구현을 해보겠다.

_InputSample.js_

```
import React, { useState, useRef } from "react";

export default function InputSample() {
  const [inputs, setInputs] = useState({
    name: "",
    nickname: "",
  });
  const nameInput = useRef();
  const { name, nickname } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      name: value,
    });
  };

  const onReset = () => {
    setInputs({
      name: "",
      nickname: "",
    });
    nameInput.current.focus();
  };

  return (
    <div>
      <input
        name="name"
        placeholder="이름"
        onChange={onChange}
        value={name}
        ref={nameInput}
      />
      <input
        name="nickname"
        placeholder="닉네임"
        onChange={onChange}
        value={nickname}
      />
      <button onClick={onReset}>초기화</button>
      <div>
        <b>값: </b>
        {name} ({nickname})
      </div>
    </div>
  );
}

```

`useRef()`를 사용하여 Ref객체를 만들고, 이 객체를 우리가 선택하고 싶은 돔에 `ref`값으로 설정해주어야 한다. 그러면, `Ref객체`의 `.current`값(`e.target`)은 우리가 원하는 돔을 가르키게 된다.

위 예제레서는 `onReset`함수에서 input에 포커스를 하는 `focus()` DOM API를 호출해주었다.

이제 아래처럼 브라우저에서 확인해보자. 초기화 버튼을 누르면 이름 input에 포커스가 잘 잡힐 것이다.

![gif](https://user-images.githubusercontent.com/63364990/169447963-654a94dc-a9da-426d-87a6-c288df35477c.gif)

이처럼 `useRef`를 무한 스크롤에도 활용할 수 있다.

### 참고

[벨로퍼트와 함께하는 모던 리액트](https://react.vlpt.us/basic/10-useRef.html)
[React Infinite scroll 구현하기](https://y0c.github.io/2019/06/30/react-infinite-scroll/)
