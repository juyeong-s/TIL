---
layout: page
title: ESLint 와 Prettier 세팅하기 (react / typescript)
parent: ESLint & Prettier
nav_order: 1
has_children: false
permalink: /es/1/
---

# ESLint와 Prettier 차이점  
먼저 들어가기 전에, ESLint와 Prettier의 차이를 정확하게 알아보자. 대부분 개발자들은 eslint만 사용하지 않고 prettier를 함께 사용한다. 
그런데 둘 다 코드 컨벤션을 잡아주는데 왜 같이 사용하는걸까?

(난 prettier가 코드 파일 저장할 때 알아서 컨벤션에 맞게 정리 후 저장해주는 건 줄 알았다ㅎ)  
> "eslint는 코드 퀄리티를 보장하도록 도와주고, prettier는 코드 스타일을 깔끔하게 혹은 통일되도록 도와준다."  

### ESLint  
예를 들어 함수 정의할 때, 일반 function 키워드의 함수로 정의할 수도 있고, arrow function을 쓸 수도 있다.  
```
// function 키워드 사용
function foo() {
    ...
}

// arrow function 사용
const foo = () => {
    ...
}
```  
이처럼 여러 방식의 코드 작성법이 있는데, 이러한 방식을 **일관성 있는 방식으로 구현할 수 있도록 잡아주는 것**이 `eslint`의 역할이다.

## prettier  
prettier는 eslint처럼 '코드 구현 방식'이 아닌, 줄 바꿈, 공백, 들여 쓰기 등 에디터에서 '텍스트'를 일관되게 작성되도록 도와주는 것이다.  

```
const foo = () => {
    const a = [1, 2, 3];  // 스코프 내부 작성 시 두 공백 들여쓰기
}
   // <= 빈 줄이 한 줄 이상 안됨
foo();
```

# ESLint란?  
들어가기 전, 이번 세팅은 typescript로 개발 관련 eslint 세팅이라는 것을 알아두자.  
![image](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fv0m4R%2FbtrpP3jUejv%2FN0fQLV37BnOnwxR5loii5K%2Fimg.jpg)  
### Linter의 기능

동적 언어인 Javascript에서는 코드 에러가 자주 발생한다. 동적 분석(프로그램을 직접 실행해서 코드를 분석)을 하기 때문에 에러를 찾기 위해서는 코드를 직접 실행해서 확인을 해봐야 한다.  

이를 도와주는 것이 Linter이다. Linter는 코드를 정적으로 분석하기 때문에, 프로그램을 실행하지 않고도 코딩 컨벤션에 위배되는 코드나 안티 패턴을 자동으로 검출해준다. 추가적으로 간단한 코드 포맷팅 기능도 있다.  

우선, VScode의 확장부터 깔아주자 !
다음과 같이 두 개를 깔아주자  
![image](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fqcpr3%2FbtrpD0pquFt%2Fbl2u9DabdWbzKVyieTpep0%2Fimg.png)

![image2](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbbYnfy%2FbtrpJQTWah6%2F8bM0T4TYuMhA0oKQOcSezk%2Fimg.png)

## ESLint와 Prettier 설치  
`$ npm install -D eslint prettier`  `$ yarn add -D eslint prettier`  

🤭 **여기서**, 내가 원하는 것은 `command + s(저장)`를 누를때마다 ESLint 가 fix되는 것인데, 일일이 명령어를 터미널에 수행해야만 fix가 되는 현상이 있었다.  

아래와 같이 해결했다 !

1. 기본설정 열기( Command + ,(콤마) )
2. 설정 창에서 `code action on save` 라고 입력  
![image3](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbqm7i0%2FbtrpGBbUzm0%2FyuYwOS9Cxr52IVmMcA9EzK%2Fimg.png)

