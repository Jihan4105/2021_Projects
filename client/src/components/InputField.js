import React from 'react'

const InputField = ({
    type,
    value,
    placeholder,
    onChange,
    errorMessage
}) => {
    return (
        <div>
            <input 
                type={type} 
                value = {value} 
                placeholder={placeholder} 
                onChange={onChange}>
            </input><br></br>
            <div style={{color: 'red'}}>{errorMessage}</div>
        </div>
    );
};

export default InputField;