---
layout: page
title: 플로이드 워셜(Floyd-Warshall)
parent: 그래프
grand_parent: 알고리즘
nav_order: 1
has_children: false
permalink: /algo/graph/fw
---

# 플로이드 워셜(Floyd-Warshall)

그래프에서 정점끼리의 최단 경로를 구하는 방법은 여러가지가 있다.  
오늘은 그 중 플로이드 워셜에 대해 공부해보려고 한다.

최단 경로를 구하는 방법은 다음과 같이 있다.
- 하나의 정점에서 다른 하나의 정점까지의 최단 경로
- 하나의 정점에서 다른 모든 정점까지의 최단 경로
- 하나의 목적지로 가는 모든 최단 경로
- 모든 정점에서 모든 정점까지의 최단 경로

---

## 플로이드 워셜 알고리즘이란?
`플로이드 워셜` 알고리즘이란, 위 경우에서 마지막에 해당되는 `모든 정점에서 모든 정점까지의 최단 경로`를 구하는 알고리즘이다.  
다익스트라와 벨만포드 (`하나의 정점에서 다른 모든 정점까지의 최단 경로`) 방법과는 다르다.  
- 다익스트라 알고리즘과는 다르게 음의 간선도 사용할 수 있다.

## 알고리즘 과정

모든 노드 간의 최단 경로를 구해야하므로 2차원 배열을 구성한다.  
각 라운드마다 각 경로에서 새로운 중간 노드를 선택하고, 더 짧은 길이를 선택하여 업데이트하는 과정을 반복한다.  

![image](https://user-images.githubusercontent.com/63364990/151660521-5f70bc8c-c86a-4956-949c-02b49184593a.png)  
다음 그래프를 2차원 행렬로 나타내면 다음과 같다. Infinity는 해당 노드에서 특정 노드까지 가는 경로가 없다는 뜻이다.  

- **초기화**  
(배열 형태로 0번 인덱스, 1번 인덱스 ... 순으로 가로로 보면 된다.)

| 0 idx | 0 | 5 | Infinity | 9 | 1 |
| --- | --- | --- | --- | --- | --- |
| 1 idx | 5 | 0 | 2 | Infinity | Infinity |
| 2 idx | Infinity | 2 | 0 | 7 | Infinity |
| 3 idx | 9 | Infinity | 7 | 0 | 2 |
| 4 idx | 1 | Infinity | Infinity | 2 | 0 |  


- **1 라운드** : 1번 노드를 새로운 중간 노드로 선택
이 그래프는 1번부터 5번 노드까지 존재하므로 알고리즘은 총 5라운드의 과정을 거친다.  
즉, 모든 노드들을 중간 노드로 선정하는 과정을 각 라운드마다 거치게 된다.  
예를 들어 2라운드는 2번 노드가 중간 노드, 3라운드는 3번 노드가 중간 노드가 될 것이다.  
2번에서 4번으로 가는 길은 원래 없었으나, 1번 노드를 중간 노드로 선정할 경우 2 -> 1 -> 4(길이 5+9=14) 로 갈 수 있게 된다. (업데이트된 길이는 📍로 표시하겠다.)  


| 0 idx | 0 | 5 | Infinity | 9 | 1 |
| --- | --- | --- | --- | --- | --- |
| 1 idx | 5 | 0 | 2 | 14📍 | 6📍 |
| 2 idx | Infinity | 2 | 0 | 7 | Infinity |
| 3 idx | 9 | 14📍 | 7 | 0 | 2 |
| 4 idx | 1 | 6📍 | Infinity | 2 | 0 |

- **2 라운드** : 2번 노드를 새로운 중간 노드로 선택  
1번-3번 경로, 3번-5번 경로가 새로 생기게 된다.

| 0 idx | 0 | 5 | 7📍 | 9 | 1 |
| --- | --- | --- | --- | --- | --- |
| 1 idx | 5 | 0 | 2 | 14 | 6 |
| 2 idx | 7📍 | 2 | 0 | 7 | 8📍 |
| 3 idx | 9 | 14 | 7 | 0 | 2 |
| 4 idx | 1 | 6 | 8📍 | 2 | 0 |

이런 과정으로 5번 노드를 중간 노드로 선정하는 5라운드까지 모두 거치면 행렬에는 모든 노드 간 최단 거리가 들어가게 된다.

## 소스코드 - 자바스크립트
- 플로이드-워셜 알고리즘의 시간 복잡도 = O(n^3)

```
const INF = Infinity;  

function floydWarshall(dist){
    const len = dist.length;
    for(let i = 0 ; i < len ; i++){ // 들를 곳
        for(let j = 0 ; j < len ; j++){ //row 하나씩 뽑아서 방문
            for(let k = 0 ; k < len ; k++){ // j row에서 k col 하나씩 들름
                if(dist[j][k] > dist[j][i] + dist[i][k])
                    dist[j][k] = dist[j][i] + dist[i][k];
            }
        }
    }
}  

function main(){
    const graph = [
        [0, 5, Infinity, 9, 1],
        [5, 0, 2, Infinity, Infinity],
        [Infinity, 2, 0, 7, Infinity],
        [9, Infinity, 7, 0, 2],
        [1, Infinity, Infinity, 2, 0]
    ];  

    floydWarshall(graph);  

    return graph;
}
```  

> d[시작정점][인접정점] > d[시작정점][거쳐야할 정점] + d[거쳐야할 정점][인접정점]

---

### 풀어본 문제
프로그래머스 : [순위](https://programmers.co.kr/learn/courses/30/lessons/49191)

정답 코드(플로이드 워셜 활용)
```
function solution(n, results) {
    let answer = 0;
    let graph = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(Infinity));

    results.forEach((edge, idx) => {
        const [winner, loser] = edge;
        graph[winner][loser] = 1;
        graph[loser][winner] = -1;
        graph[winner][winner] = 0;
        graph[loser][loser] = 0;
    });
    
    for(let i = 1; i <= n; i++){
        for(let j = 1; j <= n; j++){
            for(let k = 1; k <= n; k++){
                if(graph[j][i] === 1 && graph[i][k] === 1) graph[j][k] = 1;
                if(graph[j][i] === -1 && graph[i][k] === -1) graph[j][k] = -1;
            }
        }
    }
    
    for(let i = 1; i <= n; i++) if(!graph[i].slice(1).includes(Infinity)) answer++;
    return answer;
}
```

- [A, B] : A선수가 B선수를 이긴다는 뜻  
배열 형태로 쥐어주고, 어떤 선수가 몇 순위에 있는지 순위를 정확히 알 수 있는 선수의 수만 리턴하는 문제이다.  

이 문제에서 왜 플로이드 워셜을 활용했냐면, 다른 모드 노드와 거리가 Infinity가 아닌 어떤 정수 값이라면, 어떠한 노드를 거쳐서 갈 수 있다는 뜻이고, 거쳐서 갈 수 있다는 건 순위를 알 수 있다는 뜻이다.  

각 라운드마다 모든 중간 노드를 거쳐가면서 **아래의 조건**을 판단해 순위를 알 수 있는 경우, 업데이트를 하는 문제이다.  
- a가 b를 이기고, b가 c를 이기면 a가 c를 이김
- a가 b에게 지고, b가 c에게 지면 a가 c에게 짐
