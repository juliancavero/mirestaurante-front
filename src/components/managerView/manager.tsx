import { MenuButton } from "../utils/menuButton";
import "./mainpagestyle.css";

export function Manager() {
  return (
    <div id="main">
      <div className="row">
        <div className="col-sm-6 d-flex flex-column fourgrids align-items-center">
          <MenuButton content="RESERVA DE MESAS" url="/manager/reservas" />
          <img src="../images/plano-restaurante.jpg" alt=""></img>
        </div>
        <div className="col-sm-6 d-flex flex-column fourgrids align-items-center">
          <MenuButton content="CONSULTAR CARTA" url="/manager/carta" />
          <img src="/images/carta.png" alt=""></img>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 d-flex flex-column fourgrids align-items-center">
          <MenuButton content="PEDIDO" url="/manager/pedido" />
          <img src="/images/orders.webp" alt=""></img>
        </div>
        <div className="col-sm-6 d-flex flex-column fourgrids align-items-center">
          <MenuButton content="PASAR POR CAJA" url="/manager/caja" />
          <img src="/images/checkout.png" alt=""></img>
        </div>
      </div>
    </div>
  );
}
