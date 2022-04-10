function b(num){
    return num*num;
}

function a(func, n1, n2){
    return func(n2);
}

// console.log(a(b, 2, 3));

function add(num1) {
    return function(num2) {
        return num1 + num2;
    }
}

console.log(add(3)(4));

const x = 1;

function outerFunc() {
    const x = 10;

    function innerFunc() {
        console.log(x); // 10
    }

    innerFunc();
}

outerFunc();

const x = 1;

function foo() {
    const x = 10;
    bar();
}

function bar() {
    console.log(x);
}

foo();  // ?
bar();  // ?

const x = 1;

// 1번
function outer() {
    const x = 10;
    const inner = function () { console.log(x) };   // 2번
    return inner;
}

// outer함수를 호출하면 중첩함수 inner를 반환한다.
const innerFunc = outer();  // 3번
innerFunc();    // 4번 -> 10