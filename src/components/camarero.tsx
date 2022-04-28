import { MenuButton } from "./miscel";
import './mainpagestyle.css';

export function Camarero(){
    return (
        <div id='main'>
            <div className="rows">
                <div className="innterrow">
                    <MenuButton content='RESERVA DE MESAS' url='reservas' />
                    <img src="/images/plano-restaurante.jpg"></img>
                </div>
                <div className="innterrow">
                    <MenuButton content='CONSULTAR CARTA' url='carta'/>
                    <img src='/images/carta.png'></img>
                </div>
                
            </div>
            <div className="rows">
                <div className="innterrow">
                    <MenuButton content='PEDIDO' url='pedido'/>
                    <img src='/images/orders.webp'></img>
                </div>
                <div className="innterrow">
                    <MenuButton content='PASAR POR CAJA' url='caja'/>
                    <img src='/images/checkout.png'></img>
                </div>
            </div>
        </div>
    )
}