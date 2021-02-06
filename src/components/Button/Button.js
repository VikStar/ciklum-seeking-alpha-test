import React from 'react';
import './Button.scss';

const Button = ({ children = 'click me', onClick, isDisabled = false }) => {
    return (
        <button disabled={isDisabled} className="Button" onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;