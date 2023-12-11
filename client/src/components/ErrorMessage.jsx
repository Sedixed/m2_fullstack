import React from "react";

const ErrorMessage = ({ 
  errorMessage,
  additionalClassName,
  callback
}) => {
  return errorMessage ?
    (
      <div className={`ui container negative message ${additionalClassName}`}>
        <i 
          onClick={callback}
          className="close icon"
        ></i>
        {errorMessage}
      </div>
    ) : <></>;
};

export default ErrorMessage;