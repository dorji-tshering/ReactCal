import { useState } from 'react';
import Button from './components/Button';
import Display from './components/Display';
import './componentStyles/App.css';

function App() {
  const [result, setResult] = useState('');
  const [query, setQuery] = useState([]);

  //? display operands and operators
  const displayQuery = (value) => {
    if(value === '-' && query.length === 0){
      return;
    }
    if(value === '+/-'){
      value = '-';
    }
    setQuery([...query, value]);
  }

  //? calculate the result and display with setResult
  const displayResult = () => {
    let result = 0;
    let first = [];
    let operatorCount = 0;
    let second = [];
    let firstOperand = 0;
    let secondOperand = 0;
    let operator_ = [];
    const operators = ['*', '-', '+', '/', '%'];    

    //! if first value is a -ve sign in query[], 
    //! it is same as having first operand as 0!
    for (let value of query){
        if(operators.includes(value)){         
          operator_.push(value);
          operatorCount++;
          
          if(operatorCount === 2){
            firstOperand = Number(first.join(''));
            secondOperand = Number(second.join(''));
        
            result = helper(firstOperand, secondOperand, operator_[0]);
            operator_.shift();
            firstOperand = result;
            second = [];            //? reset second[] and secondOperand
            secondOperand = 0;
          }

          if(operatorCount > 2){
            secondOperand = Number(second.join(''));

            result = helper(firstOperand, secondOperand, operator_[0]);
            operator_.shift();
            firstOperand = result;
            second = [];    //? reset second[] and secondOperand
            secondOperand = 0;
          }
        }else {
          if(operatorCount <= 1){
            if(operatorCount === 0){ 
              first.push(value);
            }else if(operatorCount === 1){
              second.push(value);
            }
          }else if(operatorCount > 1){
            second.push(value);
          }
        }      
    }

    // variable settiing
    if(operatorCount > 1){
      secondOperand = Number(second.join(''));     
      result = helper(firstOperand, secondOperand, operator_[0]);      
    }
    if(operatorCount === 1){
      firstOperand = Number(first.join(''));
      secondOperand = Number(second.join(''));
      result = helper(firstOperand, secondOperand, operator_[0]);
    }
    setResult(result);
  }

  const helper = (first, second, operator) => {
    let result = 0;
    switch(operator){
      case '*':
        result = first * second;
        break;
      case '/':
        result = first / second;
        break;
      case '+':
        result = first + second;
        break; 
      case '-':
        result = first - second;
        break;
      case '%':
        result = first % second;
        break;
      default:            
        break;  
    }
    return result;
  }

  // clear the query area
  const clear = () => {setQuery([]); setResult('')}

  const cut = () => {
    query.pop();
    setQuery([...query]);
  }

  return (
    <div className="container">
      <Display query={query} result={result}/>
      <div className="keys">
        <Button value={'C'} onClick={clear} />
        <Button value={'+/-'} onClick={displayQuery} />
        <Button value={'%'} onClick={displayQuery} />
        <Button value={'/'} onClick={displayQuery} />
        <Button value={7} onClick={displayQuery} />
        <Button value={8} onClick={displayQuery} />
        <Button value={9} onClick={displayQuery} />
        <Button value={'*'} onClick={displayQuery} />
        <Button value={4} onClick={displayQuery} />
        <Button value={5} onClick={displayQuery} />
        <Button value={6} onClick={displayQuery} />
        <Button value={'-'} onClick={displayQuery} />
        <Button value={1} onClick={displayQuery} />
        <Button value={2} onClick={displayQuery} />
        <Button value={3} onClick={displayQuery} />
        <Button value={'+'} onClick={displayQuery} />
        <Button value={0} onClick={displayQuery} />
        <Button value={'.'} onClick={displayQuery} />
        <Button value={'x'}  onClick={cut} />
        <Button value={'='}  onClick={displayResult}/>
      </div>
    </div>
  );
}

export default App;
