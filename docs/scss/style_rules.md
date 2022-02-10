---
layout: page
title: Scss 스타일 규칙
parent: Scss
nav_order: 1
has_children: false
permalink: /scss/rules/
---

# Scss 스타일 규칙  
스타일 규칙은 CSS와 마찬가지로 Sass의 기초이다. selector로 스타일을 지정할 요소를 선택하고 속성을 선언한다.

**Scss**  
```
.button {
  padding: 3px 10px;
  font-size: 12px;
  border-radius: 3px;
  border: 1px solid #e1e4e8;
}
```

**Sass**  
```
.button
  padding: 3px 10px
  font-size: 12px
  border-radius: 3px
  border: 1px solid #e1e4e8
```  
둘의 차이는 중괄호(`{}`)와 세미콜론(`;`)이 있냐 없냐다.  

## 🧸1\. Nesting(중첩)  
html의 parent-child 관계에 따라 스타일 속성들도 네스팅할 수 있다. 불필요한 클래스를 만들거나 선택자를 한 줄에 길게 써야 해야 하는 수고를 덜어준다.  

**Css**  
```
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
nav li {
  display: inline-block;
}
nav a {
  display: block;
  padding: 6px 12px;
  text-decoration: none;
}
```  
**Scss**  
```
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li { display: inline-block; }

  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```

## 📁2\. Selector 목록  
Nesting규칙은 Selector 목록을 처리하는데 유용하다. 각 복합 선택기(쉼표 사이의 선택기)는 개별적으로 중첩된 선택기 목록으로 다시 결합된다. 아래 예시를 보자.  
**Css**  
```
.alert ul, .alert p, .warning ul, .warning p {
  margin-right: 0;
  margin-left: 0;
  padding-bottom: 0;
}
```

**Scss**  
```
.alert, .warning {
  ul, p {
    margin-right: 0;
    margin-left: 0;
    padding-bottom: 0;
  }
}
```  
- 각 `.alert`와 `.warning` 선택기는 `ul` 와`p` 선택기를 복합 선택기로 가지고 있다.  

## 🕹3\. Selector 조합기  
조합기를 사용하는 선택자를 중첩할 수도 있다.  
아래 예시를 보자.  

**Css**  
```
ul > li {
  list-style-type: none;
}

h2 + p {
  border-top: 1px solid gray;
}

p ~ span {
  opacity: 0.8;
}
```

**Scss**  
```
ul > {
  li {
    list-style-type: none;
  }
}

h2 {
  + p {
    border-top: 1px solid gray;
  }
}

p {
  ~ {
    span {
      opacity: 0.8;
    }
  }
}
```  

