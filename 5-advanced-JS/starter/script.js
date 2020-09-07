/* Section 5: Advanced JavaScript: Objects and Functions */

// In JS, almost everything is an Object.  Everything that is not a primitive (numbers, undefined, null, strings, bools) is an object, including functions.

// OOP in JS: Interact through props and methods, keeps code clean and ordered

// Constructor - prototype for instances

// Inheritance = when one object gets access to another
// See lecture:  PROTOTYPE CHAIN

// Function constructor

// var nate = {
//   name: "Nate",
//   yob: 1991,
//   job: "detective",
// };

// var Person = function (name, yob, job) {
//   this.name = name;
//   this.yob = yob;
//   this.job = job;
//   this.calcAge = function () { // in console - hasOwnProperty is true
//     console.log(2020 - this.yob);
//   };
// };

// Person.prototype.calcAge = function () {
//   // in console - hasOwnProperty is false
//   console.log(2020 - this.yob); // method can be used by every instance of Person object through INHERITANCE
// };

// Stages of using constructor:
// 1.  When we use the keyword "new", first a new empty object is created, with args specified
// 2.  The "new" keyword causes the "this" keyword in the constructor to point towards the new empty object and not the global one.
// 3.  The defined args are then set to the name of the var defined at the start.
// var neta = new Person("Neta", 1993, "lawyer");

// neta.calcAge();

// All functions that can be performed on array (such as pop push etc) are stored as FUNCTIONS in the object prototype.

//*************************** */
/* Object.create */

// var personProto = {
//   calcAge: function () {
//     console.log(2020 - this.yob);
//   },
// };

// // 2 ways to Object Create

// // 1.
// var nate = Object.create(personProto);
// nate.name = "nate";
// nate.yob = 1991;
// nate.job = "extreme mtb";

// // 2.
// var neta = Object.create(personProto, {
//   name: { value: "neta" },
//   yob: { value: 1994 },
//   job: { value: "law" },
// });

/*  Primitives vs Objects - See lecture 64 for details.*/

/* First Class Functions:  Passing Functions as Args - Lecture 65 for full detailed example */

// var years = [1990, 1992, 1993, 1995, 2000];

// function arrayCalc(arr, fn) {
//   var arrRes = [];
//   for (var i = 0; i < arr.length; i++) {
//     arrRes.push(fn(arr[i]));
//   }
//   return arrRes;
// }

// function calcAge(el) {
//   return 2020 - el;
// }

// var ages = arrayCalc(years, calcAge);
// console.log(ages)

/* First Class Functions - Functions returning other functions - Lecture 66 */

// function intQuestion(job) {
//   if (job === "designer") {
//     return function (name) {
//       console.log(`${name}, can you explain what UI design is?`);
//     };
//   } else if (job === "teacher") {
//     return function (name) {
//       console.log(`${name}, how can you teach maths?`);
//     };
//   } else {
//     return function (name) {
//       console.log(`${name}, what do you do??`);
//     };
//   }
// }

// var teacherQuestion = intQuestion("teacher");
// teacherQuestion("Nate");

// intQuestion("designer")('Neta')

/* Immediatly Invoked Function Expressions (IIFE) - Used for Data Privacy - See lecture 67 */

/* Closures */

// function retire(retireAge) {
//   var a = " years till retire";
//   return function (yob) {
//     var age = 2020 - yob;
//     console.log(retireAge - age + a);
//   };
// }

// var retirementUS = retire(66);
// retirementUS(1990);

// retire(66)(1990);
// // Closure summary: An inner function always has access to the vars and params of its outer function, even AFTER
// //  the outer function has returned.

// function intQuestion(job) {
//   return function (name) {
//     if (job === "designer") {
//       console.log(`${name}, can you explain what UI design is?`);
//     } else if (job === "teacher") {
//       console.log(`${name}, how can you teach maths?`);
//     } else {
//       console.log(`${name}, what do you do??`);
//     }
//   };
// }

// // intQuestion('designer')('nate')
// var designer = intQuestion("designer");
// designer("neta");

/* Bind, Call, and Apply */

// var nate = {
//   name: "nate",
//   age: 29,
//   job: "coder",
//   presentation: function (style, tod) {
//     if (style === "formal") {
//       console.log(
//         `Good ${tod} ladies and gents, I'm ${this.name}, aged ${this.age}, I work as a ${this.job}`
//       );
//     } else if (style === "friendly") {
//       console.log(
//         `Hey whats up, good ${tod} people, I'm ${this.name}, aged ${this.age}, I work as a ${this.job}`
//       );
//     }
//   },
// };

// var neta = {
//   name: "neta",
//   age: 27,
//   job: "lawyer",
// };

// nate.presentation("formal", "morning");
// nate.presentation.call(neta, "friendly", "noon"); // method BORROWING - we can set this "this" var in the first argument of call
// nate.presentation.apply(neta, ["friendly", "noon"]); // method APPLY - we can set this "this" var in the first argument of call and then the rest of args in ARRAY

// var nateFriendly = nate.presentation.bind(nate, 'friendly') // method BINDING - allows a certain param to be set and at call time, tod can be set

// nateFriendly('boker')


/* Coding Challenge 7 */

