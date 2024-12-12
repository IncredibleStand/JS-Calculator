import { useState } from "react";
import "./index.css";

function Calculator() {
  
  const [display, setDisplay] = useState('0');
  const operators = ['+', '-', '*', '/'];

  const handleClick = (input) => {
    
    // Case for Error
    if (display === 'Error') { 
      setDisplay(input); 
      return; 
    }

    // Case for infinity
    if (display === 'Infinity') { 
      setDisplay(input); 
      return; 
    }
    // Last value in the display
    const lastChar = display.slice(-1);

    const beforeLastChar = display.length > 1 ? display.slice(-2, -1) : '';// Store the second to the last character

    // Check if the last character and before last character are operators
    const lastCharIsOperator = operators.includes(lastChar);
    const beforeLastCharIsOperator = operators.includes(beforeLastChar);

    // Correct consecutive operators except for negative sign handling
    if (lastCharIsOperator && ['+', '*', '/'].includes(input)) {
      if (beforeLastCharIsOperator) {
        setDisplay((prev) => prev.slice(0, -2) + input); // Replace last two operators
      } else {
        setDisplay((prev) => prev.slice(0, -1) + input); // Replace last operator
      }
      return; // Ignore consecutive operators (but allow - to toggle negative)
    } 

    // Handle if the input is a negative sign and it's after an operator
    if (input === '-' && ['+', '-', '*', '/'].includes(lastChar)) {
      setDisplay((prev) => prev + input); // Allow negative numbers like +- or -+
      return;
    }

    // Prevent multiple decimals in the same number
    // Check if the last number contains a decimal, and only allow one decimal in each number
    const lastNumber = display.split(/[\+\-\*\/]/).pop(); // Get the last number in the expression
    if (input === '.' && lastNumber.includes('.')) return;

    // Prevent leading zeros
    if ( display === '0' && input !== '.') {
      setDisplay(input);
    }

    else {
      setDisplay((prev) => (prev === '0' ? input : prev + input));
    }
  }

  const handleClear = () => {
    setDisplay('0');
  }

  const compute = () => {
    try {
      const sanitizedDisplay = display.replace(/--/g, '+'); // Handle the case like '--' to '+'.

      const result = eval(sanitizedDisplay);

      setDisplay(result.toString());
    }
    catch {
      setDisplay("Error");
    }
  }


  return (
    <>
      <div className="calculator">
        <div id="display" className="display">{display}</div>
        <div className="buttons">
          <button id="subtract" className="button" onClick={() => handleClick('-')}>-</button>
          <button id="add" className="button" onClick={() => handleClick('+')}>+</button>
          <button id="divide" className="button" onClick={() => handleClick('/')}>/</button>
          <button id="multiply" className="button" onClick={() => handleClick('*')}>*</button>
          <button id="decimal" className="button" onClick={() => handleClick('.')}>.</button>
          <button id="zero" className="button" onClick={() => handleClick('0')}>0</button>
          <button id="nine" className="button" onClick={() => handleClick('9')}>9</button>
          <button id="eight" className="button" onClick={() => handleClick('8')}>8</button>
          <button id="seven" className="button" onClick={() => handleClick('7')}>7</button>
          <button id="six" className="button" onClick={() => handleClick('6')}>6</button>
          <button id="five" className="button" onClick={() => handleClick('5')}>5</button>
          <button id="four" className="button" onClick={() => handleClick('4')}>4</button>
          <button id="three" className="button" onClick={() => handleClick('3')}>3</button>
          <button id="two" className="button" onClick={() => handleClick('2')}>2</button>
          <button id="one" className="button" onClick={() => handleClick('1')}>1</button>
          <button id="clear" className="button" onClick={handleClear}>AC</button>
          <button id="equals" className="button" onClick={compute}>=</button>
        </div>
      </div>

      <footer id="reference">
          By <a href="https://github.com/IncredibleStand" target="_blank" rel="noopener noreferrer">Incredible Stand</a>
        </footer>
    </>
  )
}

export default Calculator;
