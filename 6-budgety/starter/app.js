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

/* Event Delegation and Bubbling - See lecture 89 */

/* ------------------------------------------------------------------------------------------------ */

//////////////////////////////////
// BUDGET CONTROLLER
var budgetController = (function () {
  // function constructors for Expense and Income Objects
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
  };
  Expense.prototype.calcPercentage = function (totalInc) {
    if (totalInc > 0) {
      this.percentage = Math.round((this.value / totalInc) * 100);
    } else {
      this.percentage = -1;
    }
  };
  Expense.prototype.getPercentage = function () {
    return this.percentage;
  };
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var calcTotal = function (type) {
    var sum = 0;
    data.allItems[type].forEach(function (current) {
      sum += current.value;
      data.totals[type] = sum;
    });
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
    budget: 0,
    percentage: -1,
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

    deleteItem: function (type, id) {
      var ids, index;
      ids = data.allItems[type].map(function (current) {
        return current.id;
      });
      index = ids.indexOf(id);
      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    calculateBudget: function () {
      // calc total income and expenses
      calcTotal("exp");
      calcTotal("inc");

      // calc budget: income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // calc % of income spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    calcPercentages: function () {
      data.allItems.exp.forEach(function (cur) {
        cur.calcPercentage(data.totals.inc);
      });
    },
    getPercentages: function () {
      var allPercentages = data.allItems.exp.map(function (current) {
        return current.getPercentage();
      });
      return allPercentages;
    },

    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage,
      };
    },
    // Test function for viewing data in console
    testing: function () {
      console.log(data);
    },
  };
})();

//////////////////////////////////
// UI CONTROLLER
var UIController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn",
    incomeContainer: ".income__list",
    expenseContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container",
    expenseItemPercentage: ".item__percentage",
    dateLabel: ".budget__title--month",
  };
  var formatNumber = function (num, type) {
    // 2 decimal pts
    num = Math.abs(num).toFixed(2);
    // comma seperating the 000's
    numSplit = num.split(".");
    int = numSplit[0];
    if (int.length > 3) {
      int =
        int.substr(0, int.length - 3) +
        "," +
        int.substr(int.length - 3, int.length); //
    }
    dec = numSplit[1];
    // + or - before number

    return (type === "exp" ? "-" : "+") + " " + int + "." + dec;
  };
  var nodeListForEach = function (list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or expense
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
      };
    },
    addListItem: function (obj, type) {
      var html, newHtml, element;

      // Create HTML string with placeholder text
      if (type === "exp") {
        element = DOMstrings.expenseContainer;
        html = `<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>`;
      } else if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html = `<div class="item clearfix" id="inc-%id%">
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
      newHtml = newHtml.replace(`%value%`, formatNumber(obj.value, type));

      // Insert HTML into DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },
    displayBudget: function (obj) {
      var type;
      obj.budget > 0 ? (type = "inc") : (type = "exp");
      document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(
        obj.budget,
        type
      );
      document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(
        obj.totalInc,
        "inc"
      );
      document.querySelector(
        DOMstrings.expensesLabel
      ).textContent = formatNumber(obj.totalExp, "exp");
      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = "---";
      }
    },
    deleteListItem: function (selectorID) {
      var el = document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },
    clearFields: function () {
      var fields, fieldsArr;
      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );
      fieldsArr = Array.prototype.slice.call(fields); // Tricks the slice method into identifying out list (fields) as an array
      fieldsArr.forEach(function (current, i, arr) {
        current.value = "";
      });
      fieldsArr[0].focus();
    },
    displayPercentages(percentages) {
      var fields = document.querySelectorAll(DOMstrings.expenseItemPercentage); // returns node list
      
      nodeListForEach(fields, function (current, index) {
        if (percentages[index] === 0) {
          current.textContent = "---";
        } else {
          current.textContent = percentages[index] + "%";
        }
      });
    },
    displayDate() {
      var now, year, month, months;
      now = new Date();
      year = now.getFullYear();
      months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      month = now.getMonth();
      document.querySelector(DOMstrings.dateLabel).textContent =
        months[month] + " " + year;
    },
    getDOMstrings: function () {
      return DOMstrings;
    },
    changedType: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputType
        +"," + DOMstrings.inputDescription
        +"," + DOMstrings.inputValue
      );
      nodeListForEach(fields, function(cur) {
        cur.classList.toggle('red-focus');
      })
    },
  };
})();

//////////////////////////////////
// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {
  // init function
  var setupEventListeners = function () {
    var DOM = UICtrl.getDOMstrings();
    document
      .querySelector(DOM.inputButton)
      .addEventListener("click", ctrlAddItem);
    document.addEventListener(
      "keypress",
      function (event) {
        if (event.keyCode === 13 || event.which === 13) {
          ctrlAddItem();
        }
      },
      document
        .querySelector(DOM.container)
        .addEventListener("click", ctrlDeleteItem)
    );
    document
      .querySelector(DOM.inputType)
      .addEventListener("change", UICtrl.changedType());
  };

  var updateBudget = function () {
    // 1. Calc Budget
    budgetCtrl.calculateBudget();
    // 2. Return budget
    var budget = budgetCtrl.getBudget();
    // 3. Display budget in UI
    UICtrl.displayBudget(budget);
  };

  var updatePercentages = function () {
    // 1. Calc %'s
    budgetCtrl.calcPercentages();
    // 2. Read %'s from budget controller
    var percentages = budgetCtrl.getPercentages();
    // 3. Update UI with new %'s
    UICtrl.displayPercentages(percentages);
  };

  var ctrlAddItem = function () {
    var input, newItem;
    // 1. Get field input data
    input = UICtrl.getInput();
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. Add item to budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);
      // 3. Add Item to UI
      UICtrl.addListItem(newItem, input.type);
      // 4. Clear fields
      UICtrl.clearFields();
      // 5. Calc and update budget
      updateBudget();
      // 6. Calc and update %'s
      updatePercentages();
    }
  };

  var ctrlDeleteItem = function (event) {
    var itemID, splitID, type, ID;
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemID) {
      // 0. Identify item to delete
      splitID = itemID.split("-");
      type = splitID[0];
      ID = parseInt(splitID[1]);
      // 1. Delete item from data structure
      budgetCtrl.deleteItem(type, ID);
      // 2. Delete item from UI
      UICtrl.deleteListItem(itemID);
      // 3. Update and show new budget
      updateBudget();
      // 4. Calc and update %'s
      updatePercentages();
    }
  };
  // Return the init function in order to make it public
  return {
    init: function () {
      console.log("App has started");
      UICtrl.displayDate();
      UICtrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      });
      setupEventListeners();
    },
  };
})(budgetController, UIController);

//////////////////////////////////
// Sets up Event Listeners
controller.init();
