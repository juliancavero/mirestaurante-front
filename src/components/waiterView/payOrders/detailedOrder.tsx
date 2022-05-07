import { useEffect, useState } from "react";
import type {  OrderType } from "../../utils/types";
import './payOrders.css';
import { useParams } from "react-router-dom";
import { genericFetch } from "../../utils/fetchData";
import { AreYouSureWindow } from "../../utils/areYouSureWindow";
import { Invoice } from "./invoice";



export function DetailedOrder() {
    const { orderid } = useParams();
    const { getOrderData, payOrderTable } = genericFetch();
    
    const [ orderData, setOrderData ] = useState<OrderType>();
    const [ confirmationVisible, setConfirmationVisible ] = useState(false);
    const [ confirmed, setConfirmed ] = useState(false);

    useEffect(() => {
        if(orderid){
            getOrderData(orderid).then(response => setOrderData(response));
        }            
    }, []);

    useEffect(() => {
        if(confirmed && orderData){
            const bod = {
                tableId: orderData.tableId
            }
            payOrderTable(bod).then(response => {
                window.alert("Pedido procesado correctamente.")
                window.location.reload();
            })
        }
    }, [confirmed])

    function createConfirmationWindow(){
        setConfirmationVisible(!confirmationVisible);
    }

    return (
        <div id='order' className="row d-flex justify-content-center rounded">
                <div className="col-md-4 row detailedOrderBox p-4" id=''>
                    <h1>Pedido</h1>
                    <h2>Nombre: {orderData ? orderData.name : null}.</h2>
                    <h2>Artículos:</h2>
                    { orderData ? <Invoice orderData={orderData} /> : null}
                </div>
                <div className="col-md-1"></div>
                <div className="col-md-4 row detailedOrderBox p-4 rounded" id=''>
                    <h1>Coste Total:</h1>
                    <div className='d-flex flex-column'>
                        <button className="btn btn-lg btn-warning my-1 p-2">{orderData ? orderData.totalCost : null} €</button>
                        <button className="btn btn-lg btn-success my-1 p-2" onClick={createConfirmationWindow}>Marcar pagado</button>
                        <button className="btn btn-lg btn-info my-1 p-2">Editar pedido</button>
                    </div>
                </div>
            { confirmationVisible ? 
                <AreYouSureWindow createConfirmationWindow={createConfirmationWindow} setConfirmation={setConfirmed} goodOption='Marcar como pagado' badOption='Volver' />
            : null}
        </div>
    )
}