---
layout: page
title: 복합 selector
parent: Css
nav_order: 1
has_children: false
permalink: /css/selector/
---

# 복합 Selector  
HTML 문서에 스타일링을 하기 위해서는 HTML요소를 선택해야한다. 기본적인 요소 선택 방법에는 id, class, 태그 등이 있다.  
이번 글에서는 기본 셀렉터가 아닌 복합 셀렉터에 대해서 알아보자!  

## 가상 클래스 선택자?  
먼저, 기본적인 단어부터 알고가자.  
선택자 뒤에 `:가상이벤트`를 붙이면 특정 이벤트마다 적용 할 스타일을 설정 할 수 있으며, 이를 가상 클래스라고 한다.  
- `:link` - 방문한 적이 없는 링크
- `:visited` - 방문한 적이 있는 링크
- `:hover` - 마우스를 롤오버 했을 때
- `:active` - 마우스를 클릭했을 때
- `:focus` - 포커스 되었을 때 (input 태그 등)
- `:first` - 첫번째 요소
- `:last` - 마지막 요소
- `:first-child` - 첫번째 자식
- `:last-child` - 마지막 자식
- `:nth-child(2n+1)` - 홀수 번째 자식  

## 1\. 자식 셀렉터 (>)  
- 자식 셀렉터는 기호 `>`를 사용한다.  
아래 예시를 보자.  

```
// html
<div>
  <p>Hello</p>
  <a>HELLO
    <p>HI</p>
  </a>
  <p>bye</p>
</div>
```  

```
// css
div > p{
    color: red;
}
```   

