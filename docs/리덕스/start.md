---
layout: page
title: 리덕스 사용할 준비하기
parent: 리덕스
nav_order: 3
has_children: false
permalink: /redux/start
---

# 리덕스 사용할 준비하기

리덕스에서 리액트를 본격적으로 사용해보기 전에 리액트 컴포넌트 없이 리덕스에서 제공되는 기능들을 먼저 연습해보자.  

먼저 새로운 프로젝트를 생성한다.  
`$ npx create-react-app learn-redux`  
그리고 해당 디렉터리에서 redux 라이브러리를 설치한다.  
```
cd learn-redux
yarn add redux
```
그 다음에는 exercise.js라는 파일을 src에 생성한다. 이 파일에서 redux를 불러와서 redux에 내장된 API를 사용하고 연습하겠다.  
해당 파일에 우선 console로 'Hello!' 를 출력하도록 작성해보자.

그 다음에는 index.js 에서 해당 파일을 다음과 같이 불러온다.

### index.js  
```
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import './exercise';

const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

그리고 yarn start 명령어를 실행하여 개발서버를 실행한 뒤 브라우저의 개발자 도구를 열어본다. 콘솔 탭을 보면 다음과 같이 출력됐을 것이다.  
![image](https://user-images.githubusercontent.com/63364990/161878097-2dee13b7-bbcc-4c77-9674-c369dba12d8d.png)

콘솔에 다음 순서대로 경고가 떴을 수도 있다.

1\. React js Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API

2\. You are importing createRoot from 'react-dom' which is not supported

`react-dom`라이브러리에서 지원되지 않는 문제때문에 발생하는 것이기 때문에 위에 작성한 코드대로 작성하면 경고가 출력되지 않을 것이다.

그런 다음에는 exercise.js 를 다음과 같이 작성해보자.  

### exercise.js  
```
import { createStore } from 'redux';    // createStore는 스토어를 만들어주는 함수이다.

/* 리덕스에서 관리할 상태 정의 */
const initialState = {
    counter: 0,
    text: '',
    list: []
};

/* 액션 타입 정의 */
// 액션 타입은 주로 대문자로 작성한다.
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const CHANGE_TEXT = 'CHANGE_TEXT';
const ADD_TO_LIST = 'ADD_TO_LIST';

/* 액션 생성함수 정의 */
// 액션 생성함수는 주로 camelCase 로 작성한다.
function increase(){
    return {
        type: INCREASE  // 액션 객체에는 type 값이 필수
    };
}

// 화살표 함수로 작성하는 것이 더욱 코드가 간단하기 때문에
// 이렇게 쓰는 것을 추천한다.
const decrease = () => ({
    type: DECREASE  // 액션안에는 type 외에 추가적인 필드를 마음대로 넣을 수 있다.
});

const changeText = text => ({
    type: CHANGE_TEXT,
    text
});

const addToList = item => ({
    type: ADD_TO_LIST,
    item
});

/* 리듀서 만들기 */
// 위 액션 생성함수들을 통해 만들어진 객체들을 참조하여
// 새로운 상태를 만드는 함수이다.
// 주의: 리듀서에서는 불변성을 꼭 지켜줘야 한다!
function reducer(state = initialState, action){
    // state 의 초깃값을 initialState 로 지정함
    switch(action.type){
        case INCREASE:
            return {
                ...state,
                counter: state.counter + 1
            };
        case DECREASE:
            return {
                ...state,
                text: action.text
            };
        case ADD_TO_LIST:
            return {
                ...state,
                list: state.list.concat(action.item)
            };
        default:
            return state;
    }
}

/* 스토어 만들기 */
const store = createStore(reducer);

console.log(store.getState());  // 현재 store 안에 들어있는 상태를 조회

// 스토어안에 들어있는 상태가 바뀔 때 마다 호출되는 listener 함수
const listener = () => {
    const state = store.getState();
    console.log(state);
};

// 구독을 해제하고 싶을 때는 unsubscribe() 를 호출
const unsubscribe = store.subscribe(listener);

// 액션들을 디스패치한다. (액션을 발생시킴) 
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText('안녕하세요'));
store.dispatch(addToList({ id: 1, text: '와우'}));
```

리덕스 스토어 안의 상태는 액션이 디스패치됨에 따라 업데이트 된다. 위 코드에서는 `listener`라는 함수를 만들었다.  
리덕스 상태에 변화가 생겼을 때 마다 `listner`함수가 호출될 것이며 콘솔에 상태에 출력될 것이다.

코드 최하단에는 여러가지 액션들을 디스패치했다. 액션이 디스패치될 때 마다 상태가 바뀌고, 이에 따라 litener함수가 호출될 것이다.  
브라우저를 열어 개발자 도구를 보면 아래와 같이 결과가 출력되었을 것이다.  
![image](https://user-images.githubusercontent.com/63364990/161899295-63622233-95a2-46c3-bcad-89b4607c186c.png)

