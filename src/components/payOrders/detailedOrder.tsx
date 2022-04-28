import { useEffect, useState } from "react";
import type { Item } from "../carta/carta";
import './payOrders.css';
import { useParams } from "react-router-dom";
import { genericFetch } from "../miscelaneous/fetchData";
import { ObjectId } from "mongodb";

export type OrderAnswerType = {
    _id: ObjectId,
    name: string,
    items: Item[],
    totalCost: number
}

export function DetailedOrder() {
    const { orderid } = useParams();
    const {getOrderData} = genericFetch();
    
   // const initialState = {_id: '', name: '', items: [{id: '', name: '', price: 3, photo: ''}], totalCost: 0}
    const [orderData, setOrderData] = useState<OrderAnswerType>();

    useEffect(() => {
        /* fetch(`http://192.168.0.20:3099/orders/`+orderid)
            .then(response => response.json())
            .then(response => {
                setOrderData(response);
            }) */
            if(orderid){
                getOrderData(orderid).then(response => setOrderData(response));
            } else {
                // Do something
            }
            
    }, []);

    return (
        <div id='order'>
            <div id='firstColumn'>
                <h1>Pedido</h1>
                <h2>Nombre: {orderData ? orderData.name : null}</h2>
                <h2>Artículos: </h2>
                <ul>
                    {orderData ? orderData.items.map((item) => <li>{item.name} - {item.price} €</li>) : null}
                </ul>
            </div>
            <div id='secondColumn'>
                <h1>Coste Total:</h1>
                <div id='buttons'>
                    <button className="totalCost">{orderData ? orderData.totalCost : null} €</button>
                    <button className="paid">Marcar pagado</button>
                    <button className="editOrder">Editar pedido</button>
                </div>
                </div>
        </div>
    )
}