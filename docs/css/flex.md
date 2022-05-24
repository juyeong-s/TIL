---
layout: page
title: flex-basis, flex-glow, flex-shrink
parent: Css
nav_order: 4
has_children: false
permalink: /css/flex/
---

# flex-basis, flex-glow, flex-shrink

css에서 중요한 기능인 `flex`에 대해 알아보자.

_html_

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="stylesheet" href="flex.css" />
    <title>Flex</title>
  </head>
  <body>
    <div class="container">
      <div class="box">box1</div>
      <div class="box">box2</div>
      <div class="box">box3</div>
      <div class="box">box4</div>
      <div class="box">box5</div>
      <div class="box">box6</div>
    </div>
  </body>
</html>
```

_css_

```
body {
  box-sizing: border-box;
  font-family: sans-serif;
}

.container {
  display: flex;
  background: #ffe8ff;
  border: 1px solid black;
  width: 90vw;
  height: 200px;
}

.box {
  background-color: pink;
  border: 1px solid black;
  width: 100px;
  height: 100px;
  margin: 10px;
  text-align: center;
}
```

![1](https://user-images.githubusercontent.com/63364990/169932848-1285dd83-2220-4dd4-baff-e51e7ede964b.png)

container에 기본적으로 `display: flex;` 속성만을 적용했다. `flex-direction`은 디폴트 값인 `row`로 설정되어 flex item들이 좌우로 나열되어 있다.

오늘 알아볼 `flex-basis, flex-glow, flex-shrink` 모두 flex item에 적용하는 속성이다.

## 1\. flex-basis

flex item을 axis방향으로 크기를 설정해준다. (row일 경우: width 조절, column일 경우 : height 조절)  
위의 상태에서 box에 flex-basis값을 설정할 경우 box의 좌우 너비가 변한다. `flex-direction: column`인 경우에는 높이 크기가 변한다.  
`default`값은 `auto`이다.

- auto일 경우: width, height속성이 우선한다.
- auto가 아닐 경우: flex-basis 속성이 우선한다.

아래 예시에서 더 잘 알아보자.

_css_

```
.box:nth-child(1) {
  flex-basis: 200px;
}

.box:nth-child(2) {
}

```

첫번째 박스에는 `200px`, 두번째 박스에는 `auto`값으로 되어있다.

![화면 기록 2022-05-24 오전 11 20 44](https://user-images.githubusercontent.com/63364990/169936685-076d8a3e-1d5a-4978-a03e-fbbb37b890bf.gif)

창의 크기를 줄였다 늘렸다 했을 때, 크기가 유연하게 변경되는 것이 보이는데, 이때 `flex-basis: 200px`로 지정된 경우, 200px보다 작아질 경우 유연하게 width가 줄어든다. 창의 크기가 충분히 여유있을 경우에는 그대로 200px로 출력된다.

## 2\. flex-glow

flex-item 요소가, flex-container 요소 내부에서 할당 가능한 공간의 정도를 선언한다. 만약 형제 요소로 렌더링 된 모든 flex-item 요소들이 동일한 flex-grow 값을 갖는다면, flex-container 내부에서 동일한 공간을 할당받는다. 하지만, `flex-glow`값으로 다른 소수값을 지정한다면 그에 따라 공간을 나눠갖게 된다.

보통 `flex-glow`를 사용할 땐 `flex-shrink, flex-basis` 속성과 함께 사용한다. `default`값은 `0`이고, 음수 설정은 불가능하다.

flex container에 공간이 남을 경우 `flex-glow`를 설정한 해당 item이 나머지 부분을 채우게 된다.

```
.box:nth-child(1) {
}

.box:nth-child(2) {
  flex-grow: 1;
}
```

![화면 기록 2022-05-24 오후 1 10 22](https://user-images.githubusercontent.com/63364990/169947228-74af56d9-ac0e-4cbb-a8cd-3f3bf51523b4.gif)

box2에만 `flex-glow`속성을 주었다. 그 결과 flex-container에 axis방향으로 공간이 남았을 때 box2의 크기가 늘어나서 남은 공간을 차지하게 되었다.

`flex-glow`는 위와 같이 일정 비율의 크기를 갖게 하고 싶을 때 많이 사용하는 속성이다.

```
.box {
  background-color: pink;
  border: 1px solid black;
  width: 100px;
  height: 100px;
  margin: 10px;
  text-align: center;
  flex-grow: 1;
}

