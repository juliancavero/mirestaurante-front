import React, { FormEvent, useEffect, useState } from "react";
import { fadeInAnimation } from "../../utils/estilos";
import { genericFetch } from "../../utils/fetchData";
import { TableType } from "../../utils/types"

type TablePropsType = {
    props: TableType;
    closeWindow: (val: boolean) => void;
}

export function UpdateTable({props, closeWindow}: TablePropsType){

    const { putUpdateReservation } = genericFetch();
    const statuses = ['Available', 'Taken', 'Reserved'];
    const { id, status, size, name } = props;

    const [ newStatus, setNewStatus ] = useState<string>(status);
    const [ newName, setNewName ] = useState<string>(name || '');
    const [ ada, setAda ] = useState<string>('');
    const [ changeReservation, setChangeReservation ] = useState(false);
    const [ newNameVisible, setNewNameVisible ] = useState(false);

    useEffect(() => {
        if(status === 'Reserved') {setAda('Reservada')}
        if(status === 'Taken') {setAda('Ocupada')}
    }, [status])

    function onSubmit(event: FormEvent){
        event.preventDefault();

        const bod = {
            id: id,
            status: newStatus,
            size: size,
            name: newName
        }
        putUpdateReservation(bod).then(response => {
            window.alert("Reserva cambiada correctamente");
            window.location.reload();
        });

    }

    function showChangeWindow(){
        setChangeReservation(!changeReservation);
    }

    function onChange(event: React.ChangeEvent<HTMLSelectElement>){
        setNewStatus(event.target.value);
    }

    useEffect(() => {
        if(newStatus !== "Available"){
            setNewNameVisible(true);
        } else {
            setNewNameVisible(false);
        }
    }, [newStatus])

    return (
        <div className={"popup-window " + fadeInAnimation}>
                <div className="row">
                    <h1 className="col-lg-9 m-auto">Mesa {id}</h1>
                    <button className='col-sm-1 ms-auto closeButton' id='catPlato' onClick={() => closeWindow(false)}>X</button>
                </div>
                
                <div className="row">
                    <h1 className="col-lg-11 m-auto">Tamaño: {size} personas</h1>
                </div>
                <div className="row my-3">
                    {status === 'Reserved' || status === 'Taken' ? 
                        <h1 className="col-lg-11 m-auto">{ada} por {name}</h1>
                    :  <h1 className="col-lg-11 m-auto">Disponible</h1>}
                </div>
                <div className="row mb-3">
                    <button className="col-sm-4 m-auto" onClick={showChangeWindow}>Cambiar Reserva</button>
                </div>
                

                {changeReservation ? 
                    <div className={fadeInAnimation}>
                        <form onSubmit={onSubmit}>
                            <div className="row my-3">
                                <select className="col-lg-6 m-auto" onChange={onChange}>
                                    {
                                        statuses.map((eachStatus) => eachStatus === status ?
                                        <option selected>{eachStatus}</option>
                                        :   <option>{eachStatus}</option>)
                                    }
                                </select>
                            </div>
                            {newNameVisible ? 
                                <div className="row ms-3 mb-3">
                                    <label className="col-sm-3" htmlFor="name">Nombre: </label>
                                    <input className="col-sm-6" required onChange={(event) => setNewName(event.target.value)} name='name' type={'text'}></input>
                                </div>
                            : null}
                            
                            <div className="row mb-3">
                                <button className="col-sm-8 m-auto" type={'submit'}>Guardar cambios</button>
                            </div>
                        </form>
                    </div>
                : null}
        </div>
    )
}