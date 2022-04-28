import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";
import type { Item } from "../carta/carta";
import './payOrders.css';
import { useNavigate } from "react-router-dom";
import { genericFetch } from "../miscelaneous/fetchData";

export type orderType = {
    _id: ObjectId;
    name: string,
    items: Item[];
    totalCost: number;
}

export function PayOrders() {
    const { getAllOrders } = genericFetch();
    const navigate = useNavigate();
    
    const [allOrders, setAllOrders] = useState<orderType[]>([]);

    useEffect(() => {
        /* fetch('http://192.168.0.20:3099/orders')
        .then(response => response.json())
        .then(response => {
            setAllOrders(response);
        }) */

        getAllOrders().then(response => setAllOrders(response));
    }, []);

    function goToCashier(id: ObjectId){
        navigate('/camarero/caja/'+id);
    }
    
    return (
        <div id='allOrders'>
            {allOrders.map((order) => 
                <div className="eachOrder">
                    <span><b>Nombre: </b>{order.name} </span>
                    <span><b>Importe: </b>{order.totalCost} </span>
                    <button onClick={() => goToCashier(order._id)}>Pasar por caja</button>
                </div>
            )}
        </div>
    )
}