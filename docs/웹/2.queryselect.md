---
layout: page
title: querySelector(), querySelectorAll()
parent: 웹
nav_order: 2
has_children: false
permalink: /web/queryselector
---

# querySelector()

`document.querySelector()` 는 입력한 선택자와 일치하는 문서 내의 첫 번째 element를 반환한다. 일치하는 요소가 없다면 null을 반환한다. 괄호 안에 들어가는 매개변수는 유효한 CSS 선택자여야한다. 

`document.querySelector()`

```
document.querySelector("p");
document.querySelector(".class");
document.querySelector("#id");
```

매개변수로 "p" 를 줬을 때는, HTML에서 `<p>`태그를 가진 요소들 중에 가장 첫 번째 노드를 리턴한다. 클래스 이름을 통해 찾고 싶을 때는 `.class` 와 같이 `.` 을 붙여준다. `id`를 통해 찾을 때는 `#` 을 붙여준다. 

# querySelectorAll()

`querySelector()`가 한 개의 요소를 반환했다면, `querySelectorAll()`은 주어진 CSS 선택자와 일치하는 모든 요소를 반환한다. 이때, 반환 타입은 리스트 타입이다. 따라서 인덱스를 통해 조작할 수 있다.

_html_  

```
<p class="test">test1</p>
<p class="test">test2</p>
<p class="test">test3</p>
```

_js_

```
let test = document.querySelectorAll(".test");

function testFunc(){
    for(let i = 0; i < test.length; i++){
        test[i].innerHTML = i;
    }
}
```

`.test`라는 클래스명을 가진 `<p>` 태그가 3개 있다. JavaScript에서 `querySelectorAll(".test")`을 통해 `<p>` 태그 3개의 요소를 test 변수에 저장한다.

그럼 test변수는 마치 배열과 같은(하지만 배열과는 다름) 역할을 한다. `test[i]`와 같이 인덱스를 통해 원하는 요소에 접근할 수 있고 `length`라는 속성도 제공되고 있다.

여기서, `innerHTML`은 지정한 요소 안의 텍스트를 가져오거나 바꿀 수 있다.
