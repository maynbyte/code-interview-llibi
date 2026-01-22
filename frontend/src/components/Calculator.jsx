import { useState } from 'react';
import './Calculator.css';

const Calculator = ({ onCalculate }) => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isResult, setIsResult] = useState(false);

  const handleNumber = (num) => {
    if (display === '0' || isResult) {
      setDisplay(num);
      setIsResult(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op) => {
    if (isResult) {
      setEquation(display + ' ' + op + ' ');
      setDisplay('0');
      setIsResult(false);
    } else if (display !== '0') {
      setEquation(equation + display + ' ' + op + ' ');
      setDisplay('0');
    }
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setIsResult(false);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handlePercent = () => {
    const value = parseFloat(display);
    setDisplay((value / 100).toString());
  };

  const handleEqual = () => {
    if (equation && display !== '0') {
      try {
        const fullEquation = equation + display;
        const result = evaluateExpression(fullEquation);
        setDisplay(result.toString());
        setEquation('');
        setIsResult(true);
        onCalculate(result);
      } catch (error) {
        setDisplay('Error');
        setEquation('');
      }
    }
  };

  const evaluateExpression = (expr) => {
    const tokens = expr.split(' ').filter(token => token !== '');
    let result = parseFloat(tokens[0]);
    
    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const operand = parseFloat(tokens[i + 1]);
      
      switch (operator) {
        case '+':
          result += operand;
          break;
        case '-':
          result -= operand;
          break;
        case '×':
          result *= operand;
          break;
        case '÷':
          if (operand === 0) throw new Error('Division by zero');
          result /= operand;
          break;
        default:
          break;
      }
    }
    
    return Math.round(result * 100000000) / 100000000;
  };

  return (
    <div className="calculator">
      <div className="calculator-display">
        <div className="calculator-equation">{equation}</div>
        <div className="calculator-result">{display}</div>
      </div>
      <div className="calculator-buttons">
        <button className="btn-function" onClick={handleClear}>AC</button>
        <button className="btn-function" onClick={handleBackspace}>⌫</button>
        <button className="btn-function" onClick={handlePercent}>%</button>
        <button className="btn-operator" onClick={() => handleOperator('÷')}>÷</button>
        
        <button className="btn-number" onClick={() => handleNumber('7')}>7</button>
        <button className="btn-number" onClick={() => handleNumber('8')}>8</button>
        <button className="btn-number" onClick={() => handleNumber('9')}>9</button>
        <button className="btn-operator" onClick={() => handleOperator('×')}>×</button>
        
        <button className="btn-number" onClick={() => handleNumber('4')}>4</button>
        <button className="btn-number" onClick={() => handleNumber('5')}>5</button>
        <button className="btn-number" onClick={() => handleNumber('6')}>6</button>
        <button className="btn-operator" onClick={() => handleOperator('-')}>-</button>
        
        <button className="btn-number" onClick={() => handleNumber('1')}>1</button>
        <button className="btn-number" onClick={() => handleNumber('2')}>2</button>
        <button className="btn-number" onClick={() => handleNumber('3')}>3</button>
        <button className="btn-operator" onClick={() => handleOperator('+')}>+</button>
        
        <button className="btn-number" onClick={() => handleNumber('0')}>0</button>
        <button className="btn-number" onClick={handleDecimal}>.</button>
        <button className="btn-equals" onClick={handleEqual}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