#### 가상 선택자를 쓰기 위해서는 해당 선택자의 네스트 안에 `&`을 쓰고 원하는 가상 선택자를 붙여 주면 된다.  
> 가상 선택자에 대한 내용은 [여기서](https://juyeong-s.github.io/TIL/css/selector/) 볼 수 있다!  

**Scss**  
```
.form {
  color: gray;
  font-size: 14px;

  &:focus-within {		//form:focus-within
    border: 2px solid black;
  }
}
```

### 🍭&의 유용성  
`&`은 네스팅하고 있는 셀렉터를 치환하는데, `'문자'`를 치환하기 때문에 클래스명을 쪼개서 쓸 수도 있다.  
예를 들어, `btn`, `btnBlue`, `btnRed`라는 클래스명을 가지는 변수들이 있다면, `btn`으로 네스팅한 중괄호 안에 공통 속성들을 나열하고, 개별 속성은 해당 네스팅 내에 `&Blue`, `&Red`로 또 네스팅해서 추가할 수 있다는 뜻이다.  

**Scss**  
```
.btn {
    width: 200px;
    height: 60px;
    border-radius: 30px;
    
    &Blue {			// .btnBlue
      background-color: blue;
    }
    
    &Red {			// .btnRed
      background-color: red;
    }
}
```  

## 🍒4\. 속성 네스팅  
셀렉터뿐만 아니라 스타일 속성도 네스팅이 가능하다. `margin`, `border`, `font`등 하나로 묶을 수 있는 여러 스타일 값들을 다음과 같이 네스팅하면 된다.  

**Scss**  
```
nav {
  margin: {
    top: 20px;
    left: 50px;
  }

  border: {
    color: darkslategray;
    radious: 50%;
    style: dashed;
  }
  
  font: {
    size: 12px;
    color: purple;
    faimily: 'Courier New', Courier, monospace; 
  }
}
```  
원래 css라면, 다음과 같이 나열했을 것이다.  
```
nav {
  margin-top: 20px;
  margin-left: 50px;
}
```  

## 🍎5\. $변수명: 속성값  
자주 쓰이거나 의미 있는 속성값들을 원하는 이름으로 변수에 담아서 쓸 수 있다.  
여기도 자바스크립트 변수처럼 `global`과 `local`의 개념이 적용되기 때문에  
- 중괄호 밖에서 선언한 변수는 아무데서나 쓸 수 있고,  
- 중괄호 안에서 선언한 변수는 해당 중괄호 내에서만 사용 가능하다.  

**Scss**  
```
//변수 선언
$mainColor : #ffffff			
$profileImg: "./images/profile.png"


//변수 사용
div {
  color: $mainColor;
  background-image: url($profileImg)
}
```

## 🍊6\. @import "파일경로"  
다른 scss 파일의 스타일을 가져다 쓰고 싶을 때 모듈처럼 임포트해서 쓸 수 있다. 통 _reset.scss 등 범용적으로 쓰이는 스타일시트가 있는 경우 유용하다.  

**Scss**  
_reset.scss_
```
h1 { margin: 30px 0px; }
```  
```
@import "reset.scss";
p { font-size: 12px; }
```  
**Css**  
```
h1 {
  margin: 30px 0px;
}
p {
  font-size: 12px
}
```  
Scss 파일을 가져오면 그 파일의 내용이 현재 파일에 추가된다.  

### 🍋6.1\. 변수와 Mixin  
Scss 파일을 가져왔다면, 가져온 파일에 있는 변수와 Mixin을 사용할 수 있다.  
```
// reset.scss
$jb-color: red;
```  
**Scss**  
```
@import "reset.scss";
h1 { color: $jb-color; }
```  

## 🥑7\. @extend 셀렉터  
다른 스타일을 상속 받는 것처럼 사용하는 것이 가능하다.  
`@extend <가져올 스타일>;`  

**Scss**  
```
.btn {
  display: inline-block;
  vertical-align: middle;
  min-width: 60px;
  height: 30px;
  background: gray;
  color: #000;
}

// 흰색 버튼
.btn-white {
  @extend .btn;
  backgroud-color: white;
}

// 빨간 버튼
.btn-red {
  @extend .btn;
  backgroud-color: red;
}
```  
-  기본적인 버튼의 스타일(`.btn`)을 모두 갖게 하고 색상만 다르도록 정의했다.  

## 🍇8\. @mixin과 @include
먼저 두 가지 `@mixin`와 `@include`는 항상 함께 사용된다.  
@mixin을 사용하면 스타일을 그룹화하여 변수처럼 사용할 수 있다. 즉 여러개의 스타일을 설정해두었다가 한번에 적용하는 것이 가능하다.  
이때 **설정**에는 `@mixin`을 그리고 **사용**할 때는 `@include`를 사용한다.  


### 🍆8.1\. @mixin 정의하기  
`@mixin`은 다음과 같은 형식으로 정의한다.  
```
@mixin mixin_Name {
  // code
}
```  
인자를 포함하여 다음과 같이 정의할 수도 있다.  
```
@mixin mixin_Name($arg1, $arg2, ...) {
  // code
}
```  

### 🍅8.2\. @mixin 사용하기  
`@mixin`은 다음과 같이 사용한다.  
```
@include mixin_Name;
```  
인자가 있는 `@mixin`은  
```
@include mixin_Name(value1, value2, ...);
```  

### 🍉8.3\. 예제  

**Scss**  

```
@mixin text {
  p {
    color: red;
  }
}

@include text;
```  
- `@include`는 선택자 안에서 사용할 수도 있다.  

```
@mixin text {
  color: red;
}
p {
  @include text;
}
```  

- 인자가 있는 경우  

```
@mixin text($margin, $color) {
  margin: $margin;
  color: $color;
}
p {
  @include text(20px 0px, red);
}
```  

- 인자를 사용하고, 특정 인자에는 기본값을 설정한 경우  

```
//선언 시
@mixin colorBox($color, $fontsize: 12px) {
  width: 200px;
  background-color: $color;
  font-size: $fontsize;
}

//사용 시
.purpleBox {
  @include colorBoc(purple);
}
.greenBox {
  @include colorBoc(green, 24px);
}
```

---  

