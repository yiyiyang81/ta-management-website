import React from "react";
import "../style/checkboxList.css";

const CheckboxList = (props: {
  options: any[];
  selectedOptions: any[];
  handleCheckbox: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const createCheckboxes = () => {
    return props.options.map((option, i) => (
      <div className="d-flex flex-row mb-3">
        <input
          className="checkbox-input"
          type="checkbox"
          id={option}
          name={option}
          key={i}
          value={option}
		  onChange={(e) => props.handleCheckbox(e.target.value)}
        />
        <div>{option}</div>
      </div>
    ));
  };

  return <>{createCheckboxes()}</>;
};

export default CheckboxList;
