---
layout: page
title: 우선순위 큐
parent: 알고리즘
nav_order: 4
has_children: false
permalink: /algo/pq
---

# 우선순위 큐 (Priority Queue)

JavaScript의 자료구조에는 우선순위 큐가 구현되어 있지 않다. 따라서 직접 구현해야 한다..  
그 내면에는 힙(Heap) 자료구조가 숨어 있다.

## heap

힙은 트리 기반의 자료구조이다. 규칙에 따라 크게 두 가지 힙을 나눌 수 있는데 Max Heap 과 Min Heap 이다.

> Max Heap: 부모 노드는 항상 자식 노드보다 크거나 같아야 한다.
> Min Heap: 부모 노드는 항상 자식 노드보다 값이 작아야 한다.

일반적으로 힙 자료구조는 이진트리로 구현한다.  

**이진트리** - 각각의 부모노드는 오로지 두개의 자식 노드(left, right) 만 가질 수 있는 트리

추가적으로 힙은 완전한 이진트리의 구조를 사용하는데, 트리의 가장 아래 층을 제외하고는 상단의 모든 레벨이 완전히 채워져야 한다는 규칙이다.

아래의 두 가지 규칙을 지키는 자료구조를 힙이라고 한다.

1\. 부모 노드는 항상 자식 노드보다 값이 작아야 한다.  
2\. 한 레벨이 모두 채워져야 다음 레벨로 트리가 늘어날 수 있다.

Min Heap 은 위의 두 가지 규칙 덕분에 항상 최상위 부모 노드에 최소값이 담겨있게 된다.   
위 두가지 규칙을 따르는 힙은 이진트리 자료구조이지만 배열로 구현할 수 있다. 아래와 같이 부모노드와 자식노드의 인덱스를 구할 수 있다. 

> 왼쪽 자식 노드 인덱스 = 부모 노드 인덱스 * 2 + 1  
> 오른쪽 자식 노드 인덱스 = 부모 노드 인덱스 * 2 + 2  
> 부모 노드 인덱스 = (자식 노드 인덱스 - 1) / 2

이 규칙을 따르면 이진트리를 평평하게 배열에 담을 수 있다.

