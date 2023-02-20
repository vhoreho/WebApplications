export const boardCalc = () => {
  const numbers = document.querySelectorAll<HTMLButtonElement>("#btns-number");
  const operators =
    document.querySelectorAll<HTMLButtonElement>("#btns-operator");
  const deleteBtn = <HTMLButtonElement>document.getElementById("btns-del");
  const dotBtn = <HTMLButtonElement>document.getElementById("btns-dot");
  const resetBtn = <HTMLButtonElement>document.getElementById("btns-reset");
  const equalBtn = <HTMLButtonElement>document.getElementById("btns-equal");
  const display = <HTMLDivElement>document.getElementById("display");

  let num1: number = 0;
  let num2: number = 0;
  let operator: string | null = null;

  numbers.forEach((num) =>
    num.addEventListener("click", () => {
      if (operator === null) {
        num1 = parseFloat(num1.toString() + num.value);
        console.log(num1, operator);
        renderDisplay(num1.toString());
      } else {
        num2 = parseFloat(num2.toString() + num.value);
        console.log(num2, operator);

        renderDisplay(num2.toString());
      }
    })
  );

  operators.forEach((oper) =>
    oper.addEventListener("click", () => {
      if (num1 && num2) {
        equalFunc();
      }
      operator = oper.value;
    })
  );

  deleteBtn.addEventListener("click", () => {
    console.log("delete");
  });

  dotBtn.addEventListener("click", () => {
    console.log("dot");
  });

  resetBtn.addEventListener("click", () => {
    console.log("reset");
  });

  equalBtn.addEventListener("click", () => {
    if (num1 && num2 && operator) {
      equalFunc();
    }
  });

  function renderDisplay(value: string) {
    display.innerText = value;
  }

  function equalFunc() {
    num1 = getResult(operator, +num1, +num2);
    num2 = 0;
    operator = null;
    renderDisplay(String(num1));
  }

  function getResult(op: string, number1: number, number2: number) {
    switch (op) {
      case "+":
        return number1 + number2;
        break;
      case "-":
        return number1 - number2;
        break;
      case "*":
        return number1 * number2;
        break;
      case "/":
        return number1 / number2;
        break;
      default:
        break;
    }
  }
};
