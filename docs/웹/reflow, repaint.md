---
layout: page
title: 브라우저 동작 과정 및 Reflow, Repaint 과정과 최적화 방법
parent: 웹
nav_order: 1
has_children: false
permalink: /web/reflow,repaint
---

# 브라우저 동작 과정 및 Reflow, Repaint 과정과 최적화 방법

## 간단히 설명

브라우저의 핵심 기능은 사용자가 참조하고자 하는 웹페이지를 서버에 요청(Request)하고 서버의 응답(Response)을 받아 브라우저에 표시하는 것이다. 브라우저는 서버로부터 HTML, CSS, Javascript, 이미지 파일 등을 응답받는다.

HTML, CSS 파일은 렌더링 엔진의 HTML 파서와 CSS 파서에 의해 파싱(Parsing)되어 DOM, CSSOM 트리로 변환되고 렌더 트리로 결합된다. 이렇게 생성된 렌더 트리를 기반으로 브라우저는 웹페이지를 표시한다.

자바스크립트는 렌더링 엔진이 아닌 자바스크립트 엔진이 처리한다. HTML 파서는 script 태그를 만나면 자바스크립트 코드를 실행하기 위해 DOM 생성 프로세스를 중지하고 자바스크립트 엔진으로 제어 권한을 넘긴다. 제어 권한을 넘겨 받은 자바스크립트 엔진은 script 태그 내의 자바스크립트 코드 또는 script 태그의 src 어트리뷰트에 정의된 자바스크립트 파일을 로드하고 실행한다. 자바스크립트의 실행이 완료되면 다시 HTML 파서로 제어 권한을 넘겨서 브라우저가 중지했던 시점부터 DOM 생성을 재개한다.

이처럼 브라우저는 **동기(Synchronous)**적으로 동작한다. 이것은 script 태그의 위치에 따라 블로킹이 발생하여 DOM의 생성이 지연될 수 있다는 것을 의미한다. 따라서 script 태그의 위치는 중요한 의미를 갖는다.

body 요소의 가장 아래에 자바스크립트를 위치시키는 것은 좋은 아이디어이다. 그 이유는 아래와 같다.

- HTML 요소들이 스크립트 로딩 지연으로 인해 렌더링에 지장 받는 일이 발생하지 않아 페이지 로딩 시간이 단축된다.
- DOM이 완성되지 않은 상태에서 자바스크립트가 DOM을 조작한다면 에러가 발생한다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/029bea1f-94ab-4f60-99e4-55720db3c480/Untitled.png)

## 브라우저의 기본 구조

1. **사용자 인터페이스:** 주소 표시줄, 이전/다음 버튼, 북마크 메뉴와 같은 요청한 페이지를 보여주는 창을 제외한 나머지 모든 부분이다.
2. **브라우저 엔진:** 사용자 인터페이스와 렌더링 엔진 사이의 동작을 제어.
3. **렌더링 엔진:** 요청한 콘텐츠를 표시. 예를 들어 HTML을 요청하면 HTML과 CSS를 파싱하여 화면에 표시함.
4. **통신:** HTTP 요청과 같은 네트워크 호출에 사용됨. 이것은 플랫폼 독립적인 인터페이스이고 각 플랫폼 하부에서 실행됨.
5. **UI 백엔드:** 콤보 박스와 창 같은 기본적인 장치를 그림.
6. **자바스크립트 해석기:** 자바스크립트 코드를 해석하고 실행.
7. **자료 저장소:** 이 부분은 자료를 저장하는 계층이다. 쿠키를 저장하는 것과 같이 모든 종류의 자원을 하드 디스크에 저장할 필요가 있다. HTML5 명세에는 브라우저가 지원하는 '[웹 데이터 베이스](http://www.html5rocks.com/en/features/storage)'가 정의되어 있다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4560a246-6692-4e95-99d5-19dd467ba9b3/Untitled.png)

크롬은 대부분의 브라우저와 달리 각 탭마다 별도의 렌더링 엔진 인스턴스를 유지하는 것이 주목할만하다. 각 탭은 독립된 프로세스로 처리된다.

파이어폭스와 크롬, 사파리는 두 종류의 렌더링 엔진으로 제작되었다. 파이어폭스는 모질라에서 직접 만든 게코(Gecko) 엔진을 사용하고 사파리와 크롬은 웹킷(Webkit) 엔진을 사용한다.

