import React from 'react';
import MultiSelect from './MultiSelect';
import NumberInput from './NumberInput';
import './InputForm.css';

const InputForm = (props) => {
  const {onSolChange, onCamerasChange, selectOptions, roverDetails} = props;
  return (
    <div className="input-form">
      <NumberInput label="Sol" min="0" max={roverDetails.max_sol} onInputChange={onSolChange} />
      <MultiSelect selectOptions={selectOptions} label="Cameras" onSelectChange={onCamerasChange} />
    </div> 
  );
}

export default InputForm;

