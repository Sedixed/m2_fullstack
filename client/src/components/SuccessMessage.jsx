import React from "react";

const SuccessMessage = ({ successMessage, additionalClassName, callback }) => {
    return successMessage ?
        (
            <div className={`ui container positive message ${additionalClassName}`}>
                <i 
                onClick={callback}
                className="close icon"></i>
                {successMessage}
            </div>
        ) :
        <React.Fragment />;
};

export default SuccessMessage;