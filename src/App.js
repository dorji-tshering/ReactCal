import { useState, useEffect } from 'react';
import Button from './components/Button';
import Display from './components/Display';
import './componentStyles/App.css';

function App() {
  const [result, setResult] = useState(0);
  const [query, setQuery] = useState([]);
  const [queryArray, setQueryArray] = useState([]);
  
  useEffect(() =>{
    displayResult();
  });

  //! display special PI
  const pi = (value) => {

    if(queryArray.length !== 0 && !['/', 'x', '-', '+', '%'].includes(queryArray[queryArray.length-1])){
       if(queryArray[queryArray.length-1] !== '(') {
        setQueryArray([...queryArray, 'x', 3.1415926536]);
        setQuery([...query, 'x', value]);
        return;
        }
    }
    setQueryArray([...queryArray, 3.1415926536]);
    setQuery([...query, value]); 
  }

  //! squareroot thing
  const sqrt = (value) => {
    setQueryArray([...queryArray, 'sqrt', '(']);
    setQuery([...query, value, '(']);    
  }

  //! display user inputs
  // the changed state isn't accessible in the changing function
  const displayQuery = (value) => {
    
    if(['^', ')', '/', 'x', '-', '+', '%'].includes(value) && queryArray.length === 0){
      setResult('');
      return;
    }

    if(value === '-' && query.length === 0){
      return;
    }
    if(value === '+/-'){
      value = '-';
    } 
    
    if(queryArray[query.length-1] === 3.1415926536 && 
      !['/', 'x', '-', '+', '%'].includes(value) && value !== ')' && value !== '^' && 
          !['sin', 'cos', 'tan', 'log', 'ln'].includes(value)){
        setQueryArray([...queryArray, 'x', value]);
        setQuery([...query, 'x', value]);
        return;
    }

    // automatic bracket generation
    if(['sin', 'cos', 'tan', 'log', 'ln', '^'].includes(value)){
      if(['/', 'x', '-', '+', '%'].includes(queryArray[queryArray.length-1]) && value !== '^'){
        setQuery([...query, value, '(']);
        setQueryArray([...queryArray, value, '(']);
        return;
      }
      if(value === '^'){
        setQuery([...query, value, '(']);
        setQueryArray([...queryArray, value, '(']);
        return;
      }   
      
      if(value !== '^' && queryArray.length !== 0 && !['/', 'x', '-', '+', '%'].includes(queryArray[queryArray.length-1])){
        setQuery([...query, 'x', value, '(']);
        setQueryArray([...queryArray, 'x', value, '(']);
        return;
      }

      setQuery([...query, value, '(']);
      setQueryArray([...queryArray, value, '(']);
      return;
      
    }

    // automatic 'x' insertion
    if(true){

    }
    
    // automatically add '*' sign before '(' if there is no operator
    if(value === '('){
      if(query.length === 0 || query[query.length-1] === '('){
        setQuery([...query, value]);
        setQueryArray([...queryArray, value]);
        return;
      }else if(!['/', 'x', '-', '+', '%'].includes(query[query.length-1])){
        setQuery([...query, '*', value]);
        setQueryArray([...queryArray, '*', value]);
        return;
      }
    }   
    setQuery([...query, value,]);
    setQueryArray([...queryArray, value]);
  }

  //! trigonometry, root, and logarithm helper
  const tlrHelper = (operator, value) => {
    let result = 0;

    switch(operator){
      case 'sin':
        result = Math.sin(value);
        break;
      case 'cos':
        result = Math.cos(value);
        break;
      case 'tan':
        result = Math.tan(value);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      default:
        break;
    }
    return result;
  }

  //! normal operation helper
  const helper = (first, second, operator) => {
    let result = 0;
    switch(operator){
      case 'x':
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
      case '^':
        result = Math.pow(first, second);
        break;
      default:            
        break;  
    }
    return result;
  }

  //! helper function for basic operations
  const basicOperationHelper = (array) => {
    let result = 0;
    let first = [];
    let operatorCount = 0;
    let second = [];
    let firstOperand = 0;
    let secondOperand = 0;
    const operator_ = [];
    const operators = ['x', '-', '+', '/', '%'];  
    let operatorContain = false;
    
    for(let i=0; i<array.length; i++){
    if(operators.includes(array[i])){
      if(operators.includes(array[i+1])){
        setResult('');
        return 'Done';
      }               
      operator_.push(array[i]);
      operatorCount++;

      operatorContain = true;
      
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
    }else{
        if(operatorCount <= 1){
          if(operatorCount === 0){ 
            first.push(array[i]);
          }else if(operatorCount === 1){
            second.push(array[i]);
          }
        }else if(operatorCount > 1){
          second.push(array[i]);
        }
      }
    }

    // if there is no operator
    if(!operatorContain){
      result = Number(array.join(''));
      return result;
    }

      if(operatorCount > 1){
        secondOperand = Number(second.join(''));     
        result = helper(firstOperand, secondOperand, operator_[0]);      
      }
      if(operatorCount === 1){
        firstOperand = Number(first.join(''));
        secondOperand = Number(second.join(''));
        result = helper(firstOperand, secondOperand, operator_[0]);
      } 
      return result;   
    } 
    //! end of basic ooperationHelper


    //! main helper
    const mainHelper = (input) => {
      for (let i=0; i<input.length; i++){
      
      // trigonometry, logarithm, and squareroot block
        if(['sin', 'cos', 'tan', 'log', 'sqrt', 'ln'].includes(input[i])){
          const opera = input[i];
          let valueArray = [];
          let closingBracket = false;
          let value;

               
          // look for closing bracket or nested brackets
          for(let k=i+2; k<input.length; k++){
            if(input[k] === '('){
              bracketNotation(input, k);
            }
            
            if(input[k] === ')' && k === input.length-1 && input.indexOf(opera) === 0){
              
              valueArray = input.slice(i+2, k);
              value = basicOperationHelper(valueArray);
              if(isNaN(tlrHelper(opera, value))){
                setResult('');
                return 'Done';
              }
              setResult(tlrHelper(opera, value));
              return 'Done';

            }else if(input[k] === ')' && k !== input.length-1 && input.indexOf(opera) === 0){


              let spliceNumber = input.slice(input.indexOf(opera), k+1).length;
              valueArray = input.slice(i+2, k);
              value = basicOperationHelper(valueArray);            
              let replaceValue = tlrHelper(opera, value);
              input.splice(input.indexOf(opera), spliceNumber, replaceValue);  
              closingBracket = true;
              break;

            }else if(input.indexOf(opera) !== 0){

              for(let m=i+2; m<input.length; m++){

                if(input[m] === ')' && m === input.length-1){

                  let spliceNumber = input.slice(input.indexOf(opera), input.length).length;
                  valueArray = input.slice(i+2, m);
                  value = basicOperationHelper(valueArray);
                  let replaceValue = tlrHelper(opera, value);
                  input.splice(input.indexOf(opera), spliceNumber, replaceValue);
                  closingBracket = true;
                  break;

                }else if(input[m] === ')' && input.indexOf(opera) !== input.length-1){
                  let spliceNumber = input.slice(input.indexOf(opera), m+1).length;
                  valueArray = input.slice(i+2, m);
                  value = basicOperationHelper(valueArray);
                  let replaceValue = tlrHelper(opera, value);
                  input.splice(input.indexOf(opera), spliceNumber, replaceValue);
                  closingBracket = true;
                  break;
                }
                
              } //! end of innermost for loop
              // if there is no closing bracket, when opera is not the first item
              if(!closingBracket && input.indexOf(opera) !== 0){
            
                let spliceNumber = input.slice(input.indexOf(opera), input.length).length;
                valueArray = input.slice(i+2, input.length);
                value = basicOperationHelper(valueArray);
                let replaceValue = tlrHelper(opera, value);
                input.splice(input.indexOf(opera), spliceNumber, replaceValue);
                break;
              }
              break;
            }//! end of else if block
          } //! end of inner for loop

          // if there is no closing bracket
          if(!closingBracket && input.indexOf(opera) === 0){
            valueArray = input.slice(i+2);
            value = basicOperationHelper(valueArray);
            if(isNaN(tlrHelper(opera, value))){
              setResult('');
              return 'Done';
            }
            setResult(tlrHelper(opera, value));
            return 'Done';
          }
        }//! end of top-level if block
      }//! end of top-level for loop
    }//! end of main helper

    //! calculate a number raised to a exponent
    const powerHelper = (input, idx) => {
      let first = [];
      let second = [];
      let base = 0;
      let exponent = 0;
      let leftOperatorIdx = 0;
      let rightOperatorIdx = input.length-1;
      let result = 0;
      
      for(let i=idx-1; i>=0; i--){
        if(input[i] === ')'){
          let valueArray = [];
          for(let k=i-1; k>=0; k--){
            if(input[k] === '('){
              let spliceNumber = input.slice(k, i+1).length;
              let replaceValue = basicOperationHelper(valueArray);
              input.splice(k, spliceNumber, replaceValue);
              i = k;
              idx = k+1;
              break;
            }else{
              valueArray.push(input[k]);
            }
          }
        }
        if(['x', '-', '+', '/', '%'].includes(input[i])){
          leftOperatorIdx = i;
          break;
        }else{
          first.push(input[i]);
        }
        
      }
      for(let j=idx+2; j<input.length; j++){
        if(input[j] === ')'){
          rightOperatorIdx = j;
          break;
        }else{
          second.push(input[j]);
        }
      }
      base = Number(first.join(''));
      exponent = basicOperationHelper(second);
      result = helper(base, exponent, '^');
      if(leftOperatorIdx === 0 && rightOperatorIdx === input.length-1){
        setResult(result);
        return 'Done';
      }else if(leftOperatorIdx === 0 && rightOperatorIdx !== input.length-1){
        let spliceNumber = input.slice(leftOperatorIdx, rightOperatorIdx+1).length;
        input.splice(leftOperatorIdx, spliceNumber, result);
      }else if(leftOperatorIdx !== 0 && rightOperatorIdx !== input.legnth-1){
        let spliceNumber = input.slice(leftOperatorIdx+1, rightOperatorIdx+1).length;
        input.splice(leftOperatorIdx+1, spliceNumber, result);
      }
    }
    //! end of power helper function

    //! bracket notation helper
  
    const bracketNotation = (input, startIdx=0) => {

      let valueArray = [];
      let bracketValue;
      let leftIdx = 0;
      let rightIdx = input.length-1;
      for(let i=startIdx; i<input.length; i++){
        if(input[i] === '('){
          leftIdx = i;
          for(let j=i+1; j<input.length; j++){
            if(input[j] === '('){   
              // handles nested bracket notations 
              bracketNotation(input, j);
            }
            if(input[j] === ')'){
              rightIdx = j;            
              break;
            }else{          
              valueArray.push(input[j]);
            }
            if(j === input.length-1){
              rightIdx = j;
              break;
            }
          }
          if(valueArray.length === 0){
            setResult('');
            return 'Done';
          }
          bracketValue = basicOperationHelper(valueArray); 
          valueArray = [];   
          let spliceNumber = input.slice(leftIdx, rightIdx+1).length;
          input.splice(leftIdx, spliceNumber, bracketValue);
        }
      }// end of outer for loop
    }
    //! end of bracket notation helper

  
  //! calculate the result and display with setResult
  const displayResult = () => {
    const input = queryArray.slice(); //? queryArray is unaffected by operations

    //? display the value of PI
    if(input[input.length-1] === 3.1415926536 && input.length === 1){
      setResult(3.1415926536);
      return;
    }

    // if there is operators as the last value in the querryArray
    if(['/', 'x', '-', '+', '%'].includes(queryArray[queryArray.length-1])){
      setResult('');
      return;
    }

    // if there is just a single value with no opearators
    if(input.length === 1 || input.length === 2){
      setResult('');
      return;
    }

    // if first value is a -ve sign in query[], 
    // it is same as having first operand as 0!
    for (let i=0; i<input.length; i++){
      if(input[i] === '^' && i === 0){
        setResult(0);
        return;
      }else if(input[i] === '^'){
        let status = powerHelper(input, i);
        if(status === 'Done'){
          return;
        }
      }

           
      //? trigonometry, logarithm, and squreroot block
        if(['sin', 'cos', 'tan', 'log', 'sqrt', 'ln'].includes(input[i])){
          let status = mainHelper(input);
          if(status === 'Done'){
            return;
          }
        }  

    }  //! end of top level for loop

    //? if there is any brackets
    if(input.includes('(')){
      if(bracketNotation(input) === 'Done'){
        return;
      }
    }
    // exception handler
    if(isNaN(basicOperationHelper(input))){
      setResult('');
    }else{
    setResult(basicOperationHelper(input));  
    }
  } //! end of displayResult  

  // clear the query area
  const clear = () => {setQuery([]); setResult(0); setQueryArray([])}

  // remove last part of user input
  const cut = () => {
    queryArray.pop();
    if(['sin', 'cos', 'tan', 'log', 'sqrt', 'ln', '^'].includes(queryArray[queryArray.length-1])){
      queryArray.pop();
      query.pop();
      query.pop();
    }else{
      query.pop();
    }
   
    setQuery([...query]);
    setQueryArray([...queryArray]);
  }

  return (
    <div className="container">
      <Display query={query} queryArray={queryArray} result={result}/>
      <div className="keys">
        <Button value={'C'} onClick={clear} className='clear' />
        <Button value={'+/-'} onClick={displayQuery} className='clear' />
        <Button value={'%'} onClick={displayQuery} className='clear' />
        <Button value={'/'} onClick={displayQuery} className='operators' />
        <Button value={'sin'} onClick={displayQuery} className='tlr' />
        <Button value={'cos'} onClick={displayQuery} className='tlr' />

        <Button value={7} onClick={displayQuery} className='number' />
        <Button value={8} onClick={displayQuery} className='number' />
        <Button value={9} onClick={displayQuery} className='number' />
        <Button value={'x'} onClick={displayQuery} className='operators' />
        <Button value={'tan'} onClick={displayQuery} className='tlr' />
        <Button value={'log'} onClick={displayQuery} className='tlr' />

        <Button value={4} onClick={displayQuery} className='number' />
        <Button value={5} onClick={displayQuery} className='number' />
        <Button value={6} onClick={displayQuery} className='number' />
        <Button value={'-'} onClick={displayQuery} className='operators' />
        <Button value={<>&pi;</>} onClick={pi} className='tlr' />
        <Button value={'^'} onClick={displayQuery} className='tlr' />

        <Button value={1} onClick={displayQuery} className='number' />
        <Button value={2} onClick={displayQuery} className='number' />
        <Button value={3} onClick={displayQuery} className='number' />
        <Button value={'+'} onClick={displayQuery} className='operators' />
        <Button value={<>&#8730;</>} onClick={sqrt} className='tlr' />
        <Button value={'ln'} onClick={displayQuery} className='tlr' />

        <Button value={0} onClick={displayQuery} className='number' />
        <Button value={'.'} onClick={displayQuery} className='number' />
        <Button value={'x'}  onClick={cut} className='cutter' />
        <Button value={'='}  onClick={displayResult} className='equal' />
        <Button value={'('} onClick={displayQuery} className='brackets' />
        <Button value={')'} onClick={displayQuery} className='brackets' />

      </div>
    </div>
  );
}

export default App;
