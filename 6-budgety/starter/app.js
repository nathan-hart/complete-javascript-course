// Example Module
// var exampleModule = (function () {
//   var x = 23;
//   var add = function (a) {
//     return x + a
//   }
//   // returned object is public by accessing the budgetController var, while keeping the var x and add function
//   // secret.  Inner info can only be accessed by returned function below (publicTest)
//   return {
//     publicTest: function (b) {
//       // The outer function can still be accessed by this inner function because of CLOSURES
//       return (add(b))
//     }
//   }
// })();

/* ------------------------------------------------------------------------------------------------ */

// BUDGET CONTROLLER
var budgetController = (function () {
  // function constructors for Expense and Income Objects
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
  };

  return {
    addItem: function (type, des, val) {
      var newItem, ID;
      // ID = last ID + 1;
      // Create new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }
      // Create new Item based on inc or exp type
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new Income(ID, des, val);
      }
      //Push onto data structure
      data.allItems[type].push(newItem);
      // Return new element
      return newItem;
    },
    testing: function () {
      console.log(data);
    },
  };
})();

// UI CONTROLLER
var UIController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn",
    incomeContainer: ".income__list",
    expenseContainer: ".expenses__list",
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or expense
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    addListItem: function (obj, type) {
      var html, newHtml, element;

      // Create HTML string with placeholder text
      if (type === "exp") {
        element = DOMstrings.expenseContainer;
        html = `<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
      } else if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html = `<div class="item clearfix" id="income-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                            <div class="item__value">%value%</div>
                            <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                            </div>
                            </div>
                            </div>`;
      }

      // Replace placeholder text with some data
      newHtml = html.replace(`%id%`, obj.id);
      newHtml = newHtml.replace(`%description%`, obj.description);
      newHtml = newHtml.replace(`%value%`, obj.value);

      // Insert HTML into DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    getDOMstrings: function () {
      return DOMstrings;
    },

    clearFields: function () {
      var fields, fieldsArr;
      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );
      fieldsArr = Array.prototype.slice.call(fields); // Tricks the slice method into identifying out list (fields) as an array
      fieldsArr.forEach(function(current, i, arr) {
        current.value = "";
      })
    },
  };
})();

// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {
  // init function
  var setupEventListeners = function () {
    document
      .querySelector(DOM.inputButton)
      .addEventListener("click", ctrlAddItem);
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  var DOM = UICtrl.getDOMstrings();
  var ctrlAddItem = function () {
    var input, newItem;
    // 1. Get field input data
    input = UICtrl.getInput();
    // 2. Add item to budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    // 3. Add Item to UI
    UICtrl.addListItem(newItem, input.type);
    // 4. Clear fields
    UICtrl.clearFields();
    // 5. Calc Budget

    // 6. Display budget in UI
  };
  // Return the init function in order to make it public
  return {
    init: function () {
      console.log("App has started");
      setupEventListeners();
    },
  };
})(budgetController, UIController);

// Sets up Event Listeners
controller.init();
