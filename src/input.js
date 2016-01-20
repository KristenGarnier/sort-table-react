import React from 'react';

const Input = ({placeholder, type, Dt, change, value, label }) => {
    return (
        <div className="col-md-6">
            <label htmlFor={type}> {label} </label>
            <input className="form-control" id={type} placeholder={placeholder} type={type} data-type={Dt}
                   value={value}
                   onChange={(e) => change(e)}/>
        </div>
    )
};

Input.propTypes = {
    placeholder: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    Dt: React.PropTypes.string.isRequired,
    change: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired
};

export default Input;