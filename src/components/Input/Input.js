import React from 'react'

export default function Input(props) {
    let style = "form-control text-center";
    if (props.label) {
        style = "form-control";
        return (
        <div className="form-group">
            <label htmlFor={props.id}>{props.label}</label>
            <input id={props.id} type={props.type} className={style} value={props.data} onChange={props.changeAction}/>
        </div>
        )
    }
    return (
        <input id={props.id} type={props.type} className={style} value={props.data} onChange={props.changeAction}/>
    )
}
