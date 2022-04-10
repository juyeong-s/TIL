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
