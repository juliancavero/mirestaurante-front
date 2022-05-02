import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";
import type { OrderType } from "../utils/types";
import './payOrders.css';
import { useNavigate } from "react-router-dom";
import { genericFetch } from "../utils/fetchData";



export function PayOrders() {
    const { getAllOrders } = genericFetch();
    const navigate = useNavigate();
    
    const [allOrders, setAllOrders] = useState<OrderType[]>();

    useEffect(() => {
        getAllOrders().then(response => setAllOrders(response));
    }, []);

    function goToCashier(id: ObjectId){
        navigate('/camarero/caja/'+id);
    }
    
    return (
        <div id='allOrders'>
            <div className="row m-auto my-3">
                <h1 className="col-md-12 m-auto">Listado de pedidos pendientes de pago</h1>
            </div>
            {
                allOrders?.map((order) => 
                    <div className="row eachOrder">
                        <h2 className="h1 col-md-2 m-auto">Mesa {order.tableId}</h2>
                        <h2 className="col-md-3 m-auto">Nombre: {order.name}</h2>
                        <h2 className="col-md-3 m-auto">Importe: {order.totalCost}</h2>
                        <button className="h2 py-2 col-md-4 m-auto" onClick={() => goToCashier(order._id)}>Pasar por caja</button>
                    </div>
                )
            }
        </div>
    )
}