[!image](https://miro.medium.com/proxy/0*WjFNe6TyvJyL8u9T)

위의 트리를 배열로 나타내면 다음과 같다.

> index: 0 1 2 3 4 5  
> value: 1 4 8 5 2 3

## 힙의 필요성

힙은 왜 필요할까? 힙은 주로 최소 값, 최대 값을 **O(1)**의 시간복잡도로 얻어내기 위해 사용된다.  

힙은 어디에 쓰일까? Heap의 특성상(부모 노드는 항상 자식 노드보다 값이 작거나 항상 크다) 우선순위 큐를 구현하는데 최적의 자료구조가 된다.

1\. 우선순위 큐를 구현하는데 사용 할 수 있다.  
2\. 운영체제에서 우선순위 기반의 일들을 스케쥴링 하기 위해서 사용한다. (우선 순위가 높은 일을 바로 조회 할 수 있기 때문에)  
3\. 다익스트라 알고리즘(최단 거리 구하기 알고리즘)에서 최소 비용을 기반으로 그래프를 탐색할 때 사용된다.  

## 최소 힙 구현하기(javascript)

1\. 기본 골격 만들기

```
class Heap {
    constructor() {
        this.heap = [];
    }

    getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
    getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
    getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);

    peek = () => this.heap[0]; // 항상 최상위 노드가 peek가 됨.
}
```

2\. insert

```
class Heap {
    ...

    insert = (key, value) => {      // 우선순위를 비교하기 위해서 key, value 로 받는다.
        const node = {key, value}; // 객체로 node 를 만들고
        this.heap.push(node);     // push
        this.heapifyUp();        // 배열에 가장 끝에 넣고, 다시 min heap 의 형태를 갖추도록 함
    }
}
```

삽입의 메커니즘은 다음과 같다.  
1\. 먼저 배열의 끝에 넣는다.  
2\. Min Heap의 형태를 갖추도록 조정한다.

2번에서 최근에 삽입한 노드가 제 자리를 찾아 갈 수 있도록 아래로 부터 위로 끌어올려야 한다.  
이 함수의 이름을 heapifyUp 이라고 하자.

```
class Heap {
    ...

    heapifyUp = () => {
        let index = this.heap.length - 1; // 계속해서 변하는 index 값
        const lastInsertedNode = this.heap[index];

        // 루트노드가 되기 전까지
        while (index > 0) {
            const parentIndex = this.getParentIndex(index);

            // 부모 노드의 key 값이 마지막에 삽입된 노드의 키 값 보다 크다면
            // 부모의 자리를 계속해서 아래로 내린다.
            if (this.heap[parentIndex].key > lastInsertedNode.key) {
                this.heap[index] = this.heap[parentIndex];
                index = parentIndex;
            } else break;
        }

        // break 를 만나서 자신의 자리를 찾았다면
        // 마지막에 찾아진 곳이 가장 나중에 들어온 노드가 들어갈 자리다.
        this.heap[index] = lastInsertedNode;
    }
}
```

- `index`: 계속해서 방금 들어온 노드의 위치를 탐색하기 위해서 변하는 값
- `lastInsertedNode`: 최근에 삽입된 노드의 정보를 기억해 놓는다.
- `index`가 루트노드가 되기 전까지 본인의 자리를 찾아가도록 `while`문을 반복한다.
- 현재 탐색하고 있는 노드의 부모 노드가 방금 삽입된 노드보다 `key`값이 크다면 (=우선 순위가 낮다면) 탐색 중인 노드를 대체한다.
- 탐색하는 노드를 부모 노드의 인덱스로 바꾸고 다시 반복한다.
- 부모노드의 `key`가 방금 삽입된 노드와 키 값이 작거나 같다면 (=우선순위가 높다면) 자신의 위치를 찾은 것 이므로 `break`로 `while`문을 빠져 나간다.
- 최종 `index`가 방금 삽입 된 노드의 위치가 된다.

3\. 제거하기

```
class Heap {
    ...

    remove = () => {
        const count = this.heap.length;
        const rootNode = this.heap[0];

        if (count <= 0) return undefined;
        if (count === 1) this.heap = [];
        else {
            this.heap[0] = this.heap.pop(); // 끝에 있는 노드를 부모로 만들고
            this.heapifyDown();     // 다시 min heap 의 형태를 갖추도록 함
        }

        return rootNode
    }
}
```

최소값을 꺼내는 삭제의 메커니즘은 다음과 같다.
- 최상위 노드를 꺼낸다.
- 이 때 배열안에 요소가 2개 이상 남아 있다면, 끝에 있는 노드를 최상위 부모로 만든다.
- Min Heap의 형태를 갖추도록 조정한다.

최근에 자리가 최상위 부모로 바뀐 노드의 올바른 위치를 찾아 내기 위한 작업이 필요하다. 위에서 부터 아래로 끌어 내려야 하는 함수의 이름을 heapifyDown 이라고 하자.

```
class Heap {
    ...

    // 변경된 루트노드가 제 자리를 찾아가도록 하는 메소드
    heapifyDown = () => {
        let index = 0;
        const count = this.heap.length;
        const rootNode = this.heap[index];

        // 계속해서 left child가 있을 때 까지 검사
        while (this.getLeftChildIndex(index) < count) {
            const leftChildIndex = this.getLeftChildIndex(index);
            const rightChildIndex = this.getRightChildIndex(index);

            // 왼쪽, 오른쪽 중에 더 작은 노드를 찾는다
            // rightChild가 있다면 key의 값을 비교해서 더 작은 값을 찾고
            // 없다면 leftChild가 더 작은 값을 가지는 인덱스가 됨
            const smallerChildIndex =
                rightChildIndex < count && this.heap[rightChildIndex].key < this.heap[leftChildIndex].key
                ? rightChildIndex
                : leftChildIndex;

            // 자식 노드의 키 값이 루트노드보다 작다면 위로 끌어올림
            if (this.heap[smallerChildIndex].key <= rootNode.key) {
                this.heap[index] = this.heap[smallerChildIndex];
                index = smallerChildIndex;
            } else break;
        }

        this.heap[index] = rootNode;
    }
}
```

## 우선순위 큐 구현하기

```
class PriorityQueue extends Heap {
    constructor() {
        super();
    }

    enqueue = (priority, value) => this.insert(priority, value);
    dequeue = () => this.remove();
    isEmpty = () => this.heap.length <= 0;
}
```

우선순위 큐는 위에 구현한 Min Heap 을 상속받아 세 가지 메소드를 구현한다.

- enqueue: Min Heap에 넣기
- dequeue: Min Heap에서 삭제하기 (=우선순위가 가장 높은 노드 꺼내기)
- isEmpty: heap이 비었는지 체크하기
