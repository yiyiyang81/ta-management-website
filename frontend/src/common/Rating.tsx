import React from "react";
import "../style/common/rating.css";

const Rating = (props: {
  label: string;
  required: boolean;
  id: string;
  value: any;
  handleChange: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const stars = new Array(5).fill(1);

  return (
    <>
      <div>
        <label htmlFor={props.id}>{props.label}</label>
        {props.required && <span className="required-symbol"> *</span>}
        <div className="star-container">
          <div className="rating">
            {stars.map((star, i) => {
              return (
                <span onClick={() => props.handleChange(5 - i)}>
                  {props.value > 5 - i - 1 ? "★" : "☆"}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Rating;
