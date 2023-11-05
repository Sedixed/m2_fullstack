import React, { useEffect, useRef } from "react";

import '../styles/SuccessMessage.css';

const SuccessMessage = ({ 
    message, 
    additionalClassName = '', 
    callback = null 
}) => {
    const messageRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            messageRef.current.animate([
                { opacity: 1.0 },
                { opacity: 0 },
            ], {
                duration: 2000,
                easing: 'ease'
            });
            setTimeout(() => {
                callback();
            }, 2000);   
        }, 4000);
    });
    return (
        <div 
            className={`ui success message ${additionalClassName}`}
            ref={messageRef}
        >
            <i 
                onClick={callback}
                className="close icon"
            ></i>
            <div className="header">
                <p>{message}</p>
            </div>
        </div>
    );
};

export default SuccessMessage;