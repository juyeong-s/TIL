---
layout: page
title: css의 단위
parent: Css
nav_order: 2
has_children: false
permalink: /css/unit/
---

# CSS의 단위

단위의 종류는 알고 있었지만 확실한 차이를 잘 몰라서 이번 글을 작성하면서 공부하기 위해 작성하게 됐다.

## 절대 길이 단위  
다음은 모두 절대 길이 단위이며, 다른 것과 관련 없이 항상 동일한 크기로 보여진다.  
| 단위 | 이름 |
| --- | --- |
| cm | 센티미터 |
| mm | 밀리미터 |
| in | 인치 |
| pc | Picas |
| pt | 포인트 |
| px | 픽셀 |

보통 이 중 사용하는 단위는 `px(픽셀)`이다.

## 상대 길이 단위

상대 길이 단위는 다른 요소와 관련이 있다. 상대 단위를 사용하면 텍스트나 다른 요소의 크기가 페이지의 다른 요소에 비례하여 조정될 수 있다. 아래 웹 개발에 유용한 단위이다.  

| 단위 | 관련사항 |
| --- | --- |
| em | 요소의 글꼴 크기 |
| ex | 요소 글꼴의 x-height |
| rem | 루트 요소의 글꼴 크기 |
| lh | 요소의 라인 높이 |
| vw | viewport 너비의 1% |
| vh | viewport 높이의 1% |
| vmin | viewport 의 작은 치수의 1% |
| vmax | viewport 의 큰 치수의 1% |


## em과 rem(root em)

`em` 과 `rem` 은 박스에서 텍스트로 크기를 조정할 때 쓰이는 단위이다.
`em` 단위는 **"부모 요소의 글꼴 크기"** 를 의미한다.  
`1.2em`은 각 부모 글꼴 크기의 1.2배를 의미한다. 아래 예시를 보자.

_html_  

```
<body>
    <div class="test">Test</div>
</body>
```

_css_  

```
body {
    font-size: 14px;
}
div {
    font-size: 1.2em; // calculated at 14px * 1.2, or 16.8px
}
```

이 예제는 상위 html의 14px을 기준으로 1.2배의 폰트 사이즈로 표현된다. 결과적으로 16.8px의 크기가 된다.

그런데 em으로 정의한 폰트 사이즈를 각각의 자식에 선언한다면 어떤 일이 생길까?  
아래 html에 위와 같은 css코드를 적용해보았다.  

_html_  

```
<div>
    Test (14 * 1.2 = 16.8px)
    <div>
        Test (16.8 * 1.2 = 20.16px)
        <div>
            Test (20.16 * 1.2 = 24.192px)
        </div>
    </div>
</div>
```

_결과_
![image](https://user-images.githubusercontent.com/63364990/154655543-40b362a6-c22e-47d4-95f2-3fd5682dbf74.png)

각각의 div는 각 부모의 폰트 사이즈를 상속받아 점점 커지게 된다.

이런 경우 바로 rem 단위를 사용하면 된다. rem의 "r"은 바로 "root(최상위)"를 뜻한다.  
최상위 태그(요소)에 지정한 것을 기준으로 삼으며, 보통 최상위 태그는 html태그이다.

이전 html에 아래 css를 적용해보면 세 div는 모두 16.8px의 폰트 사이즈로 표현될 것이다.

_css_  

```
html {
    font-size: 14px;
}

div {
    font-size: 1.2rem;
}
```

## vh & vw (vertical height & vertical width)  

반응형 웹디자인 테크닉은 퍼센트 값에 상당히 의존하고 있다. 하지만 CSS의 퍼센트 값이 모든 문제를 해결할 좋은 방법은 아니다. SS의 너비 값은 가장 가까운 부모 요소에 상대적인 영향을 받는다.  

vh와 vw 단위로 타켓 요소의 너비값과 높이값을 뷰포트의 너비값과 높이값에 맞게 사용할 수 있다.  
vh 요소는 높이값의 100분의 1의 단위이다. 예를 들어 브라우저 높이값이 900px일때 1vh는 9px이 된다. 그와 유사하게 뷰포트의 너비값이 750px이면 1vw는 7.5px이 된다.  


스크린의 너비값에 꽉 차는 헤드라인을 만든다고 가정해보자. vw로 폰트 사이즈를 지정하면 해당 사이즈는 브라우저의 너비에 맞춰 변하게 된다.

_html_  

```
<h2>Settle down? Are you kidding?
<br>I’m at the top of my game!</h2>
<p><em>- Elastigirl</em></p>
```

_css_  

```
body {
  background: #ff5722;
  padding: 1em 0;
  color: #64ffda;
}

h2 {
  font-size: 6vw;
  margin-bottom: .2em
}
```

브라우저 크기를 줄였다 늘였다 해보면 크기가 동일한 것을 알 수 있다.  
<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="VwrQjYO" data-user="JuYeong2360" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/JuYeong2360/pen/VwrQjYO">
  Untitled</a> by 신 주영  (<a href="https://codepen.io/JuYeong2360">@JuYeong2360</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## vmin & vmax  

vh와 vw이 늘 뷰포트의 너비값과 높이값에 상대적인 영향을 받는다면 vmin과 vmax는 너비값과 높이값에 따라 최대, 최소값을 지정할 수 있다.  

예를 들면 브라우저가 `1100px 너비`, `700px 높이`일때 `1vmin`은 `7px`이 되고 `1vmax`는 `11px`이 된다.

너비값이 다시 `800px`이 되고 높이값이 `1080px`이 되면 **vmin**은 `8px`이 되고 **vmax**는 `10.8px`이 된다.

그렇다면 언제 이런 값들을 사용할까?  
예를 들어 터치화면 양 변에 가득차는 정사각형 요소를 만들때는 이렇게 정의히면 된다.  

_css_

```
.box {
    height: 100vmin;
    width: 100vmin;
}
```

![image](https://t1.daumcdn.net/cfile/tistory/24305748573D314005)

만약 커버처럼 뷰포트 화면에 보여야 하는(모든 네 변이 스크린에 꽉 차 있는) 경우에는 같은 값을 vmax로 적용하면 된다.

_css_

```
.box {
    height: 100vmax;
    width: 100vmax;
}
```

![image](https://t1.daumcdn.net/cfile/tistory/23144F4A573D316534)

이런 규칙들을 잘 적용하면 뷰포트에 맞는 유연한 방식으로 사이즈를 조절할 수 있다!

**추가**

- vw, vh, vmin, vmax
    - 뷰포트(Viewport)를 기준으로 하는 길이(length) 값으로, 문서 또는 모바일 기기 에서 볼 수 있는 부분의 크기를 기준으로 크기를 설정한다.

각 속성을 풀네임은 다음과 같다.  
- VW(Viewport Width) : 뷰포트 너비의 1% 길이와 동일하다.
- VH(Viewport Height) : 뷰포트 높이의 1% 길이와 동일하다.
- VMIN(Viewport Minimum) : 뷰포트 너비 또는 높이를 기준으로 하는 최소 값
- VMAX(Viewport Maximum) : 뷰포트 너비 또는 높이를 기준으로 하는 최대 값

즉, 화면 크기에 상대적으로 변경되는 단위가 뷰포트 단위이다.

