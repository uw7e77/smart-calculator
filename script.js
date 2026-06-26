/*
==========================================================
 SMART CALCULATOR
 Author: Ubaid (Learning Project)

 Concepts Used:
 ✔ DOM Selection
 ✔ Event Delegation
 ✔ Functions
 ✔ Variables
 ✔ Switch Statement
 ✔ parseFloat()
 ✔ Math Object
 ✔ Input Validation
 ✔ textContent
 ✔ Data Attributes
==========================================================
*/

/* ==========================
   DOM ELEMENTS
========================== */

// Inputs
const firstNumberInput = document.getElementById("firstnum");
const secondNumberInput = document.getElementById("secondnum");

// Result
const resultElement = document.getElementById("res");

// Select ALL operation buttons
const operationButtons = document.querySelectorAll(".operation-btn");

/* ==========================
   EVENT LISTENERS
========================== */

// One event listener for every button
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const operation = button.dataset.action;
    calculate(operation);
  });
});

/* ==========================
   MAIN CALCULATION FUNCTION
========================== */

function calculate(operation) {

  // Read values once
  const firstNumber = parseFloat(firstNumberInput.value);
  const secondNumber = parseFloat(secondNumberInput.value);

  // Validation for operations that need two numbers
  const twoNumberOperations = [
    "add",
    "sub",
    "mul",
    "div",
    "per",
    "pow"
  ];

  if (
    twoNumberOperations.includes(operation) &&
    (isNaN(firstNumber) || isNaN(secondNumber))
  ) {
    resultElement.textContent = "Please enter both numbers.";
    return;
  }

  // Validation for operations needing only first number
  if (
    ["square", "sqrt"].includes(operation) &&
    isNaN(firstNumber)
  ) {
    resultElement.textContent = "Please enter the first number.";
    return;
  }

  let result;

  switch (operation) {

    case "add":
      result = firstNumber + secondNumber;
      break;

    case "sub":
      result = firstNumber - secondNumber;
      break;

    case "mul":
      result = firstNumber * secondNumber;
      break;

    case "div":

      if (secondNumber === 0) {
        resultElement.textContent = "Cannot divide by zero.";
        return;
      }

      result = firstNumber / secondNumber;
      break;

    case "per":
      result = (firstNumber / 100) * secondNumber;
      break;

    case "square":
      result = Math.pow(firstNumber, 2);
      break;

    case "sqrt":

      if (firstNumber < 0) {
        resultElement.textContent = "Invalid number.";
        return;
      }

      result = Math.sqrt(firstNumber);
      break;

    case "pow":
      result = Math.pow(firstNumber, secondNumber);
      break;

    case "clear":
      clearCalculator();
      return;

    default:
      resultElement.textContent = "Unknown operation.";
      return;
  }

  // Display result
  resultElement.textContent = result;
}

/* ==========================
   CLEAR FUNCTION
========================== */

function clearCalculator() {

  firstNumberInput.value = "";
  secondNumberInput.value = "";
  resultElement.textContent = "0";

  // Move cursor back to first input
  firstNumberInput.focus();
}

/* ==========================
   ENTER KEY SUPPORT

   Press Enter to perform Add
========================== */

document.addEventListener("keydown", (event) => {

  if (event.key === "Enter") {
    calculate("add");
  }

});