DOM과 CSSOM이 만들어지면 `“attachment”`라는 과정이 시작된다. 웹킷이 렌더 트리를 생성하기 위해 DOM노드와 시각 정보를 연결하는 과정이다.

여기서 렌더 트리는 DOM 요소를 기반으로 만들어지지만, 완전히 대응되지는 않는다. DOM 트리가 문서의 구조를 나타낸다면 렌더 트리는 문서의 시각적 구조를 나타낸다.
예를 들어 스타일에 `display: none` 속성이 있다면 DOM에는 존재하지만 시각적으로는 없기에 렌더 트리에는 할당되지 않는다.

## Reflow와 Repaint 발생

브라우저는 계속 같은 스타일로 존재하지 않는다. 우리가 화면을 클릭하여 새로운 UI를 불러오거나, 창 크기를 조정하거나 할 때에 스타일이 다시 계산된다.

이럴때 발생하는 것이 reflow와 repaint이다.

만약 스타일이나 `DOM` 내부를 변경하는 `DOM API`가 사용됐다면, `DOM`은

1. 무언가 변경됐음을 감지
2. 다시 위의 브라우저 작동 과정을 반복
3. 리렌더링을 진행

## Reflow 과정

reflow는 말그대로 다시 플로우를 정하는 것이다. **레이아웃** 단계로도 불린다.

이 과정에서는 생성된 DOM 노드의 레이아웃 수치(너비, 높이, 위치 등) 변경 시 영향 받은 모든 노드의(자신, 자식, 부모, 조상) 수치를 다시 계산하여**(Recalcurate)**, **렌더 트리를 재생성하는 과정**이다. 또한, `Reflow` 과정이 끝난 후 재 생성된 렌더 트리를 다시 그리게 되는데 이 과정을 `Repaint` 라 한다.

![Reflow 단계](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1fc1bd9c-4a34-4101-afe7-999bec310d09/Untitled.png)

**Reflow 발생 예시코드**

```jsx
function reFlow() {
  document.getElementById("container").style.width = "600px";
  return false;
}
```

**단계별 설명**

1. `width` 수치 변경
2. Recalcurate (변경된 스타일 수치 계산)
3. Layout (Reflow 과정)
4. Paint (Repaint 과정)

## Repaint 과정

repaint 과정은 위에서 말한 것처럼 `Reflow` 과정이 끝난 후 재 생성된 렌더 트리를 다시 그리는 과정이다.

스타일의 모든 변경이 레이아웃 수치에 영향을 받는것은 아니다. 노드의 background-color, visibillty, outline 등의 스타일 변경 시에는 레이아웃 수치가 변경되지 않으므로 Reflow 과정이 생략된 Repaint 과정만 일어나게 된다.

**Repaint 발생 예시코드**

```jsx
function rePaint() {
  document.getElementById("container").style.backgroundColor = "red";
  return false;
}
```

**단계별 설명**

1. `backgroundColor` 색상 변경
2. Recalcurate (변경된 스타일 수치 계산)
3. Paint (Repaint 과정)

## Reflow 과정이 발생하는 상황

- 노드 추가 or 제거
- element 위치 변경
- element 크기 변경 (margin, padding, border, width, hdight 등)
- 텍스트 내용 변경, 이미지 변경 (크기가 다른 이미지로 변경 시)
- 페이지 초기 렌더링 시 (최초 Layout 과정)
- 윈도우 창 resizing 시

## Reflow 최적화 방법

reflow는 비용을 발생시키는 절차이므로 가능한 안 하는 것이 성능 측면에서 유리하다. 최적화할 수 있는 방안을 알아보자.

### 1. 스타일을 변경할 경우 가장 하위 노드의 클래스를 변경한다.

DOM 노드의 크기 또는 위치가 변경되면 하위 노드와 상위 노드에도 영향을 미칠 수 있다. 가장 하위 노드의 스타일을 변경하게 될 경우, 전체 노드가 아닌 일부 노드로 reflow 의 영향을 최소화할 수 있다.

**가장 상위 div의 width를 변경할 경우**

