import React, { SetStateAction, useState } from "react";
import './reservationWindow.css';
import { useForm } from "../miscelaneous/form";
import { genericFetch } from "../miscelaneous/fetchData";

export interface TableProps {
    props: TableType;
}

export type TableType = {
    id: number;
    status: "Available" | "Reserved" | "Taken";
    size: number;
    name?: string | undefined;
}

export function Table({props}: TableProps) {
    const statuses = ['Available', 'Taken', 'Reserved'];
    const {id, status, size, name} = props;
    const [visible, setVisible] = useState(false);

    function printSelectItems(selectedStatus: string){
       return (
            statuses.map((each) => each === selectedStatus ? <option className="selected">{each}</option> : <option className="notSelected">{each}</option> )
        )
    }

    function closeWindow(){
        setVisible(false);
    }

    function TableWindow() {
        const initialState = {
            id: id,
            status: status,
            size: size,
        }
        const {putUpdateReservation} = genericFetch();
        const [newStatus, setNewStatus] = useState(status);

        const { onChangeInput, onChangeSelect, onSubmit, values } = useForm(changeStatus, initialState);
        
        function changeStatus(){
            let bod = values as TableType;

            /* fetch('http://192.168.0.20:3099/reservations/update', {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(values)
                    }) */
                    
            putUpdateReservation(bod);
        }

        function a(){
            return (
                <div>
                    {name ? <span>Reservada por {name}</span> : null}
                    {newStatus ? <p>Cambiar a Reservada</p> : null}
                    <span>Nombre: </span>
                    <input required onChange={onChangeInput} name='name' type={'text'}></input>
                </div>
            )
        }
        function b(){
            return (
                <div>
                    {name ? <span>Ocupada por {name}</span> : null}
                    {newStatus ? <p>Cambiar a Ocupada</p> : null}
                    <span>Nombre: </span>
                    <input required onChange={onChangeInput} name='name' type={'text'}></input>
                </div>
            )
        }
        
        function handleChange(e: React.ChangeEvent<HTMLSelectElement>){
            onChangeSelect(e);
            setNewStatus(e.target.value as SetStateAction<"Available" | "Reserved" | "Taken">);
        }
        return (
            <div className="popup-window">
                <form onSubmit={onSubmit}>
                    <div id='firstRow'>
                        <select
                            id='status'
                            name='status'
                            onChange={(event) => handleChange(event)}
                            defaultValue={props.status}
                        >
                            {printSelectItems(props.status)}
                        </select> 
                        <button type={'button'} className='closeButton' onClick={closeWindow}>X</button>
                    </div>
                    <div id='secondRow'>
                        <h2>Mesa {id}</h2>
                        <h2>Tamaño: {size} personas</h2>
                        { newStatus === 'Reserved' ? a() : null }
                        { newStatus === 'Taken' ? b() : null }
                        <br />
                        <input className="submitButton" type='submit' value='Guardar cambios'></input>
                    </div>
                </form>
            </div>
        )
    }

    return (
        <div style={{ display: 'inline-block'}}>
            <button
                style={{ width: (4 + size * 2) + 'rem', height: '8rem' }}
                className={status + ' ' + 'table'}
                onClick={() => setVisible(true)}
            >
                {size}
            </button>
           {visible ? <TableWindow /> : null}
        </div>
    )
}