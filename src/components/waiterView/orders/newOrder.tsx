import React, { useEffect, useState } from "react";
import { genericFetch } from "../../utils/fetchData";
import { NoData } from "../../utils/noData";
import { CartaType, ItemCart, TableType } from "../../utils/types";
import { NewOrderCategory } from "./newOrderCategory";
import './newOrderCategory.css';



export function NewOrder(){
    const { getCartaData, postNewOrder, getAllReservations } = genericFetch();

    const [ orderCart, setOrderCart ] = useState<ItemCart[]>([]);
    const [ orderName, setOrderName ] = useState<string>();
    const [ orderTableId, setOrderTableId ] = useState<number>();
    const [ carta, setCarta ] = useState<CartaType>([]);
    const [ takenTables, setTakenTables ] = useState<TableType[]>();
    const [ finalPrice, setFinalPrice ] = useState<number>();


    useEffect(() => {
        getAllReservations().then(response => {
            const validTables = response.filter((table) => table.status === "Reserved" || table.status === "Taken");
            setTakenTables(validTables);
        })
        getCartaData().then(response => {
            setCarta(response);
        })
    }, [])

    useEffect(() => {
        let sum = 0;
        console.log("nuevo item")
        orderCart.forEach((item) => sum += (item.price * item.quantity))
        setFinalPrice(parseFloat(sum.toFixed(2)));
    }, [orderCart])


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
                name: orderName,
                tableId: orderTableId,
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
                    <label htmlFor="tableSelect" className="col-sm-12 nombre">Número de mesa: </label>
                    <select className="col-sm-12 nombre" id='tableSelect' onChange={(event) => changeTableId(event)}>
                        <option></option>
                        {
                            takenTables?.map((table) => (
                                <option>{table.id}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='row'>
                    <label className="col-sm-12 nombre" htmlFor="name" >Nombre Cliente</label>
                    <input readOnly required className='nombre col-sm-12' id='name' value={orderName} onBlur={(event) => setOrderName(event.target.value)} />
                </div>
                <div className="row my-3">
                    <p id='pedido' className="col-sm-12 nombre">Pedido: </p>
                    <ul className='col-sm-12 px-1' >
                        {orderCart.map((ord) => <li>{ord.quantity} x {ord.name}</li>)}
                    </ul>
                    <button type="submit" className="btn btn-success ">¡Oido cocina!</button>
                </div>
                <div className="row">
                    <p className="col-sm-8 nombre">Total pedido:</p>
                    <h2>- {finalPrice} €</h2>
                </div>
            </form>
        </div>
    );

    return (
        <div id='newOrderMenu'>
                { carta.length > 0 ? 
                    <div className="row">
                        <div className="col-md-9">
                            {carta.map((cat) => 
                                <NewOrderCategory orderCart={orderCart} setOrderCart={setOrderCart} cat={cat} />
                            )}
                        </div>
                        {order}
                    </div>
                : <NoData str="No se encuentran datos de la carta o está vacía. Por favor, contacta con un Manager para solucionar este problema." />}
        </div>
    )

}