import { MenuButton } from "../utils/menuButton";
import "./mainpagestyle.css";

export function Camarero() {
  return (
    <div id="main">
      <div className="row">
        <div className="col-sm-6 d-flex flex-column fourgrids align-items-center">
          <MenuButton content="RESERVA DE MESAS" url="/camarero/reservas" />
          <img src="../images/plano-restaurante.jpg" alt=""></img>
        </div>
        <div className="col-sm-6 d-flex flex-column fourgrids align-items-center">
          <MenuButton content="CONSULTAR CARTA" url="/camarero/carta" />
          <img src="/images/carta.png" alt=""></img>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 d-flex flex-column fourgrids align-items-center">
          <MenuButton content="PEDIDO" url="/camarero/pedido" />
          <img src="/images/orders.webp" alt=""></img>
        </div>
        <div className="col-sm-6 d-flex flex-column fourgrids align-items-center">
          <MenuButton content="PASAR POR CAJA" url="/camarero/caja" />
          <img src="/images/checkout.png" alt=""></img>
        </div>
      </div>
    </div>
  );
}
