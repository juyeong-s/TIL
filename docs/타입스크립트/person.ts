// test

const person: { name: string; sayHello: string } = {
  name: "a",
  sayHello: function () {
    return "Hello" + this.name;
  },
};

console.log(person.sayHello());

interface User {
  id: number;
  name: string;
}

type Name = Partial<User>;

const user1: Name = {}; // 정상
const user2: Name = { id: 1 }; // 정상
const user3: Name = { id: 2, name: "a" }; // 정상

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   company: string;
// }

// type Name = Pick<User, "name">;

// const user1: Pick<User, "id"> = {
//   id: 1,
// };
// const user2: Pick<User, "id" | "name"> = { id: 2, name: "a" };

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   company: string;
// }

// type Name = Omit<User, "id" | "name">;

// const user1: Omit<User, "id"> = {
//   name: "a",
//   email: "a",
//   company: "1",
// };
// const user2: Omit<User, "id" | "name" | "email"> = { company: "2" };

// const user1: Name = {}; // 오류 - id, name이 없음
// const user2: Name = { id: 1 }; // 정상
// const user3: Name = { id: 2, name: "a" }; // 오류 - name이 있음