.box:nth-child(1) {
  flex-grow: 3;
}

.box:nth-child(2) {
}
```

![2](https://user-images.githubusercontent.com/63364990/169947603-454b7c02-6ca0-4ef8-9ee7-823dca2c6225.png)

이번에는 box1에 `flex-glow`속성을 `2`로 주고, 나머지 `box`는 `1`로 주었다. 그럼 각각 `3:1:1:1:1:1`의 width 크기 비율을 갖는다.

## 3\. flex-shrink

`flex-glow`와 반대 속성이다. `flex-container`에 공간이 부족해질 때 `flex-item의` axis방향 크기가 얼마나 줄어들 수 있는지 지정하는 속성이다. `default`값은 `1`이고, 음수 설정은 불가능하다.

만약 `flex-item` 요소의 크기가 `flex-container` 요소의 크기보다 클 때 `flex-shrink` 속성을 사용하는데, 설정된 숫자값에 따라 `flex-item` 요소의 크기가 축소된다.

```
.box:nth-child(1) {
  flex-basis: 200px;
  flex-shrink: 0;
}

.box:nth-child(2) {
}
```

![화면 기록 2022-05-24 오후 1 20 50](https://user-images.githubusercontent.com/63364990/169948245-253fb841-f389-4cfd-8b85-460b528c0010.gif)

box1에만 `flex-shrink: 0;`을 적용한 결과, container의 크기가 줄어들어도 box1의 크기는 줄어들지 않는다.

이번에는 0이 아닌 값으로 설정해보자.

```
.box:nth-child(1) {
  flex-shrink: 2;
}

.box:nth-child(2) {
  flex-shrink: 3;
}
```

![화면 기록 2022-05-24 오후 1 33 01](https://user-images.githubusercontent.com/63364990/169949587-f0d615cf-0abc-45bf-a998-8e6be9c58e18.gif)

모든 `flex-item`이 `shrink`가 `1(디폴트)`이고, `box1`은 `2`, `box2`는 `3`으로 설정했다.
이때 box1, box2는 각각 2, 3배 작게 줄어들게 된다.
크기는 item안의 content(text같은 것들)가 변경되지 않을 때 까지만 줄어들게 된다. 왜냐면 디폴트로 `min-width: auto`, `min-height: auto`로 설정되어 있기 때문이다.

![3](https://user-images.githubusercontent.com/63364990/169950178-81c845ce-ddc5-43be-8f09-32805b76e67d.png)  
최소한으로 줄어들도록 하려면 `min-width: 0`, `min-height: 0`, `overflow: hidden`(visible 빼고 모두 가능) 으로 설정해주면 content를 무시하고 줄어들게 된다.

## 4\. flex

`flex-basis, flex-grow, flex-shrink` 속성은 `flex` 속성 단 하나만 이용해서 한줄로 지정할 수 있다.  
flex로 한줄로 나타낼 때는 다음과 같은 규칙이 있다.

```
1.
flex: 2;
flex: 10em;
flex: 30%;

2.
flex: 2 2;
flex: 1 10px;

3.
flex: 2 2 10px;
```

1\. 값이 한 개일 경우

- 단위가 **없**을 경우 : `flex-glow` 값을 나타냄
- 단위가 **있**을 경우 : `flex-basis` 값을 나타냄

2\. 값이 두 개일 경우

- 첫번째 값 : 단위가 **없**어야 하며 `flex-glow` 값을 나타냄
- 두번째 값
  - 단위가 **없**을 경우 : `flex-shrink` 값을 나타냄
  - 단위가 **있**거나 auto일 경우 : `flex-basis` 값을 나타냄

3\. 값이 세 개일 경우

- 첫번째 값 : 단위가 **없**어야 하며 `flex-glow` 값을 나타냄
- 두번째 값 : 단위가 **없**어야 하며 `flex-shrink` 값을 나타냄
- 세번째 값 : 단위가 **있**거나 auto여야 하며 `flex-basis` 값을 나타냄

## 참고

[[CSS] flex-basis, flex-grow, flex-shrink 개념 완벽 정리 & flex 축약법](https://choar816.tistory.com/119)
[flex-grow](https://developer.mozilla.org/ko/docs/Web/CSS/flex-grow)
[flex-shrink](https://developer.mozilla.org/ko/docs/Web/CSS/flex-shrink)
