import React, { useState } from "react";
import "../style/common/select.css";

const Select = (props: {
  label: string;
  required: boolean;
  name: string;
  id: string;
  options: any[];
  value: any;
  placeholder?: string;
  disabled? : boolean;
  isMultiple: boolean;
  margin? : string
  handleChange: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [showMultipleSelect, setShowMultipleSelect] = useState(false);
  const createOptions = () => {
    const valueSet = new Set(props.value);
    return props.options.map((option, i) => {
      if (valueSet.has(option)) {
        return (
          <div
            className="custom-option py-1 active"
            key={i}
            id={option}
            onClick={() => {
              props.handleChange(option);
            }}
          >
            {option}
          </div>
        );
      } else {
        return (
          <div
            className="custom-option py-1"
            key={i}
            id={option}
            onClick={() => {
              props.handleChange(option);
            }}
          >
            {option}
          </div>
        );
      }
    });
  };

  const createSelectedValues = () => {
    return props.value.map((option, i) => {
      return (
        <div className="custom-selected-value d-flex" key={i} id={option}>
          {option}
          <button
            onClick={(e) => {
              e.stopPropagation();
              props.handleChange(option);
            }}
          >
            x
          </button>
        </div>
      );
    });
  };
  if (props.isMultiple) {
    return (
      <>
        <div className="mb-3">
          <label htmlFor={props.id}>{props.label}</label>{" "}
          {props.required && <span className="required-symbol"> *</span>}
          <div
            className="multiple-select-input mb-1"
            onClick={() => {
              setShowMultipleSelect((val) => !val);
            }}
          >
            {props.value.length === 0 && props.placeholder}
            <div className="d-flex overflow-hidden" style={{ zIndex: 1000 }}>
              {createSelectedValues()}
            </div>
          </div>
          {showMultipleSelect && (
            <div className="dropdown" style={{margin: props.margin}}>{createOptions()}</div>
          )}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="mb-3">
          <label htmlFor={props.id}>{props.label}</label>
          {props.required && <span className="required-symbol"> *</span>}
          <select
            name={props.name}
            id={props.id}
            value={props.value}
            onChange={(e) => props.handleChange(e.target.value)}
            disabled={props.disabled}
          >
            <option value="default" disabled hidden>
              {props.placeholder}
            </option>
            {props.options.map((option, i) => (
              <option className="option" key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </>
    );
  }
};

Select.defaultProps = { isMultiple: false, placeholder: "---", disabled: false, margin: "0rem" };
export default Select;
