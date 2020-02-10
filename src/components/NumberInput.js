import React, {useState} from 'react';
import './NumberInput.css';

const NumberInput = (props) => {
  const {label, min, max, onInputChange} = props;
  const [value, setValue] = useState(1);
  const [isError, setIsError] = useState(false);

  //Checks if input is valid and lifts the value to parent
  const handleNumberChange = (e) => {
    let newValue = e.target.value;
    if(isFinite(parseInt(newValue))) {
      setIsError(false);
      newValue = parseInt(newValue);
      if(newValue < min) {
        newValue = min;
      }
      else if(newValue > max) {
        newValue = max;
      }
    }
    else {
      setIsError(true);
    }
    setValue(newValue);
    onInputChange(newValue);
  }

  return (
    <div className="number-input">
      <label className="label" htmlFor="solInput">{label}</label>
      <input id="solInput" type="number" min={min} max={max} onChange={handleNumberChange} value={value} className={isError ? 'error' : ''}/>
    </div>
  );
}

export default NumberInput;