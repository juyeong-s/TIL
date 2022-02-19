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

## ⚽️ 데이터 세팅

시작하기 전 가상 데이터를 세팅해놓자.  

```SELECT * FROM FOOD;```

![image](https://t1.daumcdn.net/cfile/tistory/99EA223F5CDCECA021)

```SELECT * FROM COLOR;```

![image](https://t1.daumcdn.net/cfile/tistory/995944405CDCECBD2D)

`NULL`값에 주의하자

## 🎀1\. IN

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

## 🎈2\. EXISTS

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

## 🍬3\. NOT IN

```
SELECT * FROM FOOD f
WHERE f.number NOT IN (SELECT c.number FROM COLOR c);
```

**결과**

![image](https://t1.daumcdn.net/cfile/tistory/993BB6365CDCFE2907)

위의 쿼리를 실행하니 위의 사진과 같이 아무런 결과도 출력되지 않았다. 처음에 알아본 `IN`은 먼저 소괄호의 서브쿼리부터 실행한다. 그럼 `(1, 2, 3, 4, NULL)`과 같이 출력된다.  

아래 쿼리와 같게 된다.

```
SELECT * FROM FOOD f
WHERE f.number NOT IN ( 1, 2, 3, 4, 5, 6, NULL );
```

그럼 이제 FOOD에서 하나의 레코드씩 가져올 것이고 NOT IN 구문이기 때문에 소괄호의 요소들과 일치하지 않아야 결과로 반환될 것이다.

그렇다면 FOOD에서 `(7)`일때는 `(1, 2, 3, 4, NULL)` 이 안에 없어서 출력이 되야 할텐데 출력이 되지 않는다. 왜일까?  

```
SELECT * FROM TB_FOOD f
WHERE f.number != 1
AND f.number != 2
AND f.number != 3
AND f.number != 4
AND f.number != 5
AND f.number != 6
AND f.number != NULL;
```

`NOT IN` 구문은 위 처럼 FOOD에서 가져온 레코드의 number값이 소괄호의 모든 요소들과 일치하지 않는지 판단한다. 그런데 위에서 `NULL`과 비교 연산을 하게 되는데, 이때 `NULL`과의 비교 연산은 항상 UNKNOWN값을 반환하게 된다. (`IS NULL`로 비교해야함)

따라서 WHERE절 이하가 TRUE가 아니기 때문에 해당 레코드가 출력되지 읺는 것이다.

다음과 같이 쿼리를 수정해야한다.

```
SELECT * FROM FOOD f
WHERE f.number NOT IN (
    SELECT c.number FROM COLOR c 
    WHERE c.number IS NOT NULL);
```

**결과**  
![image](https://t1.daumcdn.net/cfile/tistory/991A69395CDD011407)

## 🍯4\. NOT EXISTS

마지막으로 `NOT EXISTS`에 대해 알아보자.

```
SELECT * FROM FOOD f
WHERE NOT EXISTS (
    SELECT c.number FROM COLOR c
    WHERE c.number = f.number);
```

**결과**

![image](https://t1.daumcdn.net/cfile/tistory/99C8EF3C5CDD040313)

위에서 `NOT IN`을 사용했을 때에는 number 값이 NULL인 레코드는 출력되지 않았습니다. `IN` 구문은 요소간에 비교 연산으로 레코드가 출력되는데 `NULL` 값에 대한 비교연산은 항상 `UNKNOWN`을 반환하기 때문이었다.

`NOT EXISTS`는 `EXISTS`와 반대이다. `EXISTS` 구문이 값이 존재할 때 해당 레코드를 출력한다면, `NOT EXISTS` 구문은 해당 서브쿼리의 값이 존재하지 않으면 해당 레코드를 출력한다.

위에서 `COLOR`에는 `(1,2,3,4,5,6,NULL)`이 들어있었고, 그 중 FOOD에 없는 `(7,8,9,10)`이 출력되어야 하는데, NULL도 함께 출력된 것이다.

하지만 위에서 본것과 같이 `NULL` 비교연산은 항상 `UNKNOWN`이기 때문에 존재하지 않는 것으로 나와서 출력되는 것이다.

---

여기까지 SQL의 연산자에 대해서 알아보았다. 다음 시간에는 SQL `JOIN`에 대해 알아보자!!
