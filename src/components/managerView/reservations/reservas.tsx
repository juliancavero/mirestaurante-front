import React, { useEffect, useState } from "react"
import { Table } from './table';
import './reservationWindow.css';
import { genericFetch } from "../../utils/fetchData";
import { TableType } from "../../utils/types";
import { fadeInAnimation } from "../../estilos";
import { NoData } from "../../utils/noData";



export function Reservas() {
    const { getAllReservations, postNewReservation } = genericFetch();
    const [ reservations, setReservations ] = useState<TableType[]>([]);
    const [ newTableWindow, setNewTableWindow ] = useState(false);
    const [ newTableSize, setNewTableSize ] = useState<number>();
    const posibleSizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    useEffect(() => {
       getAllReservations().then(response => setReservations(response));
    }, []);

    function onClick(){
        setNewTableWindow(!newTableWindow);
    }

    function onSubmit(event: React.FormEvent){
        event.preventDefault();
        console.log(newTableSize);
        if(newTableSize !== undefined) {
            const bod = {
                size: newTableSize
            }
            postNewReservation(bod).then(response => {
                window.alert("Mesa creada correctamente");
                window.location.reload();
            })
        } else {
            window.alert("No has seleccionado un tamaño de mesa");
        }
    }

    function onChange(event: React.ChangeEvent<HTMLSelectElement>){
        setNewTableSize(parseInt(event.target.value));
    }

    
    return (
        <div>
            <div className="row">
                <button className='col-md-3 m-auto addNewTableButton' onClick={onClick}>Crear nueva mesa</button>
            </div>
            
            { reservations.length > 0 ? 
                <div className="tablesDiv">
                    {
                        reservations.map((reserv) =>
                            <div>
                                <Table props={reserv}/>
                            </div>
                        )
                    }
                </div>
                : <NoData str={'No hay datos sobre las reservas... todavía. Contacta con un Manager para solucionar este problema.'} />}
            
            {
                newTableWindow ? 
                    <div className={'popup-window ' + fadeInAnimation} onSubmit={onSubmit}>
                        <form>
                            <div className="row">
                                <h1 className="col-lg-9 m-auto">Crear nueva mesa</h1>
                                <button className='col-sm-1 ms-auto closeButton' id='catPlato' onClick={onClick}>X</button>
                            </div>
                            
                            <div className="row my-3 m-auto">
                                <h1 className="col-3">Tamaño:</h1>
                                <select className="col-3" onChange={onChange}>
                                    {
                                        posibleSizes.map((size) => <option>{size}</option>)
                                    }
                                </select>
                            </div>
                            <div className="row my-3">
                                    <button className="col-sm-8 m-auto" type={'submit'}>Crear mesa</button>
                            </div>
                        </form>
                    </div>
                : null
            }
            
        </div>
        
    )
}