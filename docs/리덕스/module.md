---
layout: page
title: 리덕스 모듈만들기
parent: 리덕스
nav_order: 4
has_children: false
permalink: /redux/module
---

# 리덕스 모듈만들기

이번 포스팅에서는 리액트 프로젝트에 리덕스를 적용하기 위해 리덕스 모듈을 만들어 보겠다. 리덕스 모듈이란 다음 항목들이 모두 들어있는 자바스크립트 파일을 의미한다.

- 액션타입
- 액션 생성함수
- 리듀서

위 항목들은 각각 다른 파일에 저장할 수도 있다.  
리덕스 Github레포에 등록되어있는 [예제 프로젝트](https://github.com/reduxjs/redux/tree/master/examples/todos/src)를 보면 다음과 같이 코드가 분리되어 있다.  
- actions
    - index.js
- reducers
    - todos.js
    - visibilityFilter.js
    - index.js

위 예제 프로젝트에서는 액션과 리듀서가 서로 다른 파일에 정의되어있다. 하지만, 이 코드들이 꼭 분리되어 있을 필요는 없다.  
이 코드들이 서로 다른 디렉터리, 파일에 분리가 되어있으면 개발을 하는데 꽤나 불편하다. 그래서 나는 리듀서와 액션 관련된 코드들을 하나의 파일에 몰아서 작성할 것이다.  
이를 Ducks패턴이라고 부른다.  
만약 파일을 분리하고 싶다면 정해진 방식이 없으므로 자유롭게 분리하면 된다.

## counter 모듈만들기  
src디렉터리에 modules디렉터리를 만들고, 그 안에 counter.js파일을 생성한 후 아래 코드를 작성해보자.  
(주석을 주의깊게 읽을 것!)

```
/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣는다.
// 이렇게 하면 다른 모듈의 변수와 액션 이름이 중복되는 것을 방지 할 수 있다.
const SET_DIFF = 'counter/SET_DIFF';
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export키워드를 사용해서 내보내기
export const setDiff = diff => ({ type: SET_DIFF, diff});
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

/* 초기 상태 선언 */
const initialState = {
    number: 0,
    diff: 1
};

/* 리듀서 선언 */
// 리듀서는 export default로 내보내준다.
export default function counter(state = initialState, action){
    switch(action.type){
        case SET_DIFF:
            return {
                ...state,
                diff: action.diff
            };
        case INCREASE:
            return {
                ...state,
                diff: state.number + state.diff
            };
        case DECREASE:
            return {
                ...state,
                diff: state.number - state.diff
            };
        default:
            return state;
    }
}
```

## todos 모듈 만들기

**todos** 모듈도 만들어보자. `modules` 디렉터리에 `todos.js` 파일을 다음과 같이 작성하자.  
```
/* 액션 타입 선언 */
const ADD_TODO = 'todos/ADD_TODO';
const TOGGLE_TODO = 'todos/TOGGLE_TODO';

/* 액션 생성함수 선언 */
let nextId = 1;
export const addTodo = text => ({
    type: ADD_TODO,
    todo: {
        id: nextId++,
        text
    }
});
export const toggleTOdo = id => ({
    type: TOGGLE_TODO,
    id
});

/* 초기 상태 선언 */
const initialState = [
    {
        id: 1,
        text: '예시',
        done: false
    }
];

export default function todos(state = initialState, action){
    switch(action.type){
        case ADD_TODO:
            return state.concat(action.todo);
        case TOGGLE_TODO:
            return state.map(
                todo => 
                    todo.id === action.id
                        ? {...todo, done: !todo.done}
                        : todo
            );
        default:
            return state;
    }
}

```

## 루트 리듀서 만들기  
지금까지 두가지의 리덕스 모듈을 만들었다. 그래서 리듀서도 두개다. 한 프로젝트에 여러개의 리듀서가 있을 때는 이를 한 리듀서로 합쳐서 사용한다. 합쳐진 리듀서는 루트 리듀서라고 부른다.  
리듀서를 합치는 작업은 리덕스에 내장되어 있는 `combineReducers`라는 함수를 사용한다.  
`modeuls` 디렉터리에 `index.js`를 만들고 다음과 같이 코드를 작성해보자.

### modules/index.js  
```
import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';

const rootReducer = combineReducers({
    counter,
    todos
});

export default rootReducer;
```

이렇게 하면 리듀서를 합칠 수 있다! 루트 리듀서를 만들었으니 이제 스토어를 만들어 보자.  
리덕스 스토어를 만드는 작업은 `src`디렉터리의 `index.js`에서 해주겠다.  

### index.js  
```
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import rootReducer from './modules';

const store = createStore(rootReducer); // 스토어 생성
console.log(store.getState()); // 스토어의 상태를 확인해보자.

const root = createRoot(document.getElementById("root"));
root.render(<App />);
```

스토어를 만들고, 스토어의 상태를 출력해보면 counter와 todos 서브 리듀서가 합쳐졌다!  
![이미지](https://user-images.githubusercontent.com/63364990/161906817-69f24f1e-62a4-4b5d-a75a-451d52b5443b.png)

## 리액트 프로젝트에 리덕스 적용하기  
리액트 프로젝트에 리덕스를 적용할 때는 `react-redux`라는 라이브러리를 사용해야 한다. 다음 명령어로 설치해주자.  
`yarn add react-redux`

그 다음에는 index.js안에 Provider라는 컴포넌트를 불러온다. Provider로 App 컴포넌트를 감싸준 후 Provider의 props에 store를 넣어준다.  

```
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';

const store = createStore(rootReducer); // 스토어 생성
console.log(store.getState()); // 스토어의 상태를 확인해보자.

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

`Provider`의 `props`에 `store`를 넣은 컴포넌트로 `App`을 감싸게 되면 렌더링 하는 그 어떤 컴포넌트던지 리덕스 스토어에 접근할 수 있게 된다.