```html
<html>
  <head>
    <style>
      .reflow {
        width: 100px;
        height: 100px;
        background-color: blue;
        transition-duration: 2s;
      }
      .reflow div {
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div class="reflow">
      <div>
        ...
        <div></div>
        ...
      </div>
    </div>
    <script>
      document.querySelector(".reflow").addEventListener("click", (event) => {
        document.querySelector(".reflow").style.width = "200px";
      });
    </script>
  </body>
</html>
```

Performance 패널에서 reflow div를 클릭했을 때 레이아웃이 그려지는 시간을 측정해보았다. 레이아웃에 6.8ms 시간이 소요된 것을 볼 수 있다.

![1-1. 최상위 노드](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3519075d-ad36-40fb-b0bd-d2bd72038eca/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-01-02_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_5.40.24.png)

**가장 하위 div의 width를 변경할 경우**

```html
<html>
  <head>
    <style>
      .reflow {
        width: 100px;
        height: 100px;
        background-color: blue;
        transition-duration: 2s;
      }
      .reflow div {
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div>
      <div>
        ...
        <div class="reflow"></div>
        ...
      </div>
    </div>
    <script>
      document.querySelector(".reflow").addEventListener("click", (event) => {
        document.querySelector(".reflow").style.width = "200px";
      });
    </script>
  </body>
</html>
```

가장 하위의 div에 width 변경 이벤트를 달아주었더니 레이아웃에 4.7ms 시간이 소요된 것을 볼 수 있다.

![1-2. 최하위 노드](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6e7e2a90-ede0-4dee-a8bf-003df5fbea2f/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-01-02_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_5.40.42.png)

![1-3. 중간 노드](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4bf0bdbe-efa3-4a99-8fbb-fd0577b4ab35/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-01-02_%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB_5.46.17.png)

혹시 몰라 중간 노드에도 이벤트를 걸어보았다. 이때는 7.0ms가 소요됐다.

**최상위** 노드에서 reflow가 발생: **6.8ms**

**최하위** 노드에서 reflow가 발생: **4.7ms**

최상위 노드에서보다 **최하위 노드에서 더 적은 reflow 시간이 소모**되는 것을 알 수 있다.

### 2. 인라인 스타일을 사용하지 않는다.

인라인 스타일은 HTML이 파싱될 때, 레이아웃에 영향을 미쳐 추가 reflow를 발생시킨다.

여기서 인라인 스타일은 HTML에 직접 CSS 스타일을 적용시키는 것을 말한다.

관심사 분리도 제대로 이루어지지 않기 때문에 유지보수 측면에서도 피하는 것이 좋다.

**인라인 스타일 사용 O**

```html
<html>
  <body>
    <div
      class="reflow"
      style="
        width: 100px;
        height: 100px;
        background-color: blue;
        transition-duration: 2s;
      "
    >
      <div style="width: 100%; height: 100%">
        ...
        <div style="width: 100%; height: 100%"></div>
        ...
      </div>
    </div>
    <script>
      document.querySelector(".reflow").addEventListener("click", (event) => {
        document.querySelector(".reflow").style.width = "200px";
      });
    </script>
  </body>
</html>
```

![2-1. 인라인 사용 O](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/13ab699b-966d-4448-9efa-0dde8679f3d2/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-01-02_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.14.38.png)

하단의 민트색 글씨의 로드를 보면, 657ms가 소요되었다.

**인라인 스타일 사용 X**

```html
<html>
  <head>
    <style>
      .reflow {
        width: 100px;
        height: 100px;
        background-color: blue;
        transition-duration: 2s;
      }
      .reflow div {
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div class="reflow">
      <div>
        ...
        <div></div>
        ...
      </div>
    </div>
    <script>
      document.querySelector(".reflow").addEventListener("click", (event) => {
        document.querySelector(".reflow").style.width = "200px";
      });
    </script>
  </body>
</html>
```

![2-2. 인라인 사용 X](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/7c049f33-806d-43bb-8a88-951ccb952216/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-01-02_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.14.48.png)

2-2. 인라인 사용 X

마찬가지로 하단의 민트색 글씨의 로드를 보면, 647ms가 소요되었다.

인라인 스타일 사용 **O**: **657ms**

인라인 스타일 사용 **X**: **647ms**

많은 차이는 아니지만 인라인 스타일을 사용하지 않았을 때 더 빠르게 DOM이 그려지는 것을 알 수 있다.

