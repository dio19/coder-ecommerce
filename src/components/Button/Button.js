import React from 'react';
import './Button.css';

export default function Button(props) {

    let attr = {className: props.outlined ? 'btn mainOutline w-100' : 'btn mainBackground text-white w-100'};
    
    if (props.disabled) {
        attr.disabled = 1;
    }

    return (
    <button {...attr} type="button" onClick={props.action}>
        {props.label}
    </button>
    )
}
