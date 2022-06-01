// function sum(a: number, b = 100): number {
//   return a + b;
// }

// sum(10, undefined); // 110: 정상
// sum(10, 20, 30); // 에러 -> 3개를 넘겨줌
// sum(10, 20); // 30: 정상

function sum(a: number, ...nums: number[]): number {
  let totalOfNums = 0;
  for (let num of nums) {
    totalOfNums += num;
  }
  return a + totalOfNums;
}

console.log(sum(10, 20, 30)); // 60
