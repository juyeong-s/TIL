// test

const person: {name: string, sayHello: string} = {
    name: 'a',
    sayHello: function(){
      return "Hello" + this.name;
    }
  }
  
console.log(person.sayHello());