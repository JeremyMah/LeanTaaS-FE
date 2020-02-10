import React, {useState, useEffect} from 'react';
import './MultiSelect.css';

const MultiSelect = (props) => {
  const {selectOptions, label, onSelectChange} = props;
  const [selectedValues, setValues] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  
  //Lift up selectedValues to parent when modified
  useEffect(() => onSelectChange(selectedValues), [selectedValues, onSelectChange]);
  
  //Returns the list of selected cameras as DOM elements
  const renderSelectedValues = () => {
    return selectedValues.length === 0 ? 
    <span className="placeholder"> None Selected </span>
    : selectedValues.map(optionName=> {
      return (
        <span key={`select${optionName}`}
              className="selected-value"
              onClick={handleOptionClick}
              data-key={optionName}>
          {optionName} 
          <span className="delete">
            X
          </span>
        </span>)
    });
  }
  
  //Returns available cameras as options for the Multi Select
  const renderSelectOptions = () => {
    if(!isOpen) {
      return null;
    }
    let output = selectOptions.map(option => {
      let isSelected = selectedValues.includes(option.name);
      let className = isSelected ? "option selected" : "option";
      return (
      <div key={option.name}
           className={className}
           onClick={handleOptionClick}
           data-key={option.name}>
        <input type="checkbox" checked={isSelected} readOnly />
        <span className="checkmark"></span>
        {option.name} - {option.full_name}
      </div>)
    });
    output.unshift(<div key="actions" className="option-actions">
      <span key="select-all" className="action" onClick={selectAllOptions}>Select All</span>
      <span key="clear" className="action" onClick={clearAllOptions}>Clear</span>
    </div>);
    return output;
  }

  //Adds or removes clicked option from selectedValues while retaining order
  const handleOptionClick = (e) => {
    e.stopPropagation();
    const selectedOption = e.target.dataset.key;
    if(selectedOption) {
      const index = selectedValues.indexOf(selectedOption);
      if(index === -1) {
        selectedValues.push(selectedOption);
      }
      else {
        selectedValues.splice(index,1);
      }
      let sortedOptions = selectOptions.filter(option=> selectedValues.includes(option.name));
      setValues(sortedOptions.map(option=>option.name));
    } 
  }
  
  const selectAllOptions = () => {
    let allOptions = selectOptions.map(option=> option.name);
    setValues(allOptions);
  }

  const clearAllOptions = () => {
    setValues([]);
  }

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  }

  return (
  <div className="multi-select" onBlur={()=>setIsOpen(false)} tabIndex="0">
    <label className="label">{ label }</label>
    <div className="selected-list" onClick={toggleIsOpen}>
      {renderSelectedValues()}
      <span id={isOpen ? "triangle-up": "triangle-down"}/>
    </div>
    <div className="options">
      {renderSelectOptions()}
    </div>           
  </div>   
  );
}

export default MultiSelect;

