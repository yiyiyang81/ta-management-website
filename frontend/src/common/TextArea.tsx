import { valueToPercent } from "@mui/base";
import React from "react";

const TextArea = (props: {
  label: string;
  required: boolean;
  cols: number;
  rows: number;
  placeholder: string;
  maxLength: number;
  id: string;
  value: string;
  handleChange: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const remainingCharacters = props.maxLength - props.value.length;
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      {props.required && <span className="required-symbol"> *</span>}
      <div className="mt-1 d-flex flex-column">
        <textarea
          id={props.id}
          rows={props.rows}
          cols={props.cols}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.handleChange}
          maxLength={props.maxLength}
        ></textarea>
      </div>
      <p style={{fontSize: "0.8rem", color: "#6D6E71"}}>
        Remaining <span>{remainingCharacters}</span> character
        {remainingCharacters != 0 && "s"}
      </p>
    </>
  );
};

export default TextArea;