3. `settings.json`에서 편집 클릭
4. 아래구문 추가 또는 수정  
```
"editor.codeActionsOnSave": {
  "source.fixAll": true,
},
"editor.formatOnSave": false,
```  
그럼 `command + s(저장)`를 누를때마다 ESLint가 fix되는 것을 볼 수 있다.  

## ESLint 설정 파일 작성하기

이제 ESLint 규칙을 설정해보자.
프로젝트 최상단 Root 경로에 `.eslintrc.json` 파일을 생성하자.
아래 코드를 복붙해준다.  
```
{
    "parser": "@typescript-eslint/parser",
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "plugin:prettier/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "plugins": [
        "@typescript-eslint",
        "prettier"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "ignorePatterns": ["node_modules/", "build/**"],
    "rules": {
        "linebreak-style": 0,
        "semi": [1, "always"],
        "no-array-constructor": "error",
        "no-new-object": "error",
        "quotes": ["error", "single"],
        "no-nested-ternary": "error",
        "@typescript-eslint/explicit-module-boundary-types": 0,
        "no-use-before-define": 0,
        "no-shadow": 0,
        "react/prop-types": 0,
        "react/react-in-jsx-scope": 0,
        "react/self-closing-comp": 0
    }
}
```

여기서 우리는 맨 밑의 rules를 수정하여 규칙을 추가할 것이다.
아래 공식 문서에서 여러 규칙들을 찾아볼 수 있다 !  
[ESLint-rules](https://eslint.org/docs/rules/)

위의 몇 개의 예시만 설명해보자면, 우선, `"error"`는 규칙에 어긋나는 코드를 에러로 취급한다는 뜻이다.  
- **"semi"**는 `"always"`와 `"never"`로 설정할 수 있는데,
    - `"always"(default)` : 명령문의 끝으로 세미콜론을 무조건 붙이도록 한다.
    - `"never"` : 명령문의 끝으로 세미콜론을 허용하지 않는다는 뜻이다.
- **"quotes"**는 다음과 같은 3가지 옵션이 있다.
    - `"double"(default)` : 큰따옴표(")를 사용해야 한다.
    - `"single"` : 작은 따옴표(')를 사용해야 한다.
    - `"backtick"` : 백틱(`)을 사용해야 한다.

이런식으로 협업에 필요한 ESLint 규칙을 추가하면 된다.

이제 ESLint와 한 세트로 붙어 다니는 Prettier에 대해 알아보자.

---  

# Prettier란?  
![image4](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fdf8gPY%2FbtrpOxy5XVq%2FLqkWYaAoyWKRzOPSTIHA91%2Fimg.png)

Prettier는 2016년에 등장한 코드 포맷터이다.  
### Formatter란  
프로젝트를 진행하며 소스코드를 작성할 때, 정해진 스타일 가이드라인을 따를 수 있도록 변환해주는 도구이다.  
Linter와 Formater를 잘 설정해두면 코드를 원하는 문법 스타일로 자동 변경하고, 오류를 자동으로 수정하는 등 개발에 있어 아주 유용한 빠질 수 없는 도구 중 하나이다.  

## Prettier 설정 파일 작성하기  
프로젝트 최상단 Root 경로에 `.prettierrc` 파일을 생성 해준다.  
Prettier 옵션은 [Prettier](https://prettier.io/docs/en/options.html) 에서 참고하면 된다. 나는 다음과 같이 작성했당  
```
{
    "singleQuote": true,
    "semi": false,
    "useTabs": false,
    "tabWidth": 2,
    "trailingComma": "all", 
    "printWidth": 80,
    "arrowParens": "avoid",
    "bracketSpacing": true,
    "htmlWhitespaceSensitivity": "css",
    "insertPragma": false,
    "jsxBracketSameLine": false,
    "jsxSingleQuote": false,
    "proseWrap": "preserve",
    "quoteProps": "as-needed",
    "requirePragma": false
}
```  

지금은 간소화된 파일이지만 원하는 옵션을 추가해가며 사용하면 된다.
