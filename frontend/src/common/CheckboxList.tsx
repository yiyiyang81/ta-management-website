import React from "react";
import "../style/common/checkboxList.css";

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
          onChange={props.handleCheckbox}
        />
        <div>{option}</div>
      </div>
    ));
  };

  return <>{createCheckboxes()}</>;
};

export default CheckboxList;
