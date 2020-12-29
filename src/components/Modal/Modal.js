import React from 'react';

export default function Modal(props) {
    return (
        <>
            <button id={props.triggerId} type="button" className="btn btn-primary" style={{display: "none"}} data-toggle="modal" data-target={`#${props.id}`}/>

            <div className="modal" id={props.id}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title mx-auto">{props.title}</h4>
                        </div>

                        <div className="modal-body">
                            {props.body}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
