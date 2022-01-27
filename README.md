# TIL 매일매일 배운 것을 기록하는 블로그
개인 공부용 블로그입니당 :)

- [TIL 블로그](https://juyeong-s.github.io/TIL/)

## jekyll 세팅 방법

1. `jekyll` 세팅 [jekyll](https://jekyllrb.com/docs/)
2. `just-the-docs` [just-the-docs](https://pmarsceill.github.io/just-the-docs/)을 통해 테마 적용합니다. (다른 테마도 가능)

## Navigation 카테고리 구성 방법

- 모든 포스팅 마크다운 문서는 `./docs` 폴더 내에 만듭니다. 카테고리를 계층 관계로 표현하고 싶은 경우 밑의 예시와 같이 폴더 구조를 만듭니다.
- `index.md` 파일은 Navigation바에서 해당 항목을 눌렀을 때 처음 나오는 페이지를 의미합니다.

```
docs/
├─ category1/
│  ├─ index.md
│  ├─ post1.md
├─ category2/
│  ├─ index.md
│  ├─ post2.md
```

## 포스팅 작성 방법

모든 마크다운 문서의 최상단에 `YAML`를 작성합니다.

```YAML
---
layout: default
title: js-object
parent: js
grand_parent: FE
nav_order: 2
has_children: false
permalink: /FE/js/object
---
```

| 속성          | 의미                                            |
| ------------ | ---------------------------------------------- |
| layout       | 생략하고 카테고리를 눌렀을 때 테마 적용이 되지 않습니다     |
| title        | 페이지에 표시될 제목                               |
| parent       | 부모 페이지의 title                               |
| grand_parent | 부모의 부모 페이지의 title                          |
| nav_order    | 사이드바에 표시될 페이지 순서 (default값은 알파벳순 정렬)    |
| has_children | 사이드바의 자식 페이지 포함 여부                     |
| permalink    | permalink에 쓰여진 url로 요청이 들어오면 _site에 존재하는 {해당 파일명}.html을 불러와 삽입합니다.     |

위 `YAML`을 작성 후 마크다운 문법에 따라 포스팅을 작성하면 됩니다.

## Admin 세팅
admin페이지를 통해 쉽게 게시글을 작성할 수 있습니다. [참조 링크](https://honbabzone.com/jekyll/start-gitHubBlog/#step-6-admin-%EC%84%B8%ED%8C%85) 먼저, Gemfile파일 안에 해당 부분을 작성합니다.

`gem 'jekyll-admin', group: :jekyll_plugins`

```
bundle install
jekyll serve
```
명령어를 실행하여 <http://localhost:4000/admin/>에 접근하여 게시물을 작성하고 수정할 수 있습니다.

## 자동 git commit, push

`npm init`을 통해 먼저 `package.json`파일을 작성한 후 `commit.sh`shell script 파일을 작성합니다.
```
"scripts": {
    "commit": "commit/commit.sh"
  },
```
위 코드를 `package.json`에 추가한 후, `npm run commit`명령어를 입력합니다.<br>
`Permission denied` 라는 오류가 발생한다면 터미널 창에 `chmod +x commit/commit.sh`를 입력 후, `npm run commit`명령어를 다시 입력하면 됩니다. [참고 문서](https://awsm.page/nodejs/run-shell-scripts-using-npm-script/)

## shell script 종료 상태 확인 방법
```
if [ $? -ne 1 ]; then
    echo 'commit success👌'
fi
```
코드를 `commit.sh`shell script 파일 맨 아래에 작성해줍니다. [참고 문서](https://stackoverflow.com/questions/26675681/how-to-check-the-exit-status-using-an-if-statement)

## 오류 로그
로컬에서 `bundle exec jekyll serve`를 했을 때는 정상적 작동됐지만 `gh-pages`에서는 `Error:  The just-the-docs theme could not be found.`와 같은 빌드 오류가 나타났습니다. `theme: "just-the-docs"`를 지운 후, `remote_theme: pmarsceill/just-the-docs`만 작성하여 재푸쉬해줍니다.
