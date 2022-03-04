---
layout: page
title: fetch()
parent: 웹
nav_order: 1
has_children: false
permalink: /web/fetch
---

# fetch()

## API(Application Programming Interface)

- 응용프로그램을 사용할 수 있도록 운영체제나 프로그래밍 언어가 제공하는 기능을 제어할 수 있게 만든 인터페이스

API는 클라이언트와 서버 사이에서 상호작용을 할 수 있게 도와주는 중간 매개체이다.  
클라이언트가 서버에게 어떤 자료를 요청하는 것을 전달하거나, 서버로부터 받은 응답(요청받았던 자료)을 다시 클라이언트에게 전달해준다. 서버로부터 받는 이 응답은 서버가 전달하는 다양한 형태(JSON, HTML plain text 등)로 받게 된다.

또한, API는 서버와 DB에 대한 출입구 역할을 하며 허용된 사람들에게만 접근성을 부여한다.

## fetch API

fetch API는 다양한 네트워크 요청 API중 하나로 특정 url로부터 정보를 받아오는 api이다. 이 과정은 **비동기**로 이뤄지기 때문에 경우에 따라 시간이 걸리는 작업일 경우, 그 정보가 표시될 때까지 로딩창을 띄우는 경우가 많다.

웹사이트에 필요한 정보만 업데이트르르 하기 위해 원격 url로부터 원하는 정보를 불러올 수 있다. 그리고 이 정보를 특정 DOM element에 업데이트 시킬 수 있다.

## fetch 사용법

**fetch()함수**는 첫번째 인자로 `url`, 두번째 인자로 `옵션` 객체를 받고 `Promise`객체를 반환한다.  
- url : 접근하고자 하는 url
- option : 선택 매개변수, `method`나 `header` 등을 지정할 수 있음
  - option에 아무것도 넘기지 않으면 요청은 GET 메소드로 진행되어 url로부터 콘텐츠가 다운로드 된다.  
반환된 객체는 API호출이 **성공**했을 경우에는 **응답(response)객체**를 resolve하고, **실패**했을 경우에는 **예외(error)객체**를 reject한다.

-> 반환받은 `Promise객체(Response)`는 단순한 `HTTP Response`이다. 실제 JSON이 아니다.  
이 reponse로 부터 원하는 것을 가져오기 위해 추가적으로 **json()메서드**를 이용한다.


```
fetch(url, options)
  .then((reponse) => reponse.json())
  .then((json) => console.log(json));
```

다음과 같이 사용할 수 있다.  
첫번째 `.then()`에서 reponse를 json 개체로 변환시키고, 두번째 `.then()`에서 전달받은 json개체를 콘솔에 출력하는 코드이다.

## POST 요청

GET 이외의 요청을 보내려면 추가 옵션을 사용해야 한다.

- `method` - HTTP 메서드
- `body` - 요청 본문으로 다음 항목 중 하나여야 한다.
  - 문자열(예: JSON 문자열)
  - `FormData`객체 – `form/multipart` 형태로 데이터를 전송하기 위해 쓰인다.
  - `Blob`나 `BufferSource` – 바이너리 데이터 전송을 위해 쓰인다.

대부분은 JSON을 요청 본문에 실어 보내게 된다.  
user 객체를 본문에 실어 보내는 예시를 살펴보자.

```
const user = {
  name: 'Shin',
  surname: 'Smith'
};

const response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  body: JSON.stringify(user)
});

const response = await response.json();
```

POST 요청을 보낼 때 주의할 점은 요청 본문이 문자열일 때 Content-Type 헤더가 text/plain;charset=UTF-8로 기본 설정된다는 점이다.

하지만 위 예시에선 `JSON`을 전송하고 있기 때문에 headers에 application/json을 설정해 주었다.