**결과**  
![image1](https://user-images.githubusercontent.com/63364990/153417508-78c23321-9a83-44e0-a329-030cd49d4880.png)  
- 결과를 보면, `<a>`태그 아래의 `<p>`태그는 영향을 받지 않고, `<div>`밑에 있는 모든 `<p>`태그는 `red` 색으로 폰트 색상이 변했다.

## 2\. 후손 셀렉터 (띄어쓰기)  
- 후손 셀렉터는 띄어쓰기로 표현한다.  
아래 예시를 보자.  

```
// html
<div>
  <p>Hello</p>
  <a>HELLO
    <p>HI</p>
  </a>
  <p>bye</p>
</div>
```  

```
// css
div p{
    color: red;
}
```  

**결과**  
![image2](https://user-images.githubusercontent.com/63364990/153418232-e88485f2-2d57-45c6-8a32-9da794fe0e67.png)  
- 결과를 보면, `<div>` 태그 아래에 있는 모든 `<p>`에 대해서 폰트를 `red` 색으로 변했다.
- `<a>` 태그 아래에 있는 `<p>`태그도 영향을 받는다는 것을 확인할 수 있다.  

## 3\. 그룹 셀렉터 (,)  
- 여러 셀렉터에 대해 공통된 스타일을 주고 싶은 경우에 사용한다.  
- `,`(쉼표)로 표현한다.  
아래 예시를 보자.  

```
// html
<div>
  <p>Hello</p>
  <a>HELLO
    <p>HI</p>
  </a>
  <p>bye</p>
</div>
```  

```
// css
div, p, a{
    color: red;
}
```  

**결과**  
![image3](https://user-images.githubusercontent.com/63364990/153418905-f13dc8a3-18c7-433b-aa50-142f15455fdb.png)  
- `<div>`,`<p>`, `<a>` 태그 모두 폰트를 red 색으로 변화시켰다.
- 결과를 보면 `<div>`, `<p>`, `<a>` 태그 모두 스타일이 적용된 것을 확인할 수 있다.  

## 4\. 특정 태그의 id값 (#)  
- 여러 태그 중 특정 id를 가지고 있는 태그에만 스타일을 적용할 때 사용한다.
- `#`으로 표현한다.  
아래 예시를 보자.  

```
// html
<div>
  <p>Hello</p>
  <a>HELLO
    <p id="foo">HI</p>
  </a>
  <p>bye</p>
</div>
```  

```
// css
p#foo{
    color: red;
}
```   

**결과**  
![image4](https://user-images.githubusercontent.com/63364990/153422582-e1f6093d-8b00-465a-8317-9bfa4d4eac53.png)  
- 여러 <p> 태그 중 id값이 foo인 <p> 태그에 대해서만 스타일이 적용됐다.
- 만약 class에 스타일을 부여하고 싶다면, `p.foo`로 Css 셀렉터를 설정하면 된다.

## 5\. 인접 형제 셀렉터 (+)  
A의 다음 형제 요소 중 가장 인접한 B 하나만 선택한다.  
- '+' 를 셀렉터의 기호로 사용한다.  

```
// html
<ul>
  <li>딸기</li>
  <li>수박</li>
  <li class="orange">오렌지</li>
  <li>망고</li>  <!-- 선택 -->
  <li>사과</li>
</ul>
```  

```
// css
.orange + li {
  color: red;
}
```  

**결과**  
![image5](https://user-images.githubusercontent.com/63364990/153424602-21b8b20a-3574-4dc5-badc-66dfcbb17c59.png)  
- orange 클래스를 가지고 있는 태그 다음에 나타나는 li 태그에만 스타일이 적용됐다.  

## 6\. 일반 형제 셀렉터 (~)  
A의 다음 형제 요소 B를 모두 선택한다.  
- '~' 를 셀렉터의 기호로 사용한다.  

```
// html
<ul>
  <li>딸기</li>
  <li>수박</li>
  <li class="orange">오렌지</li>
  <li>망고</li>  <!-- 선택 -->
  <li>사과</li>  <!-- 선택 -->
</ul>
```  

```
// css
.orange ~ li {
  color: red;
}
```  

**결과**  
![image6](https://user-images.githubusercontent.com/63364990/153425280-c595ffdb-299f-4b16-951f-e30223cfa50a.png)  
- `orange` 클래스의 일반 형제는 딸기, 수박, 망고, 사과 등이지만 **"다음"**에 있는 형제들이 선택되기 때문에 망고와 사과만 선택된다.  

## 7\. 가상클래스 셀렉터
- 콜론(`:`) 기호가 한 개 붙어있는 셀렉터이다.  
> 콜론이 두 개(`::`)가 붙어있는 건 가상 요소 선택자.  

아래 언급되는 `hover`, `active`, `focus`는 `event`에 가까운 선택자이다. 

### 7.1\. hover  
- E에 마우스(포인터)가 올라가 있는 동안에만 E를 선택한다. (`E:hover`)  

```
// html
<a href=="http://google.com">Google!</a>
<div class="box"></div>
```  

```
// css
.box {
  width: 100px;
  height: 100px;
  background: tomato;
  /* box가 변할 때 0.4초동안 애니메이션을 넣어줌 */
  transition: 0.4s
}

a:hover {
  font-weight: bold;
  font-size: 20px;
}
.box:hover {
  width: 200px;
  background: green;
}
```  

**결과**  
![image7](https://user-images.githubusercontent.com/63364990/153426512-f5661774-803f-42d0-81fd-a563ceb6e0d9.png)  
![image8](https://user-images.githubusercontent.com/63364990/153426891-c8798bb8-7839-4393-8cee-84285f6c8662.png)  
![image9](https://user-images.githubusercontent.com/63364990/153426896-60d5c9e5-286f-4be0-992f-02771e3d9911.png)  


### 7.2\. active  
- E를 마우스로 클릭하는 동안에만 E를 선택한다. (`E:active`)  

```
// html
<div class="box"></div>
```  

```
// css
.box {
  width: 100px;
  height: 100px;
  background: tomato;
  transition: 0.4s;
}

.box:active {
  width: 200px;
  background: yellowgreen;
}
```  

**결과**  
![image10](https://user-images.githubusercontent.com/63364990/153427360-4a12abdd-8667-450c-99bc-95e6c882c536.png)  
![image11](https://user-images.githubusercontent.com/63364990/153427415-d5207c3d-5e14-4898-a34b-c1f5402ab0da.png)  


### 7.3\. focus  
- E가 포커스 된 동안에만 E를 선택한다. (`E:focus`)  
- 대화형 콘텐츠(`input`, `img`, `tabindex`가 부여된 요소)에서 사용 가능하다.

```
// html
<input type="text">
```  

```
// css
input {
  width: 100px;
  outline: none;
  border: 1px solid lightgray;
  padding: 5px 10px;
  /* padding: 상하 좌우; */
  transition: 0.4s;
}

input:focus {
  border: 4px solid lightblue;
  width: 200px;
}
```  

**결과**  
![image12](https://user-images.githubusercontent.com/63364990/153428050-42ea26b5-2d0d-408e-9524-dfac01cc6726.png)  


## 8\. :first-child  
부모 요소 안에 있는 첫번째 자식만 선택한다. (`E:first-child`)  

```
// html
<ul class="fruits">
  <li>item1</li> <!-- 선택 -->
  <li>item2</li>
  <li>item3</li>
  <li>item4</li>
  <li>item5</li>
</ul>
```  

```
// css
.fruits li:first-child {
  color: red;
}
```  

**결과**  
![image13](https://user-images.githubusercontent.com/63364990/153430057-46e7d5bc-c8ce-4f46-b71d-5a9a1c5139bb.png)  

## 9\. :last-child  
부모 요소 안에 있는 마지막 자식만 선택한다. (`E:last-child`)  

```
// html
<ul class="fruits">
  <li>item1</li> 
  <li>item2</li>
  <li>item3</li>
  <li>item4</li>
  <li>item5</li> <!-- 선택 -->
</ul>
```  

```
// css
.fruits li:last-child {
  color: red;
}
```  

**결과**  
![image14](https://user-images.githubusercontent.com/63364990/153429601-86b72937-d6c6-470c-80b8-fc633b917bef.png)  

## 10\. :nth-child(n)  
부모 요소 안에 있는 n번재 자식을 선택한다. (`E:nth-child(n)`)   

### 1번 예제  

```
// html
<ul class="fruits">
  <li>item1</li> 
  <li>item2</li> <!-- 선택 -->
  <li>item3</li>
  <li>item4</li>
  <li>item5</li> 
</ul>
```  

```
// css
.fruits li:nth-child(2) {
  color: red;
}
```  

**결과**  
![image15](https://user-images.githubusercontent.com/63364990/153430479-dab891c3-45ac-4a60-976e-abacb5f0afbd.png)  

### 2번 예제  
다음과 같이 사용할 수도 있다.  

```
.fruits li:nth-child(2n) {
  color: red;
}
```  

**결과**  
![image16](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbxc9md%2FbtrdMJFtTFp%2FdS69TvKnGvH0fZcmqVkTG1%2Fimg.png)  

### 3번 예제  
아래 예제를 보면 아무것도 선택되지 않았는데, 그 이유는 `.fruits`의 첫번째 자식요소가 `<p></p>`가 아니기 때문이다.  

```
// html
<div class="fruits">
  <div>딸기</div>
  <p>사과</p>
  <p>망고</p>
  <span>오렌지</span>
</div>
```  

```
// css
.fruits p:nth-child(1) {
  color: red;
}
```  

### 4번 예제  
아래 css에서 `nth-child`에 후손선택자(띄어쓰기)가 적용되었기 때문에 `.box-group`의 모든 요소들 중 첫번째인 것들 모두를 적용시키게 된다.  

```
// html
<div class="box-group">
  <div>1</div>
  <div>2</div>
  <div>3
    <div>3-1</div>
    <div>3-2</div>
    <div>3-3</div>
  </div>
</div>
```  

```
// css
.box-group div:nth-child(1) {
  color: red;
  font-weight: bold;
}
```  

**결과**  
![image17](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FcxESkN%2FbtrdOLRcvgJ%2FJ9MVktrTCOtT4wdRRdBVy0%2Fimg.png)  
- `.box-group`의 첫번째 자식 `<div>1</div>`과 ` <div>3`의 첫번째 자식인 `<div>3-1</div>`이 선택됐다.  

### 5번 예제 
만약 `3-1 요소`가 `<div>`에서 `<p>`로 바뀌었을 경우 :nth-child(1) 앞에 div를 제거해주고 적용시키면 된다.  
그러면 태그와 상관없이 box-group의 모든 요소들 중 첫번째인 요소들이 모두 선택되는 것을 확인할 수 있다.  

```
// html
<div class="box-group">
  <div>1</div>
  <div>2</div>
  <div>3
    <p>3-1</p>
    <div>3-2</div>
    <div>3-3</div>
  </div>
</div>
```  

```
// css
.box-group :nth-child(1) {
  color: red;
  font-weight: bold;
}
```  

**결과**  
![image18](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FE2eTH%2FbtrdQCftIHj%2FOxQoKUSfq9qkBX1oF3iAI1%2Fimg.png)  


## 11\. 부정 셀렉터 (:not)  
- E:not(s) 라고 하면, E를 선택하는데 s라는 선택자를 제외하고 선택하겠다는 의미이다.  

```
// html
<ul class="fruits">
  <li>딸기</li>
  <li class="strawberry">사과</li>
  <li>망고</li>
  <li>오렌지</k>
</ul>
```  

```
// css
.fruits {
  font-size: 40px;
  font-weight: bold;
}

.fruits li:not(.strawberry) {
  color: red;
}
```  

**결과**  
![image19](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FFswMY%2FbtrjVCtPORK%2Fmbv00cd4wdyZ6pJ355lmj1%2Fimg.png)  

---  
이상으로 복합 셀렉터에 대해 알아봤당. 이 외에도 복합 셀렉터는 엄청 많다..