### 3. \***\*애니메이션이 있는 노드는 position을 fixed 또는 absolute로 지정한다.\*\***

애니메이션 효과는 많은 reflow 비용을 발생시킨다. 그렇기 때문에 position을 fixed나 absolute로 지정하여 지정된 노드를 전체 노드에서 분리시켜 해당 노드에서만 reflow가 발생하도록 제한시킬 수 있다.

애니메이션 효과를 줘야 하는 노드에 position 속성이 적용될 상황이 아니라면, 애니메이션 시작 시 position 속성 값을 fixed 또는 absolute로 변경하였다가 애니메이션 종료 후 다시 속성을 제거하여 렌더링을 최적화 할 수 있다.

**position absolute, fixed 지정 O**

```html
<html>
  <head>
    <style>
      .reflow {
        position: absolute;
        width: 100px;
        height: 100px;
        background-color: blue;
        transition-duration: 2s;
      }
      .reflow div {
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div>
      <div>
        ...
        <div class="reflow"></div>
        ...
      </div>
    </div>
    <script>
      document.querySelector(".reflow").addEventListener("click", (event) => {
        document.querySelector(".reflow").style.width = "200px";
      });
    </script>
  </body>
</html>
```

![3-1. position absolute](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/3bb83a70-cc92-483b-af0b-ccfbc5b91319/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-01-02_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.33.35.png)

![3-2. position fixed](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/fe6bd1a9-8747-4038-82cc-eee67da020ea/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-01-02_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.37.08.png)

각각 position을 absoulte와 fixed로 지정했을 때 레이아웃에 3.9ms, 4.1ms가 소요된 것을 볼 수 있다.

**position absolute 지정 X**

```html
<html>
  <head>
    <style>
      .reflow {
        width: 100px;
        height: 100px;
        background-color: blue;
        transition-duration: 2s;
      }
      .reflow div {
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div>
      <div>
        ...
        <div class="reflow"></div>
        ...
      </div>
    </div>
    <script>
      document.querySelector(".reflow").addEventListener("click", (event) => {
        document.querySelector(".reflow").style.width = "200px";
      });
    </script>
  </body>
</html>
```

![스크린샷 2023-01-02 오후 8.36.44.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8aa0f674-c4b2-42ec-9e7a-e556fd782216/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-01-02_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_8.36.44.png)

position을 absoulte나 fixed로 지정하지 않았을 경우는 5.8ms가 소요되었다.

**absoulte** 사용: **3.9ms**

**fixed** 사용: **4.1ms**

아무것도 **사용 X**: **5.8ms**

### 4. `<table>` 레이아웃을 피한다.

<table> 태그는 점진적으로 렌더링되지 않고, 모두 로드되고 테이블의 너비가 계산된 후 화면에 그려진다.

콘텐츠의 값에 따라 테이블 너비가 계산되기 때문에, 테이블 콘텐츠의 작은 변경만 있어도 테이블 너비가 다시 계산되고 테이블의 모든 노드들이 Reflow가 발생한다.

`<table>`을 사용할 때 `table-layout: fixed` 값을 지정하는 것이 좋다. 표 크기를 고정하는 것이다. `table-layout: fixed`는 테이블의 콘텐츠의 길이에 따라 테이블의 너비가 계산되는 것이 아니기 때문에, `table-layout`의 기본 값인 `auto`에 비해 성능이 더 좋다.

### 5. **CSS 하위 선택자를 최소화한다.**

CSS 하위 선택자를 최소화하는 것은 Reflow 횟수를 줄이는 방법이 아니라 렌더 트리 계산을 최소화하는 방법에 대한 내용입니다.

```html
<div class="reflow_box">
  <ul class="reflow_list">
    <li>
      <button type="button" class="btn">버튼</button>
    </li>

    <li></li>
    <li>
      <button type="button" class="btn">버튼</button>
    </li>

    <li></li>
  </ul>
</div>
```

```css
/* 잘못된 예 */
.reflow_box .reflow_list li .btn {
  display: block;
}
/* 올바른 예 */
.reflow_list .btn {
  display: block;
}
```

