import React, { useEffect, useState } from "react";
import { genericFetch } from "../utils/fetchData";
import { CartaType, Item, TableType } from "../utils/types";
import { NewOrderCategory } from "./newOrderCategory";
import './newOrderCategory.css';


export function NewOrder(){
    const { getCartaData, postNewOrder, getAllReservations } = genericFetch();

    const [ orderCart, setOrderCart ] = useState<Item[]>([]);
    const [ orderName, setOrderName ] = useState<string>();
    const [ orderTableId, setOrderTableId ] = useState<number>();
    const [ carta, setCarta ] = useState<CartaType>([]);
    const [ takenTables, setTakenTables ] = useState<TableType[]>();
    
    useEffect(() => {
        getAllReservations().then(response => {
            const validTables = response.filter((table) => table.status === "Reserved" || table.status === "Taken");
            setTakenTables(validTables);
        })
        getCartaData().then(response => {
            setCarta(response);
        })
    }, [])

    function passOrderCart() {
        return {
            setOrderCart,
            orderCart
        }
    }

    function changeTableId(event: React.ChangeEvent<HTMLSelectElement>){
        setOrderTableId(parseInt(event.target.value));
    }

    useEffect(() => {
        const selectedTable = takenTables?.find(table => table.id === orderTableId);
        if(selectedTable?.name !== undefined){
            setOrderName(selectedTable?.name);
        }
    }, [orderTableId, takenTables]);


    function createOrder(event: React.FormEvent){
        event.preventDefault();
        if(orderTableId && orderName && orderCart){
            const body = {
                tableId: orderTableId,
                name: orderName,
                items: orderCart
            }
            if(orderTableId){
                postNewOrder(body);
                window.alert('Pedido creado correctamente');
                window.location.reload();
            }
        } else if (!orderTableId){
            window.alert("No has seleccionado ninguna mesa")
        }
    }

    const order = (
        <div className="col-sm-3 insideMenu"  id='order'>
            <form className="" onSubmit={createOrder}>
                <div className="row">
                    <label htmlFor="tableSelect" className="col-sm-8 nombre">Número de mesa: </label>
                    <select className="col-sm-8 nombre" id='tableSelect' onChange={(event) => changeTableId(event)}>
                        <option></option>
                        {
                            takenTables?.map((table) => (
                                <option>{table.id}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='row'>
                    <label className="col-sm-8 nombre" htmlFor="name" >Nombre Cliente</label>
                    <input readOnly required className='nombre col-sm-8' id='name' value={orderName} onBlur={(event) => setOrderName(event.target.value)} />
                </div>
                <div className="row">
                    <p id='pedido' className="col-sm-8 nombre">Pedido: </p>
                    <ul className='col-sm-8' >
                        {orderCart.map((ord) => <li>{ord.name}</li>)}
                    </ul>
                    <button type="submit" className="submitButton">¡Oido cocina!</button>
                </div>
                
            </form>
        </div>
    );

    return (
        <div id='newOrderMenu'>
            <div className="row">
                <div className="col-md-9">
                    {carta.map((cat) => 
                        <NewOrderCategory passOrderCart={passOrderCart()} cat={cat} />
                    )}
                </div>
                
                {order}
            </div>
            
        </div>
    )

}