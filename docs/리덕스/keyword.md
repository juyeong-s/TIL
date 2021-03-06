---
layout: page
title: 리덕스에서 사용되는 기본 키워드
parent: 리덕스
nav_order: 1
has_children: false
permalink: /redux/keyword
---

# 리덕스에서 사용되는 기본 키워드

리덕스를 사용하기에 앞서 앞으로 접하게 될 꼭! 알아야 할 키워드들을 미리 알아보자. 이 키워드를 배우기에 앞서 `useReducer`를 잘 모른다면 미리 공부하길 바란다.

## 액션(Action)

상태에 어떠한 변화가 필요하게 될 땐, 우리는 액션이라는 것을 발생시킨다. 이는 하나의 객체로 표현되는데, 액션 객체는 다음과 같은 형식으로 이뤄져있다.

```
{
    type: "TOGGLE_VALUE"
}
```

액션 객체는 type 필드를 필수적으로 가지고 있어야 한다. 그 외의 값들을 개발자 마음대로 넣으면 된다.  
예를 들면,

```
{
    type: "ADD_TODO",
    data: {
        id: 0,
        text: "리덕스 배우기"
    }
}
```

```
{
  type: "CHANGE_TEXT",
  text: "열심히 해봐요."
}
```

## 액션 생성함수(Action Creator)

액션 생성함수는, 액션을 만드는 함수이다. 단순히 파라미터를 받아와서 액션 객체 형태로 만들어준다.

```
export function addTodo(data){
    return {
        type: "ADD_TODO",
        data
    };
}

// 화살표 함수도 가능하다.
export const changeText = text => ({
    type: "CHANGE_TEXT",
    text
});
```

이러한 액션 생성함수를 만들어서 사용하는 이유는 나중에 컴포넌트에서 쉽게 액션을 발생시키기 위함이다. 그래서 보통 함수 앞에 export 키워드를 붙여서 다른 파일에서 불러와서 사용한다.  
리덕스를 사용 할 때 액션 생성함수를 사용하는것이 필수적이진 않다. 액션을 발생 시킬 때마다 직접 액션 객체를 작성할수도 있다.

## 리듀서(Reducer)

리듀서는 변화를 일으키는 함수이다. 리듀서는 두가지의 파라미터를 받아온다.

```
function reducer(state, action){
    // 상태 업데이트 로직
    return alteredState;
}
```

리듀서는 현재의 상태와 전달받은 액션을 참고하여 새로운 상태를 만들어서 반환한다. 이 리듀서는 useReducer 를 사용할때 작성하는 리듀서와 똑같은 형태를 가지고 있다.  
만약 카운터를 위한 리듀서를 작성한다면 다음과 같이 작성할 수 있다.

```
function counter(state, action){
    switch(action.type){
        case 'INCREASE':
          return state+1;
        case 'DECREASE':
          return state-1;
        default:
          return state;
    }
}
```

`useReducer`에서는 일반적으로 `default:` 부분에 `throw new Error('Unhandled Action')`과 같이 에러를 발생시키도록 처리하는게 일반적인 반면, 리덕스의 리듀서에서는 기존 state를 그대로 반환하도록 작성해야 한다.  
리덕스를 사용할 때는 여러개의 리듀서를 만들고 이를 합쳐 루트 리듀서를 만들 수 있다.

## 스토어(Store)

리덕스에서는 한 애플리케이션 당 하나의 스토어를 만들게 된다. 스토어 안에는 현재 앱 상태와, 리듀서, 추가적으로 몇가지 내장 함수들이 들어가 있다.

## 디스패치(dispatch)

디스패치는 스토어의 내장 함수 중 하나이다. 디스패치는 액션을 발생시키는 것이라고 이해하면 된다. dispatch라는 함수에는 액션을 파라미터로 전달한다.  
`dispatch(action)`이런식으로.

그렇게 호출하면 스토어는 리듀서 함수를 실행시켜서 해당 액션을 처리하는 로직이 있다면 로직을 수행하고 새로운 상태를 만들어 준다.

## 구독(subscribe)

구독 또한 스토어의 내장 함수 중 하나이다. `subscribe`함수는 함수 형태의 값을 파라미터로 받아온다. 파라미터로 특정함수를 전달해주면, 액션이 디스패치 되었을 때 마다 전달해준 함수가 호출된다.

리액트에서 리덕스를 사용하게 될때 보통 이 함수를 직접 사용하는 일은 별로 없다. 그 대신, `react-redux`라는 라이브러리에서 제공하는 `connect`함수 또는 `useSelector` Hook을 사용하여 리덕스의 스토어 상태에 구독한다.

## 정리  
한 키워드씩 정리하자면,  

1\. **액션**  
 상태에 변화가 필요할 때 발생시킴. type을 필수, 그외 값들은 개발자 마음대로 생성.  
2\. **액션 생성함수**  
 컴포넌트에서 쉽게 액션을 발생시키기 위함(필수X)  
3\. **리듀서(reducer)**  
 변화를 일으키는 함수  
 현재의 상태와 액션을 참조하여 새로운 상태를 반환  
4\. **스토어(Store)**  
 한 애플리케이션 당 하나의 스토어.  
 현재의 앱 상태와 리듀서, 내장 함수를 포함함.  
5\. **디스패치(dispatch)**  
 스토어의 내장 함수  
 액션을 발생시키는 것  
6\. **구독(subscribe)**  
 스토어의 내장 함수  
 subscribe 함수에 특정 함수를 전달해주면, 액션이 디스패치 되었을 때 마다 전달해준 함수가 호출됨.  
 리액트에서는 connect 함수 또는 useSelector Hook 을 사용
 

