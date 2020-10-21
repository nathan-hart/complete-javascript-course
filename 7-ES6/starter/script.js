/*
 // ES5
var name5 = "Jane Smith";
var age5 = 23;
name5 = "Jane Miller";
console.log(name5);

// ES6
const name6 = "Jane Smith";
let age6 = 23;
name6 = "Jane Miller"; // Will throw error as const cannot be changed
console.log(name6);
console.log(age6);
 */

/* 
//ES5
// var is FUNCTION SCOPED
function driversLicense(passedTest) {
  if (passedTest) {
    var firstName = "John";
    var yob = 1990;
}
console.log(firstName + " " + yob);
}

driversLicense(true);

//es6
// let and const are BLOCK SCOPED
function driversLicense6(passedTest) {
  if (passedTest) {
    let firstName = "John";
    const yob = 1990;
}
console.log(firstName + " " + yob); // throws error - let and const are block scoped
}

driversLicense6(true);
 */

/* 
//es5
console.log(name5); //undefined
var name5 = "nate";

//es6
console.log(name6); // throws error - cannot access before initialization
console.log(age6); // throws error - cannot access before initialization
const name6 = "hart";
const age6 = 65;
 */

/* 
let i = 23;
for (let i = 0; i < 5; i++) {
  console.log(i);
}

console.log(i);
 */

// Blocks and IIFE's
//es5:
/* (function () {
  var c = 3;
})();

//es6
{
  const a = 1;
  let b = 3;
}

console.log(a + b); // throws error - as a and b are block, not function scoped
 */

// Strings in ES6
/* 
let firstName = "Nate";
let lastName = "Hart";
const yob = 183;

function calcAge(year) {
  return 2020 - year;
}
 */

// Arrow functions

/* const years = [1990, 2391, 2834, 4138];

// es5
var ages5 = years.map(function (el) {
  return 2020 - el;
});
console.log(ages5);

//es6
let ages6 = years.map((el) => 2020 - el);
console.log(ages6);

ages6 = years.map((el, i) => `Age element ${i+1}: ${2020-el}`);  // return is implicit
console.log(ages6) */

//es5
/* 
var box = {
  color: "green",
  position: 1,
  clickMe: function () {
    document.querySelector(".green").addEventListener("click", function () {
      var str =
        "This is box number " + this.position + " and it is " + this.color;
        // this points to global window obj, not the object, as they are called
        // within a function, not a *method*.
      alert(str);
    });
  },
};
box.clickMe(); // returns "This is box number undefined and it is undefined"
 */

//es6
/* 
const box6 = {
  color: "green",
  position: 1,
  clickMe: () => {
    document.querySelector(".green").addEventListener("click", () => {
      var str =
        "This is box number " + this.position + " and it is " + this.color;
      // this points to object, as the arrow function shares the
      // lexical this keyword.
      alert(str);
    });
  },
};
box6.clickMe(); // returns "This is box number 1 and it is green" 
*/

//

/*
 function Person(name) {
  this.name = name;
}

Person.prototype.myFriends5 = function (friends) {
  var arr = friends.map(function (el) {
    return this.name + " is friends with " + el;
  });
  console.log(arr);
};
var friends = ["Bob", "Jane", "Mark"];
new Person("Nate").myFriends5(friends);
 */

// Destructuring

// es5
/* 
var nate = ["Nate", 26];
// var name = nate[0];
// var age = nate[1];

// es6
const [name, year] = ["Nate", 1991];
console.log(name);
console.log(year);

const obj = {
    firstName: 'John',
    lastName: 'Smith'
};

const {firstName, lastName} = obj;
console.log(firstName);
console.log(lastName);

const {firstName: a, lastName: b} = obj;
console.log(a);
console.log(b); 
*/

// for loops
/* 
const ages = [24,5,6,734,4]

// es5
for (i=0; i<ages.length; i++) {
    console.log(ages[i]);
}

// es6
for (const cur of ages) {
    console.log(cur);
}
*/

/////////////////////////////////////////////////
/* Spread Operator: */

function addAges(a, b, c, d) {
  return a + b + c + d;
}

var sum1 = addAges(18, 20, 31, 45);
console.log(sum1);

var ages = [18, 32, 43, 67];
var sum2 = addAges.apply(null, ages);
console.log(sum2);

const max3 = addAges(...ages); // passing ages into function with spread
console.log(max3);

const familySmith = ["John", "Mary", "greg"];
const brothersHart = ["Nate", "Jase", "Sam"];
const bigFam = [...familySmith, ...brothersHart];
console.log(bigFam)

/////////////////////////////
/* Rest Parameters */

// ES5





// ES6

