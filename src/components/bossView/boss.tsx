import { MenuButton } from "../utils/menuButton";

export function Boss() {
  return (
    <div id="main">
      <div className="row">
        <div className="col-sm-6 d-flex flex-column fourgrids align-items-center">
          <MenuButton content="EVOLUCIÓN ECONÓMICA" url="/boss/income" />
          <img src="../images/ingresos.png" alt=""></img>
        </div>
        <div className="col-sm-6 d-flex flex-column fourgrids align-items-center">
          <MenuButton content="ADMINISTRAR EMPLEADOS" url="/boss/employees" />
          <img src="/images/empleados.png" alt=""></img>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 d-flex flex-column fourgrids align-items-center">
          <MenuButton content="MI EMPRESA" url="/boss/mycompany" />
          <img src="/images/company.png" alt=""></img>
        </div>
        <div className="col-sm-6 d-flex flex-column fourgrids align-items-center">
          <MenuButton content="OPERATIVA RESTAURANTE" url="/manager" />
          <img src="/images/operativa.png" alt=""></img>
        </div>
      </div>
    </div>
  );
}
