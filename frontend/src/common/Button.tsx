import React from "react";
import "../style/button.css";

const Button = (props: {
  width?: any;
  type: String;
  onClick?: any;
  value: any;
}) => {
  const generateWidthStyle = () => {
    return {
      minWidth: "100%",
      maxWidth: props.width,
      width: "100%",
    };
  };

const generateInputWidthStyle = () => {
    return {
      minWidth: "100%",
      maxWidth: "100%",
      width: props.width,
    };
  };
  // blue button
  if (props.type === "primary") {
    return (
      <>
        <div
          className="primary-button"
          style={generateWidthStyle()}
          onClick={props.onClick}
        >
          {props.value}
        </div>
      </>
    );
  }
  // grey button
  else if (props.type === "secondary") {
    return (
      <>
        <div
          className="secondary-button"
          style={generateWidthStyle()}
          onClick={props.onClick}
        >
          {props.value}
        </div>
      </>
    );
  }
  // submit button
  else {
    return (
      <>
        <div className="submit-button">
          <input
            type="submit"
            value={props.value}
            style={generateInputWidthStyle()}
          />
        </div>
      </>
    );
  }
};

Button.defaultProps = { width: "100%" };
export default Button;
