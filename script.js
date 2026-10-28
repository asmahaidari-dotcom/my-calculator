const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".buttons button");

let firstNumber = null;
let secondNumber = null;
let operator = null;
let startNewNumber = false;

buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    const value = button.textContent.trim();

    if (value === "Clear") {
      display.value = "0";
      firstNumber = null;
      secondNumber = null;
      operator = null;
      startNewNumber = false;
      return;
    }

    if ("0123456789".includes(value) && value.length === 1) {
      if (display.value === "0" || startNewNumber) {
        display.value = value;
        startNewNumber = false;
      } else {
        display.value += value;
      }
      return;
    }

    if (value === ".") {
      if (startNewNumber) {
        display.value = "0.";
        startNewNumber = false;
      } else if (!display.value.includes(".")) {
        display.value += ".";
      }
      return;
    }

    if (["+", "−", "×", "÷"].includes(value)) {
      firstNumber = Number(display.value);
      operator = value;
      display.value = firstNumber + " " + operator;
      startNewNumber = true;
      return;
    }

    if (value === "=" && operator !== null) {
      secondNumber = Number(display.value);
      let result;

      if (operator === "+") result = firstNumber + secondNumber;
      if (operator === "−") result = firstNumber - secondNumber;
      if (operator === "×") result = firstNumber * secondNumber;

      if (operator === "÷") {
        if (secondNumber === 0) {
          display.value = "تقسیم بر صفر ممکن نیست";
          firstNumber = null;
          operator = null;
          startNewNumber = true;
          return;
        }
        result = firstNumber / secondNumber;
      }

      display.value = String(result);
      firstNumber = null;
      secondNumber = null;
      operator = null;
      startNewNumber = true;
    }
  });
});