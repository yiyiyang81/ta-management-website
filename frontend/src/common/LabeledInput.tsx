import React from "react";
import "../style/labeledInput.css";

const LabeledInput = (props: {value? : any, label?: string, required: boolean, type: string, name: string, placeholder?: string, id: string, handleChange: React.Dispatch<React.SetStateAction<any>>}) => {
	if (props.required) {
		return (
		<>
		<div className="label-input-container mb-2">
		{props.label && <label className="form-label" htmlFor={props.id}>{props.label} <span className="required-symbol">*</span></label> }
		  <input
			type={props.type}
			name={props.name}
			placeholder={props.placeholder}
			id={props.id}
			value={props.value}
			onChange={(e) => props.handleChange(e.target.value)}
			/>
			</div>
		</>
	  );
	}
	else {
		return (
		<>
		<div className="label-input-container mb-2">
		{props.label && <label className="form-label" htmlFor={props.id}>{props.label}</label>}
		  <input
			type={props.type}
			name={props.name}
			placeholder={props.placeholder}
			id={props.id}
			onChange={(e) => props.handleChange(e.target.value)}
			/>
			</div>
		</>
	  );
	}
};

LabeledInput.defaultProps = {placeholder: "", value: ""}
export default LabeledInput;
