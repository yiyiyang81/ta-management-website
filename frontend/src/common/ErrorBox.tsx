import React from "react";

const ErrorBox = (props: { errorMessage: string }) => {
  return (
    <>
      <div style={{ color: "#ED1B2F" }}>{props.errorMessage}</div>
    </>
  );
};

export default ErrorBox;
