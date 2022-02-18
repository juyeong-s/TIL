---
layout: page
title: SQL 논리 연산자
parent: SQL
nav_order: 1
has_children: false
permalink: /sql/operator/
---

# SQL 논리 연산자  
## IN, EXISTS, NOT IN, NOT EXISTS  

## 1\. 데이터 세팅

시작하기 전 가상 데이터를 세팅해놓자.  

```SELECT * FROM FOOD;```

![image](https://t1.daumcdn.net/cfile/tistory/99EA223F5CDCECA021)

```SELECT * FROM COLOR;```

![image](https://t1.daumcdn.net/cfile/tistory/995944405CDCECBD2D)

## 1\. IN

```
SELECT * FROM FOOD f
WHERE f.number IN (SELECT c.number FROM COLOR c);
```

위와 같은 쿼리를 실행하면 어떤 결과가 나올까?

![image](https://t1.daumcdn.net/cfile/tistory/99D757335CDCF3792E)

위 쿼리는 제일 먼저 `COLOR`테이블에 접근하게 된다. 즉, IN 뒤에 있는 괄호의 서브쿼리를 먼저 실행해서 그에 대한 요소를 전부 가져온다.
따라서 사실 IN뒤에 괄호안에는 서브쿼리 이외에도 직접 요소값을 적어줄 수 있다.

이후 `FOOD`에서 하나의 레코드를 가져온다. 그 레코드의 number 값이 앞에서 가져온 IN 이하의 요소들 안에 포함되어 있는지 체크한다.  
하나라도 일치한다면 그 레코드를 출력하게 되는 것이다.

**여기서 중요한 것**, 쿼리에서 `COLOR`에 먼저 접근하여, number 값들을 가져와 리스트로 IN 이하에 뿌려주고, 그 이후에 `FOOD`에서 하나의 레코드씩 IN 이하의 요소들과 일치하는지 비교한다는 것이다.

## 2\. EXISTS

```
SELECT * FROM FOOD f
WHERE EXISTS (SELECT c.number FROM COLOR c);
```

**결과**  
![image](https://t1.daumcdn.net/cfile/tistory/9936E94D5CDCF84B3E)

뭔다 이상하다. 기대했던 결과와는 달리 FOOD 테이블이 그대로 출력되었다.  

위의 쿼리를 기준으로 DB가 어떻게 동작하는지 한번 알아보자.

IN구문에서는 IN 이후에 나오는 소괄호 내부의 서브쿼리에 대해서 먼저 접근했다. 하지만 EXISTS 구문은 다르다.

- 먼저 FOOD에 접근하여 하나의 레코드를 가져온다.
- 그 레코드에 대해서 EXISTS 이하의 서브쿼리를 실행한다.
- 서브쿼리에 대한 결과가 '존재하는지'를 확인한다.

예시를 들어 생각해보면, 제일 처음에 `[ 1 , 치킨 ]` 이라는 레코드를 가져왔을 것이고, 해당 레코드에 대해서 `SELECT c.number FROM COLOR c` 쿼리를 통해 결과가 출력되는지 확인한다.  

서브쿼리에 대해 어떠한 결과라도 존재한다면 참이 되어서 `[ 1 , 치킨 ]` 레코드가 출력된다.

그런데 사실 `SELECT c.number FROM COLOR c` 쿼리는 `FOOD`의 어떠한 레코드하고도 연관없이 항상 결과값을 가지는 쿼리이다.
따라서 `FOOD`의 모든 레코드가 출력되는 것이다.

그럼 이를 우리가 기대하는 결과대로 출력하기 위해서는 다음과 같이 쿼리를 수정하면 된다.

```
SELECT * FROM FOOD f
WHERE EXISTS (SELECT c.number FROM COLOR c WHERE c.number = f.number);
```

**결과**

![image](https://t1.daumcdn.net/cfile/tistory/99CFC14B5CDCF9D62B)

이 결과는 사실 IN 구문과 같은 결과이다. 하지만 내부적으로 쿼리가 동작하는 방식은 아예 다르다는 것에 주의하자.

## 3\. NOT IN

