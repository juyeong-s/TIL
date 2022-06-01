// function sum(a: number, b = 100): number {
//   return a + b;
// }
// sum(10, undefined); // 110: 정상
// sum(10, 20, 30); // 에러 -> 3개를 넘겨줌
// sum(10, 20); // 30: 정상
function sum(a) {
    var nums = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        nums[_i - 1] = arguments[_i];
    }
    var totalOfNums = 0;
    for (var _a = 0, nums_1 = nums; _a < nums_1.length; _a++) {
        var num = nums_1[_a];
        totalOfNums += num;
    }
    return a + totalOfNums;
}
console.log(sum(10, 20, 30)); // 110: 정상
// sum(10, 20, 30); // 에러 -> 3개를 넘겨줌
// sum(10, 20); // 30: 정상
