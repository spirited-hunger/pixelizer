class Student {
  fullName: string;
  constructor(
    public firstName: string,
    public middleInitial: string,
    public lastName: string
  ) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

/*
! This is what happens if public is not used !
class Student {
  fullName: string;
  firstName: string;
  middleInitial: string;
  lastName: string;
  constructor(
    firstName: string,
    middleInitial: string,
    lastName: string
  ) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
    this.firstName = firstName;
    this.middleInitial = middleInitial;
    this.lastName;
  }
}
*/
 
interface Person {
  firstName: string;
  lastName: string;
}
 
function greeter(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}
 
let user = new Student("Jane", "M.", "User");
 
document.body.textContent = greeter(user);

//export {};
