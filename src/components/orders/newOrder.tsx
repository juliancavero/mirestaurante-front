import { useEffect, useState } from "react"
import { NewOrderCategory } from "./newOrderCategory"
import type { CartaType, Item } from "../carta/carta";
import { genericFetch } from "../miscelaneous/fetchData";
import { TableType } from "../reservations/table";
import { ItemSendType } from '../carta/carta';

export type NewOrderType = {
    name: string;
    items: ItemSendType[];
}

export function NewOrder() {
    const {getCartaData, postNewOrder, getTakenReservations} =  genericFetch();
    
    const [orderCart, setOrderCart] = useState<Item[]>([]);
    const [orderName, setOrderName] = useState<string>();
    const [orderTableId, setOrderTableId] = useState<number>();
    const [carta, setCarta] = useState<CartaType>([]);
    const [takenTables, setTakenTables] = useState<TableType[]>();
    useEffect(() => {
        /* fetch('http://192.168.0.20:3099/carta')
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setCarta(response);
        }) */
        getTakenReservations().then(response => {
            setTakenTables(response);
            setOrderTableId(response[0].id)
            setOrderName(response[0].name)
        })
        getCartaData().then(response => {
            setCarta(response);
            
        });
        
    }, []);

    function expFunc() {
        return {
            setOrderCart,
            orderCart
        }
    }

    const pedido = orderCart.length > 0 ? (
            <div id="order">
                <form>
                    <label htmlFor="table" className="table">Número de mesa: </label>
                    <select onChange={(event) => setOrderTableId(parseInt(event.target.value))}>
                        {
                            takenTables?.map((table) => (
                                <option>{table.id}</option>
                            ))
                        }
                    </select>
                    <label className="nombre" htmlFor="name" >Nombre Cliente</label>
                    <input required className='nombre' id='name' value={orderName} onBlur={(event) => setOrderName(event.target.value)}></input>
                    <br /><span id='pedido' className="nombre">Pedido: </span>
                    <ul>
                        {orderCart.map((ord) => <li>{ord.name}</li>)}
                    </ul>
                    <button className="submitButton" onClick={createOrder}>¡Oido cocina!</button>
                </form>
                
            </div>
    ) : null;

    function createOrder(){
        if(orderTableId && orderName && orderCart){
            const body = {
                tableId: orderTableId,
                name: orderName,
                items: orderCart
            }
            
            if(orderName !== ''){
                /* fetch('http://192.168.0.20:3099/orders/new', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }) */
    
                postNewOrder(body);
            }
        }
    }

    return (
        <div id='newOrderMenu'>
            {pedido}
            {carta.map((cat) => 
                <NewOrderCategory expFunc={expFunc()} cat={cat} />
            )}
        </div>
    )
}