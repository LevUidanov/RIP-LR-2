window.onload = function() {
  let a = '';
  let b = '';
  let expressionResult = '';
  let selectedOperation = null;

  const outputElement = document.getElementById("result");
  const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]');

  function getCurrentValue() {
    return selectedOperation ? b : a;
  }

  function setCurrentValue(value) {
    if (selectedOperation) b = value;
    else a = value;
    outputElement.innerHTML = value === '' ? '0' : value;
  }

  function formatNumber(number) {
    return String(Number.isInteger(number) ? number : Number(number.toFixed(10)));
  }

  function onDigitButtonClicked(digit) {
    let value = getCurrentValue();
    if (digit === '.' && value.includes('.')) return;
    if (digit === '.' && value === '') value = '0';
    value += digit;
    setCurrentValue(value);
  }

  digitButtons.forEach(button => {
    button.onclick = function() {
      onDigitButtonClicked(button.innerHTML);
    };
  });

  function calculate() {
    switch (selectedOperation) {
      case 'x': expressionResult = (+a) * (+b); break;
      case '+': expressionResult = (+a) + (+b); break;
      case '-': expressionResult = (+a) - (+b); break;
      case '/':
        if ((+b) === 0) {
          outputElement.innerHTML = 'Ошибка';
          a = '';
          b = '';
          selectedOperation = null;
          return false;
        }
        expressionResult = (+a) / (+b);
        break;
      default: return false;
    }
    a = formatNumber(expressionResult);
    b = '';
    selectedOperation = null;
    outputElement.innerHTML = a;
    return true;
  }

  function selectOperation(operation) {
    if (a === '') return;
    if (selectedOperation && b !== '') {
      if (!calculate()) return;
    }
    selectedOperation = operation;
  }

  document.getElementById("btn_op_mult").onclick = function() {
    selectOperation('x');
  };
  document.getElementById("btn_op_plus").onclick = function() {
    selectOperation('+');
  };
  document.getElementById("btn_op_minus").onclick = function() {
    selectOperation('-');
  };
  document.getElementById("btn_op_div").onclick = function() {
    selectOperation('/');
  };

  document.getElementById("btn_op_clear").onclick = function() {
    a = '';
    b = '';
    selectedOperation = null;
    expressionResult = '';
    outputElement.innerHTML = 0;
  };

  document.getElementById("btn_op_equal").onclick = function() {
    if (a === '' || b === '' || !selectedOperation) return;
    calculate();
  };

  document.getElementById("btn_op_sign").onclick = function() {
    const value = getCurrentValue();
    if (value === '') return;
    setCurrentValue(formatNumber(Number(value) * -1));
  };

  document.getElementById("btn_op_percent").onclick = function() {
    const value = getCurrentValue();
    if (value === '') return;
    setCurrentValue(formatNumber(Number(value) / 100));
  };

  document.getElementById("btn_op_backspace").onclick = function() {
    const value = getCurrentValue();
    if (value === '') return;
    setCurrentValue(value.slice(0, -1));
  };

  document.getElementById("btn_op_sqrt").onclick = function() {
    const value = getCurrentValue();
    if (value === '') return;
    if (Number(value) < 0) {
      outputElement.innerHTML = 'Ошибка';
      return;
    }
    setCurrentValue(formatNumber(Math.sqrt(Number(value))));
  };

  document.getElementById("btn_op_square").onclick = function() {
    const value = getCurrentValue();
    if (value === '') return;
    setCurrentValue(formatNumber(Number(value) * Number(value)));
  };

  document.getElementById("btn_op_factorial").onclick = function() {
    const value = getCurrentValue();
    if (value === '') return;
    const number = Number(value);
    if (!Number.isInteger(number) || number < 0 || number > 170) {
      outputElement.innerHTML = 'Ошибка';
      return;
    }
    let result = 1;
    for (let i = 2; i <= number; i++) result *= i;
    setCurrentValue(String(result));
  };

  document.getElementById("btn_op_triple_zero").onclick = function() {
    const value = getCurrentValue();
    if (value === '' || value === '0') return;
    setCurrentValue(value + '000');
  };

  document.getElementById("btn_op_cube").onclick = function() {
    const value = getCurrentValue();
    if (value === '') return;
    setCurrentValue(formatNumber(Number(value) ** 3));
  };

  const backgroundColors = ['#1a1a1a', '#ffffff', '#E30613'];
  let backgroundIndex = 0;
  document.getElementById("btn_op_bg_color").onclick = function() {
    backgroundIndex = (backgroundIndex + 1) % backgroundColors.length;
    document.body.style.backgroundColor = backgroundColors[backgroundIndex];
  };

  const resultColors = ['#ffffff', '#000000', '#ffd6d9'];
  let resultIndex = 0;
  document.getElementById("btn_op_result_color").onclick = function() {
    resultIndex = (resultIndex + 1) % resultColors.length;
    outputElement.style.backgroundColor = resultColors[resultIndex];
  };
};