위의 코드와 같이 CSS 하위 선택자를 최소화하는 것이 렌더링 성능에 더 좋다.
렌더 트리는 DOM과 CSSOM이 합쳐져서 만들어진다. DOM은 HTML이 파싱 되어 만들어진 트리이고, CSSOM은 CSS가 파싱 되어 만들어진 트리다. 두 트리를 결합하여 렌더 트리를 만드는데, CSS 하위 선택자가 많아지면 CSSOM 트리의 깊이(Depth)가 깊어지게 되고 결국 렌더 트리를 만드는 시간이 더 오래 걸릴 수 있다.

### 6. \***\*숨겨진 노드의 스타일을 변경한다.\*\***

display: none 으로 숨겨진 노드를 변경할 때는 reflow가 발생하지 않는다. 숨겨진 노드를 표시하기 전에 노드의 컨텐츠를 먼저 변경한 후 화면에 나타내면 reflow를 줄일 수 있다.

### 7. **클래스를 혹은 `cssText` 사용하여 한 번에 스타일을 변경한다.**

스타일을 변경할 때, 스타일을 각각 변경할 경우 추가 Reflow가 발생할 수 있기 때문에 한 번에 스타일을 변경하는 것이 좋다.

```js
let div = document.getElementsByTagName("div");
for (let i = 0; i < div.length; i++) {
  div[i].style.height = "80px";
  div[i].style.backgroundColor = "#00f";
  div[i].style.display = "inline-block";
  div[i].style.overflow = "hidden";
  div[i].style.fontSize = "40px";
  div[i].style.color = "#fff";
}
```

위의 코드는 각각의 스타일을 바꾸는 방식이다.

```js
let div = document.getElementsByTagName("div");
for (let i = 0; i < div.length; i++) {
  // class 사용
  div[i].className = "block";

  // cssText 사용
  div[i].style.cssText =
    "height:80px;background-color:#00f;display:inline-block;overflow:hidden;font-size:40px;color:#fff;";
}
```

위의 코드는 class, `cssText`를 사용하여 한 번에 스타일을 바꾸는 방법이다.

### 8. **DOM 사용을 최소화한다.**

Reflow 비용을 줄이기 위해서 DOM 노드를 사용을 최소화해야 한다. 그 방법 중 하나가 DOM Fragment를 사용하여 DOM을 추가할 때 DOM 접근을 최소화하는 방법이다.

```js
const frag = document.createDocumentFragment();
const ul = frag.appendChild(document.createElement("ul"));

for (let i = 1; i <= 3; i++) {
  li = ul.appendChild(document.createElement("li"));
  li.textContent = `item ${i}`;
}

document.body.appendChild(frag);
```

`createDocumentFragment`를 사용하여 한 번에 DOM을 추가하여 DOM 접근을 최소화할 수 있다.

### 9. 캐시를 활용한다.

브라우저는 레이아웃 변경을 큐에 저장했다가 한 번에 실행하여 Reflow를 최소화한다. 하지만 `offset`, `scrollTop`과 같은 계산된 스타일 정보를 요청할 때마다 정확한 정보를 제공하기 위해 큐를 비우고 모든 변경사항을 적용한다.

```js
// 나쁜 예
for (let i = 0; i < len; i++) {
  el.style.top = `${el.offsetTop + 10}px`;
  el.style.left = `${el.offsetLeft + 10}px`;
}

// 좋은 예
let top = el.offsetTop,
  left = el.offsetLeft,
  elStyle = el.style;

for (let i = 0; i < len; i++) {
  top += 10;
  left += 10;
  elStyle.top = `${top}px`;
  elStyle.left = `${left}px`;
}
```

이런 낭비를 해결하기 위해서 위의 코드와 같이 스타일 정보를 변수에 저장하여 `offset`, `scrollTop` 등의 값 요청(접근)을 최소화하자.

## 참고자료

[NAVER D2](https://d2.naver.com/helloworld/59361)

[Javascript Environment | PoiemaWeb](https://poiemaweb.com/js-browser)

[Reflow와 Repaint에 대하여](https://devowen.com/463)

[Reflow, Repaint을 알아보자!](https://velog.io/@young_pallete/Reflow-Repaint%EC%9D%84-%EC%95%8C%EC%95%84%EB%B3%B4%EC%9E%90)

[Reflow or Repaint(or ReDraw)과정 설명 및 최적화 방법](https://webclub.tistory.com/346)

[[Browser] Reflow와 Repaint](https://beomy.github.io/tech/browser/reflow-repaint/)
