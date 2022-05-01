import React, { useState } from "react";
import './reservationWindow.css';
import { TableType } from "../utils/types";
import { UpdateTable } from './updateTable';

type TablePropsType = {
    props: TableType;
}

export function Table({props}: TablePropsType) {
    
    const {id, status, size} = props;

    const [ windowVisible, setWindowVisible ] = useState(false);


    function closeWindow(){
        setWindowVisible(!windowVisible);
    }

    return (
        <div className="eachTable">
            <div className="row">
                <h2 className="col m-auto">Mesa {id}</h2>
            </div>
            <div className="row">
                <button
                    style={{ width: (4 + size * 2) + 'rem', height: '8rem' }}
                    className={status + ' buttonTable'}
                    onClick={() => setWindowVisible(true)}
                >
                    {size}
                </button>
            </div>
           {windowVisible ? <UpdateTable props={props} closeWindow={closeWindow} /> : null}
        </div>
    )
}