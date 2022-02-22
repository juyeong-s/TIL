---
layout: page
title: calc()
parent: Css
nav_order: 3
has_children: false
permalink: /css/calc/
---

# calc()

`calc()`는 괄호 안의 식을 계산한 결과를 속성값으로 사용하게 해주는 함수이다.

예를 들어  

```
width: calc(100% - 80px);
```

는 글자 크기를 `20px`로 만든다.

- `calc()`를 이용하면 고정된 너비의 여백을 가진 요소를 쉽게 배치할 수 있다.

다음 예제를 보자.  
_css_  

```
.banner {
  position: absolute;
  left: 40px;
  width: calc(100% - 80px);
  border: solid black 1px;
  box-shadow: 1px 2px;
  background-color: yellow;
  padding: 6px;
  text-align: center;
  box-sizing: border-box;
}
```

_html_

```
<div class="banner">이건 현수막입니다!</div>
```

_결과_  
<style>
.banner {
  position: absolute;
  left: 40px;
  width: calc(100% - 80px);
  border: solid black 1px;
  box-shadow: 1px 2px;
  background-color: yellow;
  padding: 6px;
  text-align: center;
  box-sizing: border-box;
}
</style>

<div class="banner">이건 현수막입니다!</div>


## 계산 순서

- 왼쪽에서 오른쪽으로 계산된다.


## 참고  

- `*`와 `/` 연산자는 좌우 공백을 요구하지 않지만, `+`와 `-` 연산자는 좌우에 공백이 있어야 한